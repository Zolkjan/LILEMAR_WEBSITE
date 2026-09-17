import { auth, firestore, storage } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const verifyAdmin = async () => {
  const token = (await cookies()).get("firebaseAuthToken")?.value;
  if (!token) return false;
  await auth.verifyIdToken(token);
  return true;
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  console.log(id, "IDIDIDIDIDDIDIDIDI");

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Brak ID projektu" },
        { status: 400 },
      );
    }

    const docRef = firestore.collection("custom-furnitures").doc(id);
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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
    }
    const docRef = firestore.collection("custom-furnitures").doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ message: "Projekt nie istnieje" }, { status: 404 });
    }

    const formData = await request.formData();
    const technologiesValue = formData.get("technologies");
    const technologies = technologiesValue
      ? (JSON.parse(String(technologiesValue)) as unknown)
      : [];
    if (!Array.isArray(technologies) || !technologies.every((technology) => typeof technology === "string")) {
      return NextResponse.json({ message: "Nieprawidłowa lista technologii" }, { status: 400 });
    }

    const updates: Record<string, string | string[]> = {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      theme: String(formData.get("theme") ?? ""),
      roomType: String(formData.get("roomType") ?? ""),
      technologies,
    };
    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles.length > 0) {
      const bucket = storage.bucket("lilemar-website.firebasestorage.app");
      updates.images = await Promise.all(
        imageFiles.map(async (file, index) => {
          const safeFileName = file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
          const fileName = `projects/${id}/${Date.now()}_${index}_${safeFileName}`;
          const storageFile = bucket.file(fileName);
          await storageFile.save(Buffer.from(await file.arrayBuffer()), {
            metadata: { contentType: file.type, cacheControl: "public, max-age=31536000" },
          });
          return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        }),
      );
    }

    await docRef.update(updates);
    return NextResponse.json({ id, ...updates });
  } catch (error) {
    console.error("Błąd edycji mebli na wymiar:", error);
    return NextResponse.json({ message: "Nie udało się zapisać zmian" }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
    }
    await firestore.collection("custom-furnitures").doc(id).delete();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Błąd usuwania mebli na wymiar:", error);
    return NextResponse.json({ message: "Nie udało się usunąć projektu" }, { status: 500 });
  }
};
