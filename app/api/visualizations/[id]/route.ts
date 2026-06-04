import { firestore } from "@/firebase/server";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Brak ID projektu" },
        { status: 400 },
      );
    }

    const docRef = firestore.collection("visualizations").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { message: "Projekt nie istnieje" },
        { status: 404 },
      );
    }

    const project = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd pobierania projektu" },
      { status: 500 },
    );
  }
};
