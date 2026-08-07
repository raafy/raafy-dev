export type FocusId = "fullstack" | "frontend" | "mobile" | "leadership";

export const FOCUS_IDS: FocusId[] = ["fullstack", "frontend", "mobile", "leadership"];

export const DEFAULT_FOCUS: FocusId = "fullstack";

export function isFocusId(value: string | null | undefined): value is FocusId {
  return !!value && (FOCUS_IDS as string[]).includes(value);
}
