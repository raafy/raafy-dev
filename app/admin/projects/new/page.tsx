"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { motion } from "motion/react";

export default function NewProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} />

      <div className="flex-1">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Create New Project
            </h1>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-black">
              <ProjectForm />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
