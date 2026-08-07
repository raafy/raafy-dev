export interface ResumeData {
  basics: {
    name: string;
    label: string;
    image?: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      city: string;
      countryCode: string;
      state: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    location: string;
    highlights: string[];
    /** Focus-area tags per highlight (same index as `highlights`), used to tailor the resume. */
    highlightTags?: string[][];
  }>;
  education: Array<{
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string;
    courses: string[];
    location: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    keywords: string[];
    /** Focus areas this skill category is most relevant to, used to reorder for tailored views. */
    focus?: string[];
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
}
