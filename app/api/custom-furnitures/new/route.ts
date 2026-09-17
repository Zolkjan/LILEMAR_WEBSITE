import { firestore, storage } from "@/firebase/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  let docRef;

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const theme = formData.get("theme") as string;
    const roomType = formData.get("roomType") as string;
    const technologiesValue = formData.get("technologies");
    const technologies = technologiesValue
      ? (JSON.parse(String(technologiesValue)) as unknown)
      : [];
    const imageFiles = formData.getAll("images") as File[];

    if (
      !Array.isArray(technologies) ||
      !technologies.every((technology) => typeof technology === "string")
    ) {
      return NextResponse.json(
        { message: "Nieprawidłowa lista technologii" },
        { status: 400 },
      );
    }

    docRef = await firestore.collection("custom-furnitures").add({
      title,
      description,
      theme,
      roomType,
      technologies,
      images: [],
      createdAt: new Date().toISOString(),
    });

    const projectId = docRef.id;
    const uploadedImageUrls: string[] = [];

    if (imageFiles.length > 0) {
      const bucket = storage.bucket("lilemar-website.firebasestorage.app");

      const uploadPromises = imageFiles.map(async (file, index) => {
        const buffer = Buffer.from(await file.arrayBuffer());

        const safeFileName = file.name
          .replace(/[^a-z0-9.]/gi, "_")
          .toLowerCase();
        const fileName = `projects/${projectId}/${Date.now()}_${index}_${safeFileName}`;
        const storageFile = bucket.file(fileName);

        await storageFile.save(buffer, {
          metadata: {
            contentType: file.type,
            cacheControl: "public, max-age=31536000",
          },
        });

        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        return publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      uploadedImageUrls.push(...urls);
    }

    await docRef.update({
      images: uploadedImageUrls,
    });

    return NextResponse.json({
      message: "Projekt utworzony poprawnie",
      id: projectId,
    });
  } catch (error: unknown) {
    console.error("Błąd Firebase Admin:", error);

    if (docRef) {
      await docRef
        .delete()
        .catch((err) =>
          console.error("Nie udało się usunąć dokumentu po błędzie:", err),
        );
    }

    return NextResponse.json(
      {
        message: "Błąd serwera",
        error: error instanceof Error ? error.message : "Nieznany błąd",
      },
      { status: 500 },
    );
  }
};
