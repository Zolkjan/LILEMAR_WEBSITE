import { firestore } from "@/firebase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("AAAAAAAAAAA");
  try {
    const snapshot = await firestore
      .collection("custom-furnitures")
      .orderBy("createdAt", "desc")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(projects, "PROJECTS IN API");

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd pobierania projektów" },
      { status: 500 },
    );
  }
};
