"use server";

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("firebaseAuthToken");
  cookieStore.delete("firebaseAuthRefreshToken");
};

export const setToken = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    const verifiedTOken = await auth.verifyIdToken(token);
    if (!verifiedTOken) return;

    const userRecord = await auth.getUser(verifiedTOken.uid);
    if (
      process.env.ADMIN_EMAIL == userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      auth.setCustomUserClaims(verifiedTOken.uid, {
        admin: true,
      });
    }

    const cookieStore = await cookies();
    cookieStore.set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("firebaseAuthRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.error(error);
  }
};
