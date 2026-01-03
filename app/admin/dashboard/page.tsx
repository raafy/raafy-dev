"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import {
  FolderKanban,
  CheckCircle,
  Archive,
  Star,
  Plus,
  Loader2,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import type { IProject } from "@/types/project";

type AdminProjectListItem = Pick<
  IProject,
  "_id" | "title" | "description" | "status" | "featured" | "imageUrl" | "techStack"
>;

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    archived: 0,
    featured: 0,
  });
  const [recentProjects, setRecentProjects] = useState<AdminProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchStats(),
          fetchRecentProjects()
        ]);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/projects?limit=1000");
      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || [];

        setStats({
          total: projects.length,
          active: projects.filter((p: AdminProjectListItem) => p.status === "active").length,
          archived: projects.filter((p: AdminProjectListItem) => p.status === "archived").length,
          featured: projects.filter((p: AdminProjectListItem) => p.featured).length,
        });
      } else {
        console.error("Failed to fetch stats: HTTP", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchRecentProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects?limit=5");
      if (response.ok) {
        const data = await response.json();
        setRecentProjects(data.projects || []);
      } else {
        console.error("Failed to fetch recent projects: HTTP", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch recent projects:", error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} />

      <div className="flex-1">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="relative p-6">
          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-red-800 bg-red-950/20 p-4"
            >
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  fetchStats();
                  fetchRecentProjects();
                }}
                className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Welcome Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative mb-8 overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-8"
              >
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-400">
                        Welcome back
                      </span>
                    </div>
                    <h2 className="mb-1 text-3xl font-bold text-white">
                      Admin Dashboard
                    </h2>
                    <p className="text-gray-500">
                      Manage your projects and content
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden sm:block"
                  >
                    <TrendingUp className="h-16 w-16 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Total Projects"
                  value={stats.total}
                  icon={FolderKanban}
                  index={0}
                  color="blue"
                />
                <StatsCard
                  title="Active Projects"
                  value={stats.active}
                  icon={CheckCircle}
                  index={1}
                  color="green"
                />
                <StatsCard
                  title="Archived"
                  value={stats.archived}
                  icon={Archive}
                  index={2}
                  color="yellow"
                />
                <StatsCard
                  title="Featured"
                  value={stats.featured}
                  icon={Star}
                  index={3}
                  color="purple"
                />
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Quick Actions
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/admin/projects/new"
                      className="group relative flex h-full items-center gap-4 overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:border-gray-700 hover:bg-gray-800"
                    >
                      <div className="relative rounded-lg bg-blue-600 p-3">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          New Project
                        </div>
                        <div className="text-sm text-gray-500">
                          Create a new project
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/admin/projects"
                      className="group relative flex h-full items-center gap-4 overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 transition-all hover:border-gray-700 hover:bg-gray-800"
                    >
                      <div className="relative rounded-lg bg-blue-600 p-3">
                        <FolderKanban className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          All Projects
                        </div>
                        <div className="text-sm text-gray-500">
                          View and manage
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Recent Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Recent Projects
                  </h2>
                  <Link
                    href="/admin/projects"
                    className="group flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    View all
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>

                {recentProjects.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-20">
                      <FolderKanban className="h-8 w-8 text-white" />
                    </div>
                    <p className="mb-2 font-semibold text-white">
                      No projects yet
                    </p>
                    <p className="text-sm text-gray-400">
                      Create your first project to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProjects.map((project, idx) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          href={`/admin/projects/${project._id}/edit`}
                          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-gray-900/70"
                        >
                          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
                          <div className="relative flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <h3 className="font-semibold text-white">
                                  {project.title}
                                </h3>
                                {project.featured && (
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                )}
                              </div>
                              <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.slice(0, 3).map((tech: string) => (
                                  <span
                                    key={tech}
                                    className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-300 ring-1 ring-white/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.techStack.length > 3 && (
                                  <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-300 ring-1 ring-white/10">
                                    +{project.techStack.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                project.status === "active"
                                  ? "bg-green-900/30 text-green-400 ring-1 ring-green-500/30"
                                  : "bg-gray-800 text-gray-400 ring-1 ring-white/10"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
