"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Home, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface AdminSidebarProps {
  isOpen: boolean;
}

export function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: FolderKanban,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-full w-64 transform border-r border-gray-800 bg-gray-900 transition-transform duration-300 lg:static lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-800 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
                  <span className="font-mono text-xl font-bold text-white">
                    R
                  </span>
                  <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-yellow-300" />
                </div>
              </div>
              <div>
                <div className="font-bold text-white">
                  Raafy Dev
                </div>
                <div className="text-xs text-gray-400">
                  Admin Portal
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Back to Site */}
          <div className="border-t border-gray-800 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-gray-800 hover:text-white"
            >
              <Home size={18} />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
