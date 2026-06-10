export type Lang = "en" | "te" | "hi" | "ta" | "kn" | "ml" | "mr" | "bn";

export type Branch = "aiml" | "cse" | "ece" | "mech_civil";

export const LANG_OPTIONS: { code: Lang; label: string; native: string; font: string }[] = [
  { code: "en", label: "English", native: "English", font: "'Outfit', sans-serif" },
  { code: "te", label: "Telugu", native: "తెలుగు", font: "'Noto Sans Telugu', 'Outfit', sans-serif" },
  { code: "hi", label: "Hindi", native: "हिन्दी", font: "'Noto Sans Devanagari', 'Outfit', sans-serif" },
  { code: "ta", label: "Tamil", native: "தமிழ்", font: "'Noto Sans Tamil', 'Outfit', sans-serif" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", font: "'Noto Sans Kannada', 'Outfit', sans-serif" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", font: "'Noto Sans Malayalam', 'Outfit', sans-serif" },
  { code: "mr", label: "Marathi", native: "मराठी", font: "'Noto Sans Devanagari', 'Outfit', sans-serif" },
  { code: "bn", label: "Bengali", native: "বাংলা", font: "'Noto Sans Bengali', 'Outfit', sans-serif" },
];

export const BRANCH_OPTIONS: { value: Branch; labelKey: string }[] = [
  { value: "aiml", labelKey: "branchAiml" },
  { value: "cse", labelKey: "branchCse" },
  { value: "ece", labelKey: "branchEce" },
  { value: "mech_civil", labelKey: "branchMech" },
];
