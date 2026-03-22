import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  console.log(body, "BODY BODY BODY");

  return NextResponse.json({ message: "Projekt został utworzony" });
};
