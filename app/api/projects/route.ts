import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import Project from "@/lib/db/models/Project";
import { internalErrorResponse } from "@/lib/utils/error-handler";
import { applyTranslations, getBestLocale } from "@/lib/utils/translations";
import type { IProject } from "@/types/project";

// GET /api/projects - Get public projects (active only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const rawLocale =
      searchParams.get("locale") || request.cookies.get("locale")?.value || undefined;
    const locale = getBestLocale(rawLocale);
    const tech = searchParams.get("tech");
    const platform = searchParams.get("platform");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // Build query - only active projects
    const query: Record<string, unknown> = { status: "active" };

    if (tech) {
      query.techStack = { $in: [tech] };
    }
    if (platform) {
      query.platforms = { $in: [platform] };
    }
    if (category) {
      query.categories = { $in: [category] };
    }
    if (featured !== null && featured !== undefined) {
      query.featured = featured === "true";
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select("-__v")
      .lean();

    const localizedProjects = projects.map((project) => {
      return applyTranslations(project as IProject, locale);
    });

    return NextResponse.json({ projects: localizedProjects, locale });
  } catch (error) {
    return internalErrorResponse(error, "Get public projects error");
  }
}
