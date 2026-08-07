"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { WorkExperience } from "@/components/resume/WorkExperience";
import { Education } from "@/components/resume/Education";
import { Skills } from "@/components/resume/Skills";
import { FocusSelector } from "@/components/resume/FocusSelector";
import { DEFAULT_FOCUS, isFocusId, type FocusId } from "@/lib/resumeFocus";
import { filterHighlightIndices, sortSkillIndices } from "@/lib/resumeFilter";
import type { ResumeData } from "@/types/resume";

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

interface FocusAreaMessages {
  label: string;
  description: string;
}

export function ResumeContent({
  resumeData,
  resumeMessages,
  sectionTitles,
  focusMessages,
}: {
  resumeData: ResumeData;
  resumeMessages: ResumeMessages;
  sectionTitles: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
  };
  focusMessages: {
    heading: string;
    description: string;
    areas: Record<FocusId, FocusAreaMessages>;
    downloadPdf: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [focus, setFocus] = useState<FocusId>(() => {
    const fromUrl = searchParams.get("focus");
    return isFocusId(fromUrl) ? fromUrl : DEFAULT_FOCUS;
  });

  const handleFocusChange = (id: FocusId) => {
    setFocus(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === DEFAULT_FOCUS) {
      params.delete("focus");
    } else {
      params.set("focus", id);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const skillOrder = useMemo(
    () => sortSkillIndices(resumeData.skills, focus),
    [resumeData.skills, focus]
  );

  const downloadHref = `/api/resume/download?locale=${locale}${
    focus === DEFAULT_FOCUS ? "" : `&focus=${focus}`
  }`;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-16 px-4 py-12 md:px-8 md:py-16">
      <ResumeHeader basics={resumeData.basics} translatedLabel={resumeMessages.basics.label} />

      <FocusSelector
        focus={focus}
        onChange={handleFocusChange}
        heading={focusMessages.heading}
        description={focusMessages.description}
        areas={focusMessages.areas}
        downloadLabel={focusMessages.downloadPdf}
        downloadHref={downloadHref}
      />

      <ResumeSection title={sectionTitles.summary} delay={0.2}>
        <p className="text-base leading-relaxed opacity-80 md:text-lg">
          {resumeMessages.basics.summary}
        </p>
      </ResumeSection>

      <ResumeSection title={sectionTitles.experience} delay={0.3}>
        <div className="space-y-8">
          {resumeData.work.map((job, index) => {
            const visibleIndices = filterHighlightIndices(
              job.highlightTags,
              focus,
              job.highlights.length
            );

            return (
              <WorkExperience
                key={index}
                job={job}
                index={index}
                translatedPosition={resumeMessages.work[index].position}
                translatedHighlights={visibleIndices.map(
                  (i) => resumeMessages.work[index].highlights[i]
                )}
              />
            );
          })}
        </div>
      </ResumeSection>

      <ResumeSection title={sectionTitles.education} delay={0.4}>
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

      <ResumeSection title={sectionTitles.skills} delay={0.5}>
        <Skills
          skills={skillOrder.map((i) => resumeData.skills[i])}
          translatedSkills={skillOrder.map((i) => resumeMessages.skills[i])}
        />
      </ResumeSection>

      <ResumeSection title={sectionTitles.languages} delay={0.6}>
        <div className="flex flex-wrap gap-4">
          {resumeMessages.languagesList.map((lang, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white/50 px-4 py-2 dark:border-white/20 dark:bg-white/5"
            >
              <span className="font-medium">{lang.language}</span>
              <span className="ml-2 text-sm opacity-60">{lang.fluency}</span>
            </div>
          ))}
        </div>
      </ResumeSection>
    </div>
  );
}
