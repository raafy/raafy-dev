"use client";

import { useState, useEffect, useCallback } from "react";
import { use } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import type { IProject } from "@/types/project";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data.project);
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} />

      <div className="flex-1">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : project ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Edit Project
              </h1>

              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-black">
                <ProjectForm project={project} isEditing={true} />
              </div>
            </motion.div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-white/10 dark:bg-black">
              <p className="text-gray-500 dark:text-gray-400">
                Project not found
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
