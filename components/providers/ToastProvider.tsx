"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        bottom: 24,
      }}
      toastOptions={{
        // Default options for all toasts
        duration: 5000,
        style: {
          background: "var(--toast-bg)",
          color: "var(--toast-color)",
          border: "1px solid var(--toast-border)",
          padding: "16px 20px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          maxWidth: "500px",
        },
        // Success toast styling
        success: {
          style: {
            background: "var(--toast-success-bg)",
            color: "var(--toast-success-color)",
            border: "1px solid var(--toast-success-border)",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        // Error toast styling
        error: {
          style: {
            background: "var(--toast-error-bg)",
            color: "var(--toast-error-color)",
            border: "1px solid var(--toast-error-border)",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
