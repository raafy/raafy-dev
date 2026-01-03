import jwt from "jsonwebtoken";
import type { JWTPayload } from "@/types/admin";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

const TOKEN_EXPIRY = "7d"; // 7 days

/**
 * Sign a JWT token
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET!) as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
