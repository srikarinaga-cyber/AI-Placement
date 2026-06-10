import type { Lang } from "./languageMeta";

export const quotes: { en: string; te: string; author: string }[] = [
  {
    en: "Small daily improvements over time lead to stunning results. Stay consistent!",
    te: "రోజూ చేసే చిన్న చిన్న మార్పులే కాలక్రమేణా అద్భుతమైన విజయాలకు దారితీస్తాయి. నిలకడగా ఉండండి!",
    author: "Robin Sharma",
  },
  {
    en: "Opportunities don't happen, you create them. Keep building your skills.",
    te: "అవకాశాలు వాటంతట అవే రావు, మీరే వాటిని సృష్టించుకోవాలి. నైపుణ్యాలను పెంపొందించుకోండి.",
    author: "Chris Grosser",
  },
  {
    en: "Believe you can and you're halfway there.",
    te: "మీరు చేయగలరని నమ్మండి, సగం విజయం సాధించినట్లే.",
    author: "Theodore Roosevelt",
  },
];

export const INITIAL_HABITS = [false, true, false, false, true];
export const INITIAL_HEATMAP = [
  1, 2, 0, 4, 3, 1, 0, 0, 2, 4,
  1, 3, 2, 0, 4, 1, 2, 3, 0, 1,
  0, 2, 4, 3, 1, 2, 4, 0, 3, 4,
];

export type TabId =
  | "dashboard"
  | "roadmap"
  | "resumeBuilder"
  | "mockInterview"
  | "aptitudeArena"
  | "skillGap"
  | "projects"
  | "jobBoard"
  | "tracker";

export const NAV_ITEMS: { id: TabId; icon: string; labelKey: string }[] = [
  { id: "dashboard", icon: "📊", labelKey: "dashboard" },
  { id: "roadmap", icon: "🗺️", labelKey: "roadmap" },
  { id: "resumeBuilder", icon: "📝", labelKey: "resumeBuilder" },
  { id: "mockInterview", icon: "💬", labelKey: "mockInterview" },
  { id: "aptitudeArena", icon: "🧩", labelKey: "aptitudeArena" },
  { id: "skillGap", icon: "⚡", labelKey: "skillGap" },
  { id: "projects", icon: "📁", labelKey: "projects" },
  { id: "jobBoard", icon: "💼", labelKey: "jobBoard" },
  { id: "tracker", icon: "🔥", labelKey: "tracker" },
];

export function getPageHeader(tab: TabId, _lang: Lang, t: (key: string) => string) {
  const map: Record<TabId, { title: string; sub: string }> = {
    dashboard: { title: t("appName"), sub: t("tagline") },
    roadmap: { title: t("roadmap"), sub: t("roadmapSub") },
    resumeBuilder: { title: t("resumeBuilder"), sub: t("resumeSub") },
    mockInterview: { title: t("mockInterview"), sub: t("interviewSub") },
    aptitudeArena: { title: t("aptitudeArena"), sub: t("aptitudeSub") },
    skillGap: { title: t("skillGap"), sub: t("skillGapSub") },
    projects: { title: t("projects"), sub: t("projectsSub") },
    jobBoard: { title: t("jobBoard"), sub: t("jobSub") },
    tracker: { title: t("tracker"), sub: t("trackerSub") },
  };
  return map[tab];
}
