import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type ContactSettings = {
  visualizationEmail: string;
  visualizationPhone: string;
  customFurnitureEmail: string;
  customFurniturePhone: string;
  postalCode: string;
  city: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
};

const defaults: ContactSettings = {
  visualizationEmail: "wizualizacje@lilemar.pl",
  visualizationPhone: "+48 000 000 001",
  customFurnitureEmail: "meble@lilemar.pl",
  customFurniturePhone: "+48 000 000 002",
  postalCode: "00-000",
  city: "Warszawa",
  street: "ul. Projektowa",
  buildingNumber: "12",
  apartmentNumber: "",
};

const settingsRef = () => firestore.collection("site-settings").doc("contact");

export const GET = async () => {
  try {
    const snapshot = await settingsRef().get();
    return NextResponse.json({ ...defaults, ...(snapshot.data() ?? {}) });
  } catch (error) {
    console.error("Błąd pobierania ustawień kontaktu:", error);
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

    const body = (await request.json()) as Partial<ContactSettings>;
    const settings: ContactSettings = {
      visualizationEmail: body.visualizationEmail?.trim() ?? "",
      visualizationPhone: body.visualizationPhone?.trim() ?? "",
      customFurnitureEmail: body.customFurnitureEmail?.trim() ?? "",
      customFurniturePhone: body.customFurniturePhone?.trim() ?? "",
      postalCode: body.postalCode?.trim() ?? "",
      city: body.city?.trim() ?? "",
      street: body.street?.trim() ?? "",
      buildingNumber: body.buildingNumber?.trim() ?? "",
      apartmentNumber: body.apartmentNumber?.trim() ?? "",
    };

    if (
      [
        settings.visualizationEmail,
        settings.visualizationPhone,
        settings.customFurnitureEmail,
        settings.customFurniturePhone,
        settings.postalCode,
        settings.city,
        settings.street,
        settings.buildingNumber,
      ].some((value) => !value)
    ) {
      return NextResponse.json(
        { message: "Wszystkie pola kontaktowe są wymagane" },
        { status: 400 },
      );
    }

    await settingsRef().set(settings, { merge: true });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Błąd zapisu ustawień kontaktu:", error);
    return NextResponse.json(
      { message: "Nie udało się zapisać ustawień" },
      { status: 500 },
    );
  }
};
