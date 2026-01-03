import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import connectDB from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import OTP from "@/lib/db/models/OTP";
import { comparePassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/utils/validators";
import { OTPEmailTemplate } from "@/lib/email/templates/otp";
import {
  validationErrorResponse,
  internalErrorResponse,
  errorResponse,
} from "@/lib/utils/error-handler";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "raafyshiham@gmail.com";

// Rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 minute window
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 requests per 15 minutes
    return false;
  }

  limit.count++;
  return true;
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const { password } = validation.data;

    // Connect to database
    await connectDB();

    // Find admin user
    const user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database
    await OTP.create({
      email: ADMIN_EMAIL,
      code: otpCode,
      expiresAt,
      verified: false,
    });

    // Send OTP email
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: ADMIN_EMAIL,
      subject: "Your Admin Login Code",
      html: OTPEmailTemplate({ code: otpCode, expiresInMinutes: 5 }),
    });

    if (emailResult.error) {
      console.error("Failed to send OTP email:", emailResult.error);
      return errorResponse("Failed to send OTP email. Please try again.", 500);
    }

    return NextResponse.json(
      { message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    return internalErrorResponse(error, "Login error");
  }
}
