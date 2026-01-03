import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, unauthorizedResponse } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);

    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    return NextResponse.json(
      { email: auth.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
