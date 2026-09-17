import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type Technology = {
  id: string;
  label: string;
};

const technologiesRef = () => firestore.collection("technologies");

const verifyAdmin = async () => {
  const token = (await cookies()).get("firebaseAuthToken")?.value;
  if (!token) return false;

  await auth.verifyIdToken(token);
  return true;
};

export const GET = async () => {
  try {
    const snapshot = await technologiesRef().orderBy("label").get();
    return NextResponse.json(
      snapshot.docs.map((document) => ({
        id: document.id,
        label: document.data().label as string,
      })),
    );
  } catch (error) {
    console.error("Błąd pobierania technologii:", error);
    return NextResponse.json([]);
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
        { message: "Nazwa technologii jest wymagana" },
        { status: 400 },
      );
    }

    const duplicate = await technologiesRef()
      .where("label", "==", normalizedLabel)
      .limit(1)
      .get();
    if (duplicate.size > 0) {
      return NextResponse.json(
        { message: "Taka technologia już istnieje" },
        { status: 409 },
      );
    }

    const document = await technologiesRef().add({ label: normalizedLabel });
    return NextResponse.json(
      { id: document.id, label: normalizedLabel },
      { status: 201 },
    );
  } catch (error) {
    console.error("Błąd dodawania technologii:", error);
    return NextResponse.json(
      { message: "Nie udało się dodać technologii" },
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
    if (!id) {
      return NextResponse.json(
        { message: "Nieprawidłowa technologia" },
        { status: 400 },
      );
    }

    await technologiesRef().doc(id).delete();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Błąd usuwania technologii:", error);
    return NextResponse.json(
      { message: "Nie udało się usunąć technologii" },
      { status: 500 },
    );
  }
};
