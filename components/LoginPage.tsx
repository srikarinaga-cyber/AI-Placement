"use client";

import { useState } from "react";
import type { Branch, Lang } from "@/lib/languageMeta";
import { BRANCH_OPTIONS } from "@/lib/languageMeta";
import { translate } from "@/lib/languages";
import LanguagePicker from "@/components/LanguagePicker";

type Props = {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
  onLogin: (email: string, password: string, name?: string, branch?: Branch) => boolean;
};

export default function LoginPage({ lang, setLanguage, onLogin }: Props) {
  const t = (key: string) => translate(lang, key);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState<Branch>("cse");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = onLogin(email, password, mode === "signup" ? name : undefined, branch);
    if (!ok) setError(t("loginError"));
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <span className="login-badge">{t("loginBadge")}</span>
        <h1>{t("loginTitle")}</h1>
        <p>{t("loginSubtitle")}</p>
        <ul className="login-features-list">
          <li>🗺️ {t("roadmap")}</li>
          <li>💬 {t("mockInterview")}</li>
          <li>📋 {t("assessment")}</li>
          <li>📝 {t("resumeBuilder")}</li>
        </ul>
      </div>

      <div className="login-card card-glass">
        <LanguagePicker
          lang={lang}
          onChange={setLanguage}
          variant="grid"
          label={t("selectLanguagePrompt")}
        />

        <div className="login-tabs">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
            {t("loginTab")}
          </button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
            {t("signupTab")}
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <div className="form-group">
                <label className="form-label">{t("fullName")}</label>
                <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">{t("selectBranch")}</label>
                <select className="form-select" value={branch} onChange={(e) => setBranch(e.target.value as Branch)}>
                  {BRANCH_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {t(b.labelKey)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label className="form-label">{t("email")}</label>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t("loginPassword")}</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn-primary login-submit">
            {mode === "login" ? t("loginButton") : t("signupButton")}
          </button>
        </form>

        <p className="login-hint">{t("loginHint")}</p>
      </div>
    </div>
  );
}
