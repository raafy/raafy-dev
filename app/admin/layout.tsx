import type { Metadata } from "next";
import "@/styles/globals.css"
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Admin Portal | Raafy Dev",
  description: "Admin portal for managing projects",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 antialiased">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
