import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connection";
import Project from "@/lib/db/models/Project";
import {
  internalErrorResponse,
  notFoundResponse,
  handleMongoError,
} from "@/lib/utils/error-handler";

function getTranslatedFields(
  translations: unknown,
  locale: string | undefined
): { title?: string; description?: string } | undefined {
  if (!locale || !translations || typeof translations !== "object") {
    return undefined;
  }

  if (translations instanceof Map) {
    const value = translations.get(locale);
    if (value && typeof value === "object") {
      return value as { title?: string; description?: string };
    }
    return undefined;
  }

  const record = translations as Record<string, unknown>;
  const value = record[locale];
  if (value && typeof value === "object") {
    return value as { title?: string; description?: string };
  }
  return undefined;
}

// GET /api/projects/[id] - Get single public project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const locale =
      searchParams.get("locale") || request.cookies.get("locale")?.value || undefined;

    await connectDB();

    const project = await Project.findOne({
      _id: id,
      status: "active",
    })
      .select("-__v")
      .lean();

    if (!project) {
      return notFoundResponse("Project");
    }

    const p = project as {
      title?: string;
      description?: string;
      translations?: unknown;
    };

    const translated = getTranslatedFields(p.translations, locale);
    const title = translated?.title || p.title;
    const description = translated?.description || p.description;

    const rest = { ...p };
    delete (rest as { translations?: unknown }).translations;

    return NextResponse.json({ project: { ...rest, title, description }, locale });
  } catch (error: unknown) {
    // Handle invalid MongoDB ID format
    const mongoError = handleMongoError(error);
    if (mongoError) return mongoError;

    return internalErrorResponse(error, "Get public project error");
  }
}
