import mongoose, { Schema, Model } from "mongoose";
import type { IOTP } from "@/types/admin";

const OTPSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster email lookups and auto-cleanup of expired OTPs
OTPSchema.index({ email: 1 });
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired docs

const OTP: Model<IOTP> =
  mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;
