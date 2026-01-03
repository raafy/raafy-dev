import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import Project from "@/lib/db/models/Project";
import { authMiddleware, unauthorizedResponse } from "@/lib/auth/middleware";
import { updateProjectSchema } from "@/lib/utils/validators";
import {
  validationErrorResponse,
  internalErrorResponse,
  notFoundResponse,
  handleMongoError,
} from "@/lib/utils/error-handler";
import { normalizeTranslations } from "@/lib/utils/translations";

// GET /api/admin/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    await connectDB();

    const project = await Project.findById(id).lean();

    if (!project) {
      return notFoundResponse("Project");
    }

    const p = project as { translations?: unknown };
    return NextResponse.json({
      project: {
        ...p,
        translations: normalizeTranslations(p.translations),
      },
    });
  } catch (error: unknown) {
    // Handle invalid MongoDB ID format
    const mongoError = handleMongoError(error);
    if (mongoError) return mongoError;

    return internalErrorResponse(error, "Get project error");
  }
}

// PUT /api/admin/projects/[id] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const body = await request.json();
    const validation = updateProjectSchema.safeParse(body);

    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    await connectDB();

    // Convert date strings to Date objects if present
    const updateData: Record<string, unknown> = { ...validation.data };
    if (typeof updateData.startDate === "string" || updateData.startDate instanceof Date) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (typeof updateData.endDate === "string" || updateData.endDate instanceof Date) {
      updateData.endDate = new Date(updateData.endDate);
    }
    if (updateData.githubUrl === "") {
      updateData.githubUrl = undefined;
    }
    if (updateData.liveDemoUrl === "") {
      updateData.liveDemoUrl = undefined;
    }

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!project) {
      return notFoundResponse("Project");
    }

    const p = project as { translations?: unknown };
    return NextResponse.json({
      project: {
        ...p,
        translations: normalizeTranslations(p.translations),
      },
      message: "Project updated successfully",
    });
  } catch (error: unknown) {
    // Handle MongoDB-specific errors
    const mongoError = handleMongoError(error);
    if (mongoError) return mongoError;

    return internalErrorResponse(error, "Update project error");
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authMiddleware(request);
    if (!auth.authorized) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    await connectDB();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return notFoundResponse("Project");
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: unknown) {
    // Handle invalid MongoDB ID format
    const mongoError = handleMongoError(error);
    if (mongoError) return mongoError;

    return internalErrorResponse(error, "Delete project error");
  }
}
