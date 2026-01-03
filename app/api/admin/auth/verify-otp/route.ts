import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import OTP from "@/lib/db/models/OTP";
import { signToken } from "@/lib/auth/jwt";
import { verifyOTPSchema } from "@/lib/utils/validators";
import {
  validationErrorResponse,
  internalErrorResponse,
} from "@/lib/utils/error-handler";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "raafyshiham@gmail.com";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = verifyOTPSchema.safeParse(body);

    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const { otp } = validation.data;

    // Connect to database
    await connectDB();

    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email: ADMIN_EMAIL,
      code: otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    // Generate JWT token
    const token = signToken({ email: ADMIN_EMAIL });

    // Create response with cookie
    const response = NextResponse.json(
      { message: "Login successful", email: ADMIN_EMAIL },
      { status: 200 }
    );

    // Set httpOnly cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return internalErrorResponse(error, "OTP verification error");
  }
}
