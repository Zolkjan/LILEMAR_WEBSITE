import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type HomeStats = {
  experience: string;
  interiorProjects: string;
  builtIns: string;
  attentionToDetail: string;
};

const defaults: HomeStats = {
  experience: "12",
  interiorProjects: "300+",
  builtIns: "150+",
  attentionToDetail: "100%",
};

const settingsRef = () =>
  firestore.collection("site-settings").doc("home-stats");

export const GET = async () => {
  try {
    const snapshot = await settingsRef().get();
    return NextResponse.json({ ...defaults, ...(snapshot.data() ?? {}) });
  } catch (error) {
    console.error("Błąd pobierania statystyk strony głównej:", error);
    return NextResponse.json(defaults);
  }
};

export const PUT = async (request: Request) => {
  try {
    const token = (await cookies()).get("firebaseAuthToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }

    await auth.verifyIdToken(token);

    const body = (await request.json()) as Partial<HomeStats>;
    const stats: HomeStats = {
      experience: body.experience?.trim() ?? "",
      interiorProjects: body.interiorProjects?.trim() ?? "",
      builtIns: body.builtIns?.trim() ?? "",
      attentionToDetail: body.attentionToDetail?.trim() ?? "",
    };

    if (Object.values(stats).some((value) => !value)) {
      return NextResponse.json(
        { message: "Wszystkie statystyki są wymagane" },
        { status: 400 },
      );
    }

    await settingsRef().set(stats, { merge: true });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Błąd zapisu statystyk strony głównej:", error);
    return NextResponse.json(
      { message: "Nie udało się zapisać statystyk" },
      { status: 500 },
    );
  }
};
