import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "qitra-hxeh.vercel.app";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const baseUrl = `${proto}://${host}`;

    if (!req.auth) {
      const loginUrl = new URL("/admin/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role
    const user = req.auth.user as { role?: string };
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", baseUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};