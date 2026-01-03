import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { verifyToken } from "./lib/auth/jwt";

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    // Allow access to login page
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = verifyToken(token);

    if (!payload) {
      // Invalid token - clear cookie and redirect to login
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_token");
      return response;
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  // Apply i18n middleware to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes (handled separately)
    // - static files
    // - _next internals
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/admin/:path*",
  ],
};
