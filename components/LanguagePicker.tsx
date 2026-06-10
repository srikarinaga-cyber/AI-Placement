"use client";

import { LANG_OPTIONS, type Lang } from "@/lib/languageMeta";
import { translate } from "@/lib/languages";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  variant?: "grid" | "select";
  label?: string;
};

export default function LanguagePicker({ lang, onChange, variant = "select", label }: Props) {
  if (variant === "grid") {
    return (
      <div className="lang-picker-grid-wrap">
        {label && <p className="lang-picker-label">{label}</p>}
        <div className="lang-picker-grid">
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              className={`lang-picker-card ${lang === opt.code ? "active" : ""}`}
              onClick={() => onChange(opt.code)}
            >
              <span className="lang-picker-native">{opt.native}</span>
              <span className="lang-picker-en">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const selectLabel = label ?? translate(lang, "selectLanguage");

  return (
    <label className="lang-select-wrap">
      <span className="lang-select-icon" aria-hidden="true">
        🌐
      </span>
      <span className="lang-select-label">{selectLabel}</span>
      <select
        className="lang-select"
        value={lang}
        onChange={(e) => onChange(e.target.value as Lang)}
        aria-label={selectLabel}
      >
        {LANG_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.native}
          </option>
        ))}
      </select>
    </label>
  );
}
