import { createChallenge, sha } from "altcha/lib";
import { NextResponse } from "next/server";

export async function GET() {
  const hmacSecret = process.env.ALTCHA_HMAC_KEY;

  if (!hmacSecret) {
    return NextResponse.json(
      { error: "ALTCHA_HMAC_KEY not configured" },
      { status: 500 }
    );
  }

  const challenge = await createChallenge({
    algorithm: "SHA-256",
    cost: 50000,
    deriveKey: sha.deriveKey,
    hmacSignatureSecret: hmacSecret,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  return NextResponse.json(challenge);
}
