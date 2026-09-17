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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
    }
    const docRef = firestore.collection("visualizations").doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return NextResponse.json({ message: "Projekt nie istnieje" }, { status: 404 });
    }

    const formData = await request.formData();
    const updates: Record<string, string | string[]> = {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      theme: String(formData.get("theme") ?? ""),
      roomType: String(formData.get("roomType") ?? ""),
    };
    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles.length > 0) {
      const bucket = storage.bucket("lilemar-website.firebasestorage.app");
      const imageUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          const safeFileName = file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
          const fileName = `visualizations/${id}/${Date.now()}_${index}_${safeFileName}`;
          const storageFile = bucket.file(fileName);
          await storageFile.save(Buffer.from(await file.arrayBuffer()), {
            metadata: { contentType: file.type, cacheControl: "public, max-age=31536000" },
          });
          return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        }),
      );
      updates.images = imageUrls;
    }

    await docRef.update(updates);
    return NextResponse.json({ id, ...updates });
  } catch (error) {
    console.error("Błąd edycji wizualizacji:", error);
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
    await firestore.collection("visualizations").doc(id).delete();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Błąd usuwania wizualizacji:", error);
    return NextResponse.json({ message: "Nie udało się usunąć projektu" }, { status: 500 });
  }
};
