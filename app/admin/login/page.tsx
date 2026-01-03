"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Mail, Loader2, KeyRound, Shield, Sparkles, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"password" | "otp">("password");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "OTP sent to your email");
        setPassword("");
        setStep("otp");
      } else {
        setError(data.error || "Login failed");
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid OTP");
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated Background with Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500 blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card with enhanced glow */}
        <div className="group relative">
          <motion.div
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50 blur-2xl"
          />
          <div className="relative rounded-3xl border border-white/10 bg-gray-900/90 p-8 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="relative mx-auto mb-6 inline-block">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-lg"
                />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 shadow-xl shadow-blue-500/50">
                  <Shield className="h-10 w-10 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute -right-1 -top-1"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                </div>
              </div>
              <h1 className="mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
                Admin Portal
              </h1>
              <p className="text-gray-400">
                {step === "password"
                  ? "Secure authentication required"
                  : "Verify your identity with OTP"}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* Password Form */}
              {step === "password" && (
                <motion.form
                  key="password"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handlePasswordSubmit}
                  className="space-y-6"
                >
                  {error && step === "password" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 backdrop-blur-sm"
                    >
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                  )}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <KeyRound size={18} className="text-blue-400" />
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl shadow-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Continue
                        <Mail size={20} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}

              {/* OTP Form */}
              {step === "otp" && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleOTPSubmit}
                  className="space-y-6"
                >
                  {error && step === "otp" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 backdrop-blur-sm"
                    >
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                  )}

                  <div>
                    <label
                      htmlFor="otp"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <Mail size={18} className="text-blue-400" />
                      OTP Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center text-3xl font-mono tracking-[0.5em] text-white placeholder-gray-600 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      disabled={isSubmitting}
                      autoFocus
                    />
                    <p className="mt-3 text-center text-sm text-gray-400">
                      Check <span className="font-semibold text-blue-400">raafyshiham@gmail.com</span> for your code
                    </p>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl shadow-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Login
                          <Lock size={20} className="transition-transform group-hover:scale-110" />
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("password");
                        setOtp("");
                        setError("");
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                      disabled={isSubmitting}
                    >
                      Back to Password
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock size={14} />
            <span>Secure admin access for raafy.dev</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
