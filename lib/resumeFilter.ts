import type { ResumeData } from "@/types/resume";
import { DEFAULT_FOCUS, type FocusId } from "@/lib/resumeFocus";

function isHighlightVisible(tags: string[] | undefined, focus: FocusId): boolean {
  if (focus === DEFAULT_FOCUS) return true;
  if (!tags || tags.length === 0) return true;
  return tags.includes(focus) || tags.includes("core");
}

/**
 * Indices of highlights to show for a given job under the selected focus.
 * Falls back to all indices if a focus would otherwise hide every highlight.
 */
export function filterHighlightIndices(
  tags: string[][] | undefined,
  focus: FocusId,
  length: number
): number[] {
  const all = Array.from({ length }, (_, i) => i);
  const visible = all.filter((i) => isHighlightVisible(tags?.[i], focus));
  return visible.length > 0 ? visible : all;
}

/** Indices of `skills` reordered to surface the categories most relevant to the focus first. */
export function sortSkillIndices(skills: ResumeData["skills"], focus: FocusId): number[] {
  const indices = skills.map((_, i) => i);
  if (focus === DEFAULT_FOCUS) return indices;

  return [...indices].sort((a, b) => {
    const aMatch = skills[a].focus?.includes(focus) ? 0 : 1;
    const bMatch = skills[b].focus?.includes(focus) ? 0 : 1;
    return aMatch - bMatch;
  });
}

/** Applies a focus filter to raw resume data (used for the tailored PDF export). */
export function filterResumeData(data: ResumeData, focus: FocusId): ResumeData {
  return {
    ...data,
    work: data.work.map((job) => {
      const indices = filterHighlightIndices(job.highlightTags, focus, job.highlights.length);
      return {
        ...job,
        highlights: indices.map((i) => job.highlights[i]),
      };
    }),
    skills: sortSkillIndices(data.skills, focus).map((i) => data.skills[i]),
  };
}
