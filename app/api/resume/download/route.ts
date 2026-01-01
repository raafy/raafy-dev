import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/pdf/ResumePDF";
import resumeData from "@/data/resume.json";
import type { ResumeData } from "@/types/resume";

export async function GET(request: NextRequest) {
  try {
    // Get locale from query params (defaults to 'en')
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    // Translations based on locale
    const translations = {
      en: {
        summary: "Professional Summary",
        experience: "Work Experience",
        education: "Education",
        skills: "Technical Skills",
        languages: "Languages",
        present: "Present",
      },
      ms: {
        summary: "Ringkasan Profesional",
        experience: "Pengalaman Kerja",
        education: "Pendidikan",
        skills: "Kemahiran Teknikal",
        languages: "Bahasa",
        present: "Sekarang",
      },
    };

    const t = translations[locale as keyof typeof translations] || translations.en;

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(
      ResumePDF({
        data: resumeData as ResumeData,
        translations: t,
      })
    );

    // Create filename with date
    const date = new Date().toISOString().split("T")[0];
    const filename = `Raafy_Shiham_Resume_${date}.pdf`;

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const pdfBytes = new Uint8Array(pdfBuffer);

    // Return PDF with proper headers
    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
