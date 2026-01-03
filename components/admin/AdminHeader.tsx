"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function AdminHeader({
  onToggleSidebar,
  sidebarOpen,
}: AdminHeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Get user email from localStorage or cookie
    const email = localStorage.getItem("admin_email") || "admin@raafy.dev";
    setUserEmail(email);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Clear stored email
        localStorage.removeItem("admin_email");
        toast.success("Logged out successfully");
        router.push("/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-400">
              {userEmail}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={16} />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
