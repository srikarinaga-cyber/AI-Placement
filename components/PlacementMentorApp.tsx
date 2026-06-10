"use client";

import { useState } from "react";
import type { User } from "@/hooks/useAuth";
import type { PlacementMentorAppState } from "@/hooks/usePlacementMentor";
import { NAV_ITEMS } from "@/lib/constants";
import { appData } from "@/lib/data";
import { BRANCH_OPTIONS } from "@/lib/languages";
import type { Branch } from "@/lib/languageMeta";
import type { InterviewType } from "@/lib/interviewQuestions";
import LanguagePicker from "@/components/LanguagePicker";
import FeatureGuide from "@/components/FeatureGuide";

function HabitList({
  habits,
  toggleHabit,
  t,
}: {
  habits: boolean[];
  toggleHabit: (i: number) => void;
  t: (k: string) => string;
}) {
  return (
    <div className="habit-checkbox-list">
      {habits.map((checked, i) => (
        <div key={i} className={`habit-item ${checked ? "checked" : ""}`} onClick={() => toggleHabit(i)}>
          <div className="habit-checkbox" />
          <div className="habit-text">{t(`habit${i + 1}`)}</div>
        </div>
      ))}
    </div>
  );
}

type Props = {
  app: PlacementMentorAppState;
  user: User;
};

export default function PlacementMentorApp({ app, user }: Props) {
  const [showFeatureGuide, setShowFeatureGuide] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const quizReport = app.quizPanel === "report" ? app.getQuizReport() : null;
  const interviewReport = app.interviewPanel === "report" ? app.getInterviewReport() : null;
  const currentQuiz = appData.quizzes[app.quizIdx];

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} id="app-sidebar">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div className="brand-name">AI Mentor</div>
        </div>
        <nav className="menu">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              className={`menu-item ${app.activeTab === item.id ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                app.switchTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-text">{app.t(item.labelKey)}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-lang">
          <LanguagePicker lang={app.lang} onChange={app.setLanguage} variant="select" label={app.t("selectLanguage")} />
        </div>
        <div className="sidebar-footer">
          <div className="profile-card">
            <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
            <div className="profile-info">
              <div className="profile-name">{user.name}</div>
              <div className="profile-role">{app.t(BRANCH_OPTIONS.find((b) => b.value === user.branch)?.labelKey ?? "branchCse")}</div>
            </div>
          </div>
          <button type="button" className="btn-control sidebar-logout" onClick={app.logout}>
            {app.t("logout")}
          </button>
        </div>
      </aside>

      <main className={`content-area branch-bg-${app.interviewBranch} ${app.activeTab === "mockInterview" ? "interview-active-bg" : ""}`}>
        <header className="top-bar">
          <div className="header-title-sec">
            <button
              type="button"
              className="sidebar-toggle btn-control"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div>
              <h1>{app.pageHeader.title}</h1>
              <p>{app.pageHeader.sub}</p>
            </div>
          </div>
          <div className="controls-group">
            <LanguagePicker lang={app.lang} onChange={app.setLanguage} label={app.t("selectLanguage")} />
            <button className="btn-control" type="button" onClick={() => setShowFeatureGuide(true)}>
              ❓ {app.t("whatFeaturesMean")}
            </button>
            <button className="btn-control" type="button" onClick={app.toggleTheme}>
              🌓 Theme
            </button>
          </div>
        </header>

        <div id="views-container">
          {app.activeTab === "dashboard" && (
            <section className="tab-view active-view">
              <div className="dashboard-grid">
                <div className="card-glass widget-card">
                  <div className="widget-header">
                    <span className="widget-label">{app.t("currentStreak")}</span>
                    <span className="widget-icon">🔥</span>
                  </div>
                  <div className="widget-value">
                    {app.streak} <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>{app.t("days")}</span>
                  </div>
                  <div className="widget-footer">Keep the momentum going!</div>
                </div>
                <div className="card-glass widget-card accent">
                  <div className="widget-header">
                    <span className="widget-label">{app.t("overallProgress")}</span>
                    <span className="widget-icon">📈</span>
                  </div>
                  <div className="widget-value">{app.readinessPercent}%</div>
                  <div className="widget-footer">Target: 80% to start applying</div>
                </div>
                <div className="card-glass widget-card success">
                  <div className="widget-header">
                    <span className="widget-label">{app.t("dailyTarget")}</span>
                    <span className="widget-icon">🎯</span>
                  </div>
                  <div className="widget-value">{app.completedHabits}/5</div>
                  <div className="widget-footer">Completed tasks today</div>
                </div>
              </div>
              <div className="split-layout" style={{ marginTop: "1.5rem" }}>
                <div className="card-glass">
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>{app.t("activeGoals")}</h2>
                  <HabitList habits={app.habits} toggleHabit={app.toggleHabit} t={app.t} />
                </div>
                <div className="card-glass" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>{app.t("motivationalQuote")}</h2>
                    <p style={{ fontStyle: "italic", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                      &quot;{app.lang === "te" ? app.currentQuote.te : app.currentQuote.en}&quot;
                    </p>
                    <p style={{ textAlign: "right", marginTop: "0.5rem", fontWeight: 600, color: "var(--accent-color)" }}>
                      - {app.currentQuote.author}
                    </p>
                  </div>
                  <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <button className="btn-primary" style={{ width: "100%" }} onClick={() => app.switchTab("roadmap")}>
                      {app.t("roadmap")}
                    </button>
                    <button
                      className="btn-primary"
                      style={{ width: "100%", background: "linear-gradient(135deg, var(--accent-color), var(--primary-color))" }}
                      onClick={() => app.switchTab("mockInterview")}
                    >
                      {app.t("mockInterview")}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {app.activeTab === "roadmap" && (
            <section className="tab-view active-view">
              <div className="card-glass">
                <h2 style={{ marginBottom: "0.5rem" }}>{app.t("roadmapTitle")}</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("roadmapSub")}</p>
                <div className="roadmap-form">
                  <div className="form-group">
                    <label className="form-label">{app.t("selectBranch")}</label>
                    <select className="form-select" value={app.roadmapForm.branch} onChange={(e) => app.setRoadmapForm({ ...app.roadmapForm, branch: e.target.value as Branch })}>
                      <option value="aiml">B.Sc AI & ML / Data Science</option>
                      <option value="cse">CSE / IT / MCA</option>
                      <option value="ece">ECE / EEE</option>
                      <option value="mech_civil">Mechanical / Civil / Others</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{app.t("selectLevel")}</label>
                    <select className="form-select" value={app.roadmapForm.level} onChange={(e) => app.setRoadmapForm({ ...app.roadmapForm, level: e.target.value })}>
                      <option value="beginner">{app.t("beginner")}</option>
                      <option value="intermediate">{app.t("intermediate")}</option>
                      <option value="advanced">{app.t("advanced")}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{app.t("selectGoal")}</label>
                    <select className="form-select" value={app.roadmapForm.goal} onChange={(e) => app.setRoadmapForm({ ...app.roadmapForm, goal: e.target.value })}>
                      <option value="product">{app.t("productBased")}</option>
                      <option value="service">{app.t("serviceBased")}</option>
                      <option value="faang">{app.t("faangLevel")}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{app.t("selectDuration")}</label>
                    <select className="form-select" value={app.roadmapForm.duration} onChange={(e) => app.setRoadmapForm({ ...app.roadmapForm, duration: e.target.value })}>
                      <option value="3">{app.t("months3")}</option>
                      <option value="6">{app.t("months6")}</option>
                      <option value="12">{app.t("months12")}</option>
                    </select>
                  </div>
                  <button className="btn-primary" onClick={app.generateUserRoadmap}>{app.t("generateRoadmap")}</button>
                </div>
              </div>
              {app.roadmapPhases.length > 0 && (
                <div style={{ marginTop: "1.5rem" }}>
                  <div className="card-glass" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                    <h3 style={{ color: "var(--accent-color)", fontWeight: 700 }}>
                      {app.lang === "en" ? "Generated Timeline & Milestones" : "సృష్టించబడిన రోడ్‌మ్యాప్ & మైలురాళ్ళు"}
                    </h3>
                  </div>
                  <div className="timeline-container">
                    {app.roadmapPhases.map((phase, phaseIdx) => (
                      <div key={phaseIdx} className="timeline-phase">
                        <div className="timeline-phase-header">
                          <div className="phase-title">{app.lang === "en" ? phase.title : phase.titleTe}</div>
                        </div>
                        <ul className="phase-goals">
                          {(app.lang === "en" ? phase.goals : phase.goalsTe).map((goal, goalIdx) => {
                            const key = `${phaseIdx}-${goalIdx}`;
                            const checked = app.completedRoadmapTasks[key];
                            return (
                              <li key={goalIdx} className="phase-goal-item">
                                <div
                                  className={`habit-item ${checked ? "checked" : ""}`}
                                  style={{ padding: "0.5rem 0.75rem", width: "100%", border: "none", background: "transparent" }}
                                  onClick={() => app.toggleRoadmapTask(phaseIdx, goalIdx)}
                                >
                                  <div className="habit-checkbox" />
                                  <div className="habit-text" style={{ fontSize: "0.9rem" }}>{goal}</div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="phase-resources">
                          {phase.resources.map((res) => (
                            <a key={res.name} href={res.url} target="_blank" rel="noreferrer" className="resource-tag">
                              🔗 {res.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {app.activeTab === "resumeBuilder" && (
            <section className="tab-view active-view">
              <div className="resume-grid">
                <div className="card-glass resume-form-panel">
                  <h2 style={{ marginBottom: "0.5rem" }}>{app.t("resumeBuilder")}</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("resumeSub")}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {(["name", "email", "phone", "education", "skills"] as const).map((field) => (
                      <div key={field} className="form-group">
                        <label className="form-label">{app.t(field === "name" ? "fullName" : field === "skills" ? "skillsList" : field)}</label>
                        <input className="form-input" value={app.resume[field]} onChange={(e) => app.setResume({ ...app.resume, [field]: e.target.value })} />
                      </div>
                    ))}
                    {(["project", "experience"] as const).map((field) => (
                      <div key={field} className="form-group">
                        <label className="form-label">{app.t(field === "project" ? "projectsDesc" : "experience")}</label>
                        <textarea className="form-textarea" value={app.resume[field]} onChange={(e) => app.setResume({ ...app.resume, [field]: e.target.value })} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button className="btn-primary" style={{ flexGrow: 1 }} onClick={app.evaluateResumeATS}>{app.t("runAIEvaluation")}</button>
                      <button className="btn-primary" style={{ flexGrow: 1, background: "linear-gradient(135deg, var(--accent-color), var(--primary-color))" }} onClick={() => window.print()}>
                        {app.t("printResume")}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="resume-preview-sheet">
                    <div className="res-header">
                      <div className="res-name">{app.resume.name}</div>
                      <div className="res-contacts">
                        <span>{app.resume.email}</span><span>•</span><span>{app.resume.phone}</span>
                      </div>
                    </div>
                    <div className="res-section">
                      <div className="res-section-title">{app.t("education")}</div>
                      <div className="res-content-item"><div className="res-item-desc">{app.resume.education}</div></div>
                    </div>
                    <div className="res-section">
                      <div className="res-section-title">Technical Skills</div>
                      <div className="res-content-item"><div className="res-item-desc">{app.resume.skills}</div></div>
                    </div>
                    <div className="res-section">
                      <div className="res-section-title">Projects</div>
                      <div className="res-content-item"><div className="res-item-desc">{app.resume.project}</div></div>
                    </div>
                    <div className="res-section">
                      <div className="res-section-title">Experience</div>
                      <div className="res-content-item"><div className="res-item-desc">{app.resume.experience}</div></div>
                    </div>
                  </div>
                  {app.showAtsCard && (
                    <div className="ats-score-box">
                      <div>
                        <strong>{app.t("atsScore")}</strong>
                        <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--accent-color)", marginTop: "0.25rem" }}>{app.atsScore}/100</div>
                      </div>
                      <div style={{ flexGrow: 1, marginLeft: "1.5rem" }}>
                        <ul style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.4rem", paddingLeft: "1rem", lineHeight: 1.5 }}>
                          {app.atsSuggestions.length === 0 ? (
                            <li>✨ {app.lang === "en" ? "Excellent! Resume is ATS optimized." : "అద్భుతం! మీ రెజ్యూమ్ స్క్రీనింగ్ కి సిద్ధంగా ఉంది."}</li>
                          ) : (
                            app.atsSuggestions.map((s, i) => <li key={i}>{app.lang === "en" ? s.en : s.te}</li>)
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {app.activeTab === "mockInterview" && (
            <section className="tab-view active-view">
              {app.interviewPanel === "setup" && (
                <div className="card-glass interview-setup-card">
                  <h2 style={{ marginBottom: "0.5rem" }}>{app.t("interviewTitle")}</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("interviewSub")}</p>
                  <div className="interview-config">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
                    <div className="form-group" style={{ width: "100%", maxWidth: 420, marginBottom: "1.25rem" }}>
                      <label className="form-label">{app.t("selectCourseForInterview")}</label>
                      <select
                        className="form-select"
                        value={app.interviewBranch}
                        onChange={(e) => app.setInterviewBranch(e.target.value as typeof app.interviewBranch)}
                      >
                        {BRANCH_OPTIONS.map((b) => (
                          <option key={b.value} value={b.value}>
                            {app.t(b.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <h3 style={{ marginBottom: "1rem" }}>{app.t("selectRound")}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: 400 }}>
                      {app.availableInterviewTypes.map((type) => (
                        <button key={type} className="btn-control interview-type-btn" onClick={() => app.startInterviewSession(type as InterviewType)}>
                          {app.t(type === "technical" ? "technicalRound" : type === "hr" ? "hrRound" : "aiMLRound")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {app.interviewPanel === "chat" && (
                <div className="chat-arena">
                  <div className="chat-header">
                    <div className="chat-agent-info">
                      <div className="chat-agent-status" />
                      <div>
                        <strong>{app.getInterviewerTitle(app.interviewType)}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Evaluation Mode Active</div>
                      </div>
                    </div>
                    <button className="btn-control" style={{ padding: "0.4rem 0.8rem", background: "var(--error-color)", border: "none", color: "white" }} onClick={app.endInterviewSession}>
                      {app.t("endSession")}
                    </button>
                  </div>
                  <div className="chat-messages">
                    {app.chatLog.map((msg, i) => (
                      <div key={i} className={`chat-msg ${msg.sender}`}>
                        {msg.sender === "interviewer" ? (
                          <>
                            <div style={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--accent-color)", marginBottom: "0.25rem" }}>AI Mentor</div>
                            <div>{msg.text}</div>
                            {msg.textLocal && app.lang !== "en" && (
                              <div className="chat-local-text">{msg.textLocal}</div>
                            )}
                          </>
                        ) : (
                          <>
                            <div style={{ fontWeight: 700, fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>You (Candidate)</div>
                            <div>{msg.text}</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {app.interviewTyping && (
                    <div className="chat-typing" style={{ padding: "0.5rem 1.5rem" }}>
                      <span>{app.t("interviewerTyping")}</span>
                      <div style={{ display: "flex", gap: 3 }}><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>
                    </div>
                  )}
                  <div className="chat-input-area">
                    <textarea
                      className="chat-input"
                      value={app.chatInput}
                      onChange={(e) => app.setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); app.submitCandidateAnswer(); } }}
                      placeholder="Type your answer here..."
                    />
                    <button className="btn-send" onClick={app.submitCandidateAnswer}>✈️</button>
                  </div>
                </div>
              )}
              {app.interviewPanel === "report" && interviewReport && (
                <div className="card-glass interview-report">
                  <h2>{app.t("gapScorecard")}</h2>
                  <div className="report-score-box">
                    <div className="widget-label">{app.t("feedbackScore")}</div>
                    <div className="report-score-num">{app.interviewAvgScore.toFixed(1)}/10</div>
                    <p style={{ marginTop: "0.5rem", fontWeight: 500 }}>{interviewReport.summary}</p>
                  </div>
                  <div className="report-section"><div className="report-section-title">🛡️ {app.t("feedbackTechnical")}</div><p style={{ lineHeight: 1.6, color: "var(--text-secondary)" }}>{interviewReport.tech}</p></div>
                  <div className="report-section"><div className="report-section-title">🗣️ {app.t("feedbackComm")}</div><p style={{ lineHeight: 1.6, color: "var(--text-secondary)" }}>{interviewReport.comm}</p></div>
                  <div className="report-section"><div className="report-section-title">💡 {app.t("feedbackImprovement")}</div><p style={{ lineHeight: 1.6, color: "var(--text-secondary)" }}>{interviewReport.improve}</p></div>
                  <button className="btn-primary" style={{ alignSelf: "center" }} onClick={app.restartMockInterview}>{app.t("backToDashboard")}</button>
                </div>
              )}
            </section>
          )}

          {app.activeTab === "assessment" && (
            <section className="tab-view active-view">
              <div className="card-glass">
                <h2 style={{ marginBottom: "0.5rem" }}>{app.t("assessmentHubTitle")}</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("assessmentHubSub")}</p>
                <div className="assessment-hub-grid">
                  <button
                    type="button"
                    className="assessment-hub-card card-glass"
                    onClick={() => {
                      app.switchTab("skillGap");
                    }}
                  >
                    <span className="assessment-hub-icon">⚡</span>
                    <h3>{app.t("openSkillGap")}</h3>
                    <p>{app.t("openSkillGapDesc")}</p>
                  </button>
                  <button
                    type="button"
                    className="assessment-hub-card card-glass"
                    onClick={() => {
                      app.switchTab("aptitudeArena");
                    }}
                  >
                    <span className="assessment-hub-icon">🧩</span>
                    <h3>{app.t("openAptitude")}</h3>
                    <p>{app.t("openAptitudeDesc")}</p>
                  </button>
                </div>
              </div>
            </section>
          )}

          {app.activeTab === "aptitudeArena" && (
            <section className="tab-view active-view">
              <button type="button" className="back-link" onClick={() => app.switchTab("assessment")}>
                ← {app.t("assessment")}
              </button>
              <div className="card-glass aptitude-arena-card">
                <h2 style={{ marginBottom: "0.5rem" }}>{app.t("aptitudeArena")}</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("aptitudeSub")}</p>
                <div className="topic-selector-tabs">
                  {(["percentages", "time_work", "logical"] as const).map((cat) => (
                    <button key={cat} className={`filter-btn ${app.aptitudeCategory === cat ? "active" : ""}`} onClick={() => app.switchAptitudeCategory(cat)}>
                      {cat === "percentages" ? "Percentages (శాతాలు)" : cat === "time_work" ? "Time & Work (పని-సమయం)" : "Logical Reasoning (రీజనింగ్)"}
                    </button>
                  ))}
                </div>
                {app.currentAptitudeQ && (
                  <div className="quiz-question-card" style={{ marginTop: "2rem" }}>
                    <div className="quiz-question-text">{app.lang === "en" ? app.currentAptitudeQ.question : app.currentAptitudeQ.questionTe}</div>
                    <div className="quiz-options-list">
                      {app.currentAptitudeQ.options.map((opt, oIdx) => {
                        let cls = "quiz-option";
                        if (app.aptitudeAnswer !== null) {
                          if (oIdx === app.currentAptitudeQ.answerIndex) cls += " correct";
                          else if (oIdx === app.aptitudeAnswer) cls += " incorrect";
                        }
                        return (
                          <div key={oIdx} className={cls} onClick={() => app.aptitudeAnswer === null && app.selectAptitudeOption(oIdx)}>
                            <div className="quiz-option-letter">{String.fromCharCode(65 + oIdx)}</div>
                            <div>{opt}</div>
                          </div>
                        );
                      })}
                    </div>
                    {app.aptitudeAnswer !== null && (
                      <>
                        <div className="solution-box">
                          <strong>{app.lang === "en" ? "Explanation:" : "లెక్క వివరణ:"}</strong><br />
                          {app.lang === "en" ? app.currentAptitudeQ.explanation : app.currentAptitudeQ.explanationTe}
                        </div>
                        {app.aptitudeIdx < app.aptitudeQuestions.length - 1 && (
                          <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={app.nextAptitudeQuestion}>{app.t("nextQuestion")}</button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {app.activeTab === "skillGap" && (
            <section className="tab-view active-view">
              <button type="button" className="back-link" onClick={() => app.switchTab("assessment")}>
                ← {app.t("assessment")}
              </button>
              {app.quizPanel === "intro" && (
                <div className="card-glass">
                  <h2 style={{ marginBottom: "0.5rem" }}>{app.t("skillGapTitle")}</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("skillGapSub")}</p>
                  <div style={{ textAlign: "center", padding: "2.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
                    <button className="btn-primary" onClick={app.startSkillGapQuiz}>{app.t("startQuiz")}</button>
                  </div>
                </div>
              )}
              {app.quizPanel === "active" && currentQuiz && (
                <div className="card-glass quiz-container">
                  <div className="quiz-progress-info">
                    <span>Section: {currentQuiz.section.toUpperCase()}</span>
                    <span>Question {app.quizIdx + 1} of {appData.quizzes.length}</span>
                  </div>
                  <div className="progress-bar-outer"><div className="progress-bar-inner" style={{ width: `${(app.quizIdx / appData.quizzes.length) * 100}%` }} /></div>
                  <div className="quiz-question-card">
                    <div className="quiz-question-text">{app.lang === "en" ? currentQuiz.question : currentQuiz.questionTe}</div>
                    <div className="quiz-options-list">
                      {currentQuiz.options.map((opt, oIdx) => {
                        let cls = "quiz-option";
                        if (app.quizSelected !== null) {
                          if (oIdx === currentQuiz.answerIndex) cls += " correct";
                          else if (oIdx === app.quizSelected) cls += " incorrect";
                        }
                        return (
                          <div key={oIdx} className={cls} onClick={() => app.selectQuizOption(oIdx)}>
                            <div className="quiz-option-letter">{String.fromCharCode(65 + oIdx)}</div>
                            <div>{opt}</div>
                          </div>
                        );
                      })}
                    </div>
                    {app.quizSelected !== null && (
                      <div className="quiz-explanation">
                        <strong>{app.quizSelected === currentQuiz.answerIndex ? "✅ Correct" : "❌ Incorrect"}</strong><br />
                        {app.lang === "en" ? currentQuiz.explanation : currentQuiz.explanationTe}
                      </div>
                    )}
                  </div>
                  {app.quizSelected !== null && (
                    <button className="btn-primary" style={{ alignSelf: "flex-end" }} onClick={app.nextQuizQuestion}>
                      {app.quizIdx === appData.quizzes.length - 1 ? (app.lang === "en" ? "Get Diagnostic Report" : "రిపోర్ట్ చూడండి") : "Next Question"}
                    </button>
                  )}
                </div>
              )}
              {app.quizPanel === "report" && quizReport && (
                <div className="card-glass interview-report">
                  <h2>{app.t("gapScorecard")}</h2>
                  <div className="report-score-box">
                    <div className="widget-label">Quiz Accuracy</div>
                    <div className="report-score-num">{app.quizScorePercent}%</div>
                    <p style={{ marginTop: "0.5rem", fontWeight: 500 }}>
                      {app.lang === "en" ? `You answered ${app.quizCorrectCount} out of 5 questions correctly.` : `మీరు 5 ప్రశ్నలలో ${app.quizCorrectCount} సరైన సమాధానాలు ఇచ్చారు.`}
                    </p>
                  </div>
                  <div className="report-section"><div className="report-section-title">✅ {app.t("strengths")}</div><ul style={{ marginLeft: "1.5rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{quizReport.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
                  <div className="report-section"><div className="report-section-title">⚠️ {app.t("weaknesses")}</div><ul style={{ marginLeft: "1.5rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{quizReport.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul></div>
                  <div className="report-section"><div className="report-section-title">🛠️ {app.t("actionPlan")}</div><ul style={{ marginLeft: "1.5rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{quizReport.actions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                  <button className="btn-primary" style={{ alignSelf: "center" }} onClick={app.restartSkillGapQuiz}>Retake Quiz</button>
                </div>
              )}
            </section>
          )}

          {app.activeTab === "projects" && (
            <section className="tab-view active-view">
              <div className="card-glass">
                <h2 style={{ marginBottom: "0.5rem" }}>{app.t("projectsTitle")}</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("projectsSub")}</p>
                <div className="projects-filter-bar">
                  {(["all", "webDev", "aiml"] as const).map((f) => (
                    <button key={f} className={`filter-btn ${app.projectFilter === f ? "active" : ""}`} onClick={() => app.setProjectFilter(f)}>
                      {app.t(f === "all" ? "all" : f === "webDev" ? "webDev" : "aiml")}
                    </button>
                  ))}
                </div>
                <div className="projects-grid">
                  {app.filteredProjects.map((proj) => (
                    <div key={proj.id} className="card-glass project-card">
                      <div className="project-title-row">
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{app.lang === "en" ? proj.title : proj.titleTe}</h3>
                        <span className={`project-difficulty-tag ${proj.difficulty}`}>{proj.difficulty}</span>
                      </div>
                      <div className="project-stack">Tech Stack: {proj.stack}</div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                        {app.lang === "en" ? proj.summary : proj.summaryTe}
                      </p>
                      <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", width: "100%" }} onClick={() => app.setModalProjectId(proj.id)}>
                        📄 View Step-by-Step Guide
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`project-guide-modal ${app.modalProject ? "open" : ""}`} onClick={() => app.setModalProjectId(null)}>
                {app.modalProject && (
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={() => app.setModalProjectId(null)}>✕</button>
                    <h2 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>{app.lang === "en" ? app.modalProject.title : app.modalProject.titleTe}</h2>
                    <div className="project-stack">Tech Stack: {app.modalProject.stack}</div>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, margin: "1.25rem 0" }}>{app.lang === "en" ? app.modalProject.summary : app.modalProject.summaryTe}</p>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{app.lang === "en" ? app.modalProject.whyPlacement : app.modalProject.whyPlacementTe}</p>
                    <ol style={{ marginLeft: "1.5rem", color: "var(--text-secondary)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                      {(app.lang === "en" ? app.modalProject.guide : app.modalProject.guideTe).map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                    <pre className="code-block"><code>{app.modalProject.codeSnippet}</code></pre>
                  </div>
                )}
              </div>
            </section>
          )}

          {app.activeTab === "jobBoard" && (
            <section className="tab-view active-view">
              <div className="card-glass">
                <h2 style={{ marginBottom: "0.5rem" }}>{app.t("jobBoard")}</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("jobSub")}</p>
                <div className="job-alerts-grid">
                  {app.jobs.map((job) => (
                    <div key={job.id} className="card-glass job-card">
                      <div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{job.title}</h3>
                        <div className="job-company">{job.company}</div>
                        <div className="job-pkg">{job.package}</div>
                        <div className="job-meta-row">
                          <div className="job-meta-item">📍 {job.location}</div>
                          <div className="job-meta-item">🎓 {job.eligibility}</div>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}><strong>Skills:</strong> {job.skills}</p>
                      </div>
                      {job.applied ? (
                        <button className="btn-primary applied-badge" disabled>{app.t("applied")}</button>
                      ) : (
                        <button className="btn-primary" onClick={() => app.applyToJob(job.id)}>{app.t("applyNow")}</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {app.activeTab === "tracker" && (
            <section className="tab-view active-view">
              <div className="split-layout">
                <div className="card-glass">
                  <h2 style={{ marginBottom: "0.5rem" }}>{app.t("trackerTitle")}</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{app.t("trackerSub")}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>{app.t("habitList")}</h3>
                  <HabitList habits={app.habits} toggleHabit={app.toggleHabit} t={app.t} />
                </div>
                <div className="card-glass" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{app.t("streakBoard")}</h2>
                    <div className="heatmap-container">
                      <div className="heatmap-grid">
                        {app.heatmapHistory.map((level, index) => (
                          <div key={index} className="heatmap-day" data-level={level} onClick={() => app.toggleHeatmapCell(index)}>
                            <span className="tooltip">{index === 29 ? "Today" : `Day -${29 - index}`}: {level} tasks</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Active Days</div>
                      <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent-color)" }}>{app.activeDays}/30</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Streak</div>
                      <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--success-color)" }}>{app.streak} Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <footer style={{ marginTop: "auto", paddingTop: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem", borderTop: "1px solid var(--border-color)" }}>
          &copy; 2026 AI Placement Mentor. Created for Tier-2 & Tier-3 Students in India. Supporting Local Languages.
        </footer>
      </main>

      {app.toast && <div className="toast-msg" style={{ display: "block" }}>{app.toast}</div>}
      <FeatureGuide lang={app.lang} open={showFeatureGuide} onClose={() => setShowFeatureGuide(false)} />
    </>
  );
}
