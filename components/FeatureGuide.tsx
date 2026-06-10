"use client";

import { translate, type Lang } from "@/lib/languages";

const FEATURES = [
  { icon: "📊", key: "featDashboard" },
  { icon: "🗺️", key: "featRoadmap" },
  { icon: "💬", key: "featInterview" },
  { icon: "📋", key: "featAssessment" },
  { icon: "📝", key: "featResume" },
  { icon: "📁", key: "featProjects" },
  { icon: "💼", key: "featJobs" },
  { icon: "🔥", key: "featTracker" },
] as const;

type Props = {
  lang: Lang;
  open: boolean;
  onClose: () => void;
};

export default function FeatureGuide({ lang, open, onClose }: Props) {
  if (!open) return null;
  const t = (key: string) => translate(lang, key);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content feature-guide-modal card-glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} type="button">
          ✕
        </button>
        <h2>{t("featureGuideTitle")}</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>{t("featureGuideSub")}</p>
        <div className="feature-guide-list">
          {FEATURES.map((f) => (
            <div key={f.key} className="feature-guide-item">
              <span className="feature-guide-icon">{f.icon}</span>
              <div>
                <strong>{t(`${f.key}Title`)}</strong>
                <p>{t(`${f.key}Desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
