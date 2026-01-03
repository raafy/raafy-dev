import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import Project from "@/lib/db/models/Project";
import { authMiddleware, unauthorizedResponse } from "@/lib/auth/middleware";
import { createProjectSchema } from "@/lib/utils/validators";
import {
  validationErrorResponse,
  internalErrorResponse,
  handleMongoError,
} from "@/lib/utils/error-handler";

function normalizeTranslations(
  translations: unknown
): Record<string, { title?: string; description?: string }> | undefined {
  if (!translations || typeof translations !== "object") {
    return undefined;
  }

  if (translations instanceof Map) {
    return Object.fromEntries(translations.entries()) as Record<
      string,
      { title?: string; description?: string }
    >;
  }

  return translations as Record<string, { title?: string; description?: string }>;
}

// GET /api/admin/projects - Get all projects (with pagination)
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (featured !== null && featured !== undefined) {
      query.featured = featured === "true";
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query),
    ]);

    const normalizedProjects = projects.map((project) => {
      const p = project as { translations?: unknown };
      return {
        ...p,
        translations: normalizeTranslations(p.translations),
      };
    });

    return NextResponse.json({
      projects: normalizedProjects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return internalErrorResponse(error, "Get projects error");
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const validation = createProjectSchema.safeParse(body);

    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    await connectDB();

    // Convert date strings to Date objects
    const projectData = {
      ...validation.data,
      startDate: new Date(validation.data.startDate),
      endDate: validation.data.endDate ? new Date(validation.data.endDate) : undefined,
      githubUrl: validation.data.githubUrl || undefined,
      liveDemoUrl: validation.data.liveDemoUrl || undefined,
    };

    const project = await Project.create(projectData);

    return NextResponse.json(
      { project, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle MongoDB-specific errors
    const mongoError = handleMongoError(error);
    if (mongoError) return mongoError;

    return internalErrorResponse(error, "Create project error");
  }
}
