import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("firebaseAuthToken")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login" && token) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
