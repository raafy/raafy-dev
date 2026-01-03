"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Loader2, Pencil, Trash2, Star, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import type { IProject } from "@/types/project";

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        filter === "all"
          ? "/api/admin/projects?limit=1000"
          : `/api/admin/projects?status=${filter}&limit=1000`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      } else {
        console.error("Failed to fetch projects: HTTP", response.status);
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("An error occurred while fetching projects");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the project");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} />

      <div className="flex-1">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Projects
            </h1>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-700"
            >
              <Plus size={20} />
              New Project
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, description, or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-900 pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "active"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("archived")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === "archived"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Archived
              </button>
            </div>
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
              <p className="text-gray-400">
                {searchTerm 
                  ? `No projects found matching "${searchTerm}". Try a different search term.`
                  : projects.length === 0 
                    ? "No projects found. Create your first project!"
                    : `No ${filter} projects found.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                      <div className="relative h-full w-full">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          unoptimized
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                            {project.description}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            project.status === "active"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-2">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-300">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/projects/${project._id}/edit`}
                          className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700"
                        >
                          <Pencil size={14} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id, project.title)}
                          className="flex items-center gap-1 rounded-lg border border-red-900/30 bg-red-900/10 px-3 py-1 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/20"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
