import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const verifyAdmin = async () => {
  const token = (await cookies()).get("firebaseAuthToken")?.value;
  if (!token) return false;

  await auth.verifyIdToken(token);
  return true;
};

const isThisMonth = (createdAt: unknown, now: Date) => {
  if (typeof createdAt !== "string") return false;

  const date = new Date(createdAt);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
};

export const GET = async () => {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json(
        { message: "Brak autoryzacji" },
        { status: 401 },
      );
    }

    const now = new Date();
    const [furnitureSnapshot, visualizationSnapshot, viewsSnapshot] =
      await Promise.all([
        firestore.collection("custom-furnitures").orderBy("createdAt", "desc").get(),
        firestore.collection("visualizations").orderBy("createdAt", "desc").get(),
        firestore.collection("page-views").get(),
      ]);

    const furnitureProjects = furnitureSnapshot.docs.map((document) => ({
      id: document.id,
      title: (document.data().title as string) || "Bez tytułu",
      createdAt: document.data().createdAt as string | undefined,
    }));

    return NextResponse.json({
      furnitureCount: furnitureSnapshot.size,
      visualizationsCount: visualizationSnapshot.size,
      furnitureThisMonth: furnitureProjects.filter((project) =>
        isThisMonth(project.createdAt, now),
      ).length,
      viewsCount: viewsSnapshot.size,
      recentProjects: furnitureProjects.slice(0, 3),
    });
  } catch (error) {
    console.error("Błąd pobierania statystyk administratora:", error);
    return NextResponse.json(
      { message: "Nie udało się pobrać statystyk" },
      { status: 500 },
    );
  }
};
