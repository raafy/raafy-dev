import resumeData from "@/data/resume.json";
import { ResumeContent } from "@/components/resume/ResumeContent";
import { getTranslations, getMessages } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ResumeData } from "@/types/resume";
import type { FocusId } from "@/lib/resumeFocus";

type ResumeMessages = {
  basics: {
    label: string;
    summary: string;
  };
  work: Array<{
    position: string;
    highlights: string[];
  }>;
  education: Array<{
    area: string;
    studyType: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
  }>;
  languagesList: Array<{
    language: string;
    fluency: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "Resume - Professional Experience",
    "View my professional resume showcasing 4+ years of experience in React.js, Next.js, and TypeScript development. Proven track record in building scalable web applications.",
    "/resume"
  );
}

export default async function ResumePage() {
  const t = await getTranslations("resume");
  const messages = (await getMessages()) as unknown as { resumeData: ResumeMessages };
  const resumeMessages = messages.resumeData;
  const focusAreas = t.raw("focus.areas") as Record<
    FocusId,
    { label: string; description: string }
  >;

  return (
    <ResumeContent
      resumeData={resumeData as ResumeData}
      resumeMessages={resumeMessages}
      sectionTitles={{
        summary: t("summary"),
        experience: t("experience"),
        education: t("education"),
        skills: t("skills"),
        languages: t("languages"),
      }}
      focusMessages={{
        heading: t("focus.heading"),
        description: t("focus.description"),
        areas: focusAreas,
        downloadPdf: t("downloadPdf"),
      }}
    />
  );
}
