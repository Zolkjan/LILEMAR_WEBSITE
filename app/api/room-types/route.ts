import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type RoomType = {
  id: string;
  label: string;
};

const defaultRoomTypes: RoomType[] = [
  { id: "kitchen", label: "Kuchnia" },
  { id: "living_room", label: "Salon" },
  { id: "bedroom", label: "Sypialnia" },
  { id: "bathroom", label: "Łazienka" },
  { id: "office", label: "Biuro" },
];

const roomTypesRef = () => firestore.collection("room-types");

const verifyAdmin = async () => {
  const token = (await cookies()).get("firebaseAuthToken")?.value;
  if (!token) return false;

  await auth.verifyIdToken(token);
  return true;
};

export const GET = async () => {
  try {
    const snapshot = await roomTypesRef().orderBy("label").get();
    const customRoomTypes = snapshot.docs.map((document) => ({
      id: document.id,
      label: document.data().label as string,
    }));

    return NextResponse.json([...defaultRoomTypes, ...customRoomTypes]);
  } catch (error) {
    console.error("Błąd pobierania typów pomieszczeń:", error);
    return NextResponse.json(defaultRoomTypes);
  }
};

export const POST = async (request: Request) => {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }

    const { label } = (await request.json()) as { label?: string };
    const normalizedLabel = label?.trim() ?? "";
    if (!normalizedLabel) {
      return NextResponse.json(
        { message: "Nazwa pomieszczenia jest wymagana" },
        { status: 400 },
      );
    }

    const duplicate = await roomTypesRef()
      .where("label", "==", normalizedLabel)
      .limit(1)
      .get();
    if (
      duplicate.size > 0 ||
      defaultRoomTypes.some((room) => room.label === normalizedLabel)
    ) {
      return NextResponse.json(
        { message: "Takie pomieszczenie już istnieje" },
        { status: 409 },
      );
    }

    const document = await roomTypesRef().add({ label: normalizedLabel });
    return NextResponse.json(
      { id: document.id, label: normalizedLabel },
      { status: 201 },
    );
  } catch (error) {
    console.error("Błąd dodawania typu pomieszczenia:", error);
    return NextResponse.json(
      { message: "Nie udało się dodać pomieszczenia" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }

    const { id } = (await request.json()) as { id?: string };
    if (!id || defaultRoomTypes.some((room) => room.id === id)) {
      return NextResponse.json(
        { message: "Nieprawidłowe pomieszczenie" },
        { status: 400 },
      );
    }

    await roomTypesRef().doc(id).delete();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Błąd usuwania typu pomieszczenia:", error);
    return NextResponse.json(
      { message: "Nie udało się usunąć pomieszczenia" },
      { status: 500 },
    );
  }
};
