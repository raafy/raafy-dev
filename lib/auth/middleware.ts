import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

/**
 * Middleware to protect API routes
 * Verifies JWT token from cookies
 */
export async function authMiddleware(
  request: NextRequest
): Promise<{ authorized: boolean; email?: string }> {
  try {
    // Get token from cookie
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return { authorized: false };
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload || !payload.email) {
      return { authorized: false };
    }

    return {
      authorized: true,
      email: payload.email,
    };
  } catch (error) {
    console.error("Auth middleware error:", error);
    return { authorized: false };
  }
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}
