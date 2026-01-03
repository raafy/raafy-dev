import resumeData from "@/data/resume.json";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { WorkExperience } from "@/components/resume/WorkExperience";
import { Education } from "@/components/resume/Education";
import { Skills } from "@/components/resume/Skills";
import { getTranslations, getMessages } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

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

  return (
    <div className="mx-auto w-full max-w-5xl space-y-16 px-4 py-12 md:px-8 md:py-16">
      <ResumeHeader
        basics={resumeData.basics}
        translatedLabel={resumeMessages.basics.label}
      />

      <ResumeSection title={t("summary")} delay={0.2}>
        <p className="text-base leading-relaxed opacity-80 md:text-lg">
          {resumeMessages.basics.summary}
        </p>
      </ResumeSection>

      <ResumeSection title={t("experience")} delay={0.3}>
        <div className="space-y-8">
          {resumeData.work.map((job, index) => (
            <WorkExperience
              key={index}
              job={job}
              index={index}
              translatedPosition={resumeMessages.work[index].position}
              translatedHighlights={resumeMessages.work[index].highlights}
            />
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={t("education")} delay={0.4}>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <Education
              key={index}
              education={edu}
              index={index}
              translatedArea={resumeMessages.education[index].area}
              translatedStudyType={resumeMessages.education[index].studyType}
            />
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={t("skills")} delay={0.5}>
        <Skills
          skills={resumeData.skills}
          translatedSkills={resumeMessages.skills}
        />
      </ResumeSection>

      <ResumeSection title={t("languages")} delay={0.6}>
        <div className="flex flex-wrap gap-4">
          {resumeMessages.languagesList.map((lang, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white/50 px-4 py-2 dark:border-white/20 dark:bg-white/5"
            >
              <span className="font-medium">{lang.language}</span>
              <span className="ml-2 text-sm opacity-60">
                {lang.fluency}
              </span>
            </div>
          ))}
        </div>
      </ResumeSection>
    </div>
  );
}
