"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { appData } from "@/lib/data";
import { translations, type Lang } from "@/lib/languages";
import {
  INITIAL_HABITS,
  INITIAL_HEATMAP,
  quotes,
  getInterviewerTitle,
  getPageHeader,
  type TabId,
} from "@/lib/constants";

type Job = (typeof appData.jobAlerts)[number] & { applied: boolean };
type ChatMsg = { sender: "interviewer" | "candidate"; text: string; textTe?: string };
type RoadmapPhase = ReturnType<typeof appData.getRoadmap>[number];
type AtsSuggestion = { en: string; te: string };

const defaultResume = {
  name: "Sai Kumar",
  email: "saikumar@gmail.com",
  phone: "+91 9876543210",
  education: "B.Sc AI & ML, Tier-3 Degree College (2023 - 2026)",
  skills: "Python, SQL, HTML, CSS, JavaScript",
  project:
    "Student Placement Dashboard: Built dynamic application forms using HTML/CSS & JS local storage saving student data. Increased search speed by 40%.",
  experience:
    "Web Developer Intern at Local Startup: Built responsive interfaces, handled MySQL databases, and improved load times by 20%.",
};

export function usePlacementMentor() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [streak] = useState(5);
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [heatmapHistory, setHeatmapHistory] = useState(INITIAL_HEATMAP);
  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>([]);
  const [completedRoadmapTasks, setCompletedRoadmapTasks] = useState<Record<string, boolean>>({});
  const [roadmapForm, setRoadmapForm] = useState({ branch: "aiml", level: "beginner", goal: "product", duration: "3" });
  const [resume, setResume] = useState(defaultResume);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsSuggestions, setAtsSuggestions] = useState<AtsSuggestion[]>([]);
  const [showAtsCard, setShowAtsCard] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(() => JSON.parse(JSON.stringify(appData.jobAlerts)));
  const [toast, setToast] = useState<string | null>(null);
  const [quoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));
  const [projectFilter, setProjectFilter] = useState<"all" | "webDev" | "aiml">("all");
  const [modalProjectId, setModalProjectId] = useState<number | null>(null);
  const [aptitudeCategory, setAptitudeCategory] = useState("percentages");
  const [aptitudeIdx, setAptitudeIdx] = useState(0);
  const [aptitudeAnswer, setAptitudeAnswer] = useState<number | null>(null);
  const [showAptSolution, setShowAptSolution] = useState(false);
  const [interviewActive, setInterviewActive] = useState(false);
  const [interviewType, setInterviewType] = useState<string | null>(null);
  const [interviewIdx, setInterviewIdx] = useState(0);
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [interviewScores, setInterviewScores] = useState<number[]>([]);
  const [interviewTyping, setInterviewTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [interviewPanel, setInterviewPanel] = useState<"setup" | "chat" | "report">("setup");
  const [quizPanel, setQuizPanel] = useState<"intro" | "active" | "report">("intro");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);

  const t = useCallback((key: string) => translations[lang][key] ?? key, [lang]);
  const pageHeader = useMemo(() => getPageHeader(activeTab, lang, t), [activeTab, lang, t]);

  const aptitudeQuestions = useMemo(
    () => appData.aptitudeQuestions.filter((q) => q.topic === aptitudeCategory),
    [aptitudeCategory]
  );
  const currentAptitudeQ = aptitudeQuestions[aptitudeIdx];

  const filteredProjects = useMemo(
    () => (projectFilter === "all" ? appData.projects : appData.projects.filter((p) => p.domain === projectFilter)),
    [projectFilter]
  );
  const modalProject = modalProjectId ? appData.projects.find((p) => p.id === modalProjectId) : null;

  const completedHabits = habits.filter(Boolean).length;
  const activeDays = heatmapHistory.filter((d) => d > 0).length;

  const readinessPercent = useMemo(() => {
    const heatmapScore = Math.min((activeDays / 30) * 20, 20);
    const roadmapScore = Math.min(Object.keys(completedRoadmapTasks).length * 5, 40);
    const resumeScore = atsScore ? (atsScore / 100) * 15 : 0;
    const appliedScore = Math.min(jobs.filter((j) => j.applied).length * 5, 15);
    const mockScore =
      interviewScores.length > 0
        ? interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length
        : 5;
    const mockPerformScore = (mockScore / 10) * 10;
    return Math.min(Math.round(heatmapScore + roadmapScore + resumeScore + appliedScore + mockPerformScore), 100);
  }, [activeDays, completedRoadmapTasks, atsScore, jobs, interviewScores]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${translations[lang].appName} - Placements Guide`;
  }, [lang]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToastMsg = (msg: string) => setToast(msg);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLanguage = () => setLang((prev) => (prev === "en" ? "te" : "en"));
  const switchTab = (tabId: TabId) => setActiveTab(tabId);

  const toggleHabit = (idx: number) => {
    setHabits((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      const count = next.filter(Boolean).length;
      setHeatmapHistory((h) => {
        const copy = [...h];
        copy[copy.length - 1] = count === 5 ? 4 : count > 0 ? Math.min(count, 3) : 0;
        return copy;
      });
      return next;
    });
  };

  const toggleHeatmapCell = (idx: number) => {
    setHeatmapHistory((prev) => {
      const copy = [...prev];
      copy[idx] = (copy[idx] + 1) % 5;
      return copy;
    });
  };

  const generateUserRoadmap = () => {
    const phases = appData.getRoadmap(roadmapForm.branch, roadmapForm.level, roadmapForm.goal, roadmapForm.duration);
    setRoadmapPhases(phases);
    setCompletedRoadmapTasks({});
  };

  const toggleRoadmapTask = (phaseIdx: number, goalIdx: number) => {
    const key = `${phaseIdx}-${goalIdx}`;
    setCompletedRoadmapTasks((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  const evaluateResumeATS = () => {
    const skills = resume.skills.toLowerCase();
    const { project, experience } = resume;
    let score = 55;
    const suggestions: AtsSuggestion[] = [];
    const numbersRegex = /\b\d+%\b|\b\d+\s+percent\b|\bLPA\b|\b\d+\s+users\b|\bspeed\b/;
    if (numbersRegex.test(project) || numbersRegex.test(experience)) score += 15;
    else
      suggestions.push({
        en: "Add numerical metrics to your project achievements (e.g. 'Improved performance by 30%', 'Served 100+ users').",
        te: "మీ ప్రాజెక్ట్ వివరాలలో సంఖ్యాత్మక విజయాలు జోడించండి (ఉదాహరణ: 'వేగం 30% పెరిగింది', '100+ విద్యార్థులు వాడారు').",
      });
    const keyKeywords = ["sql", "python", "mysql", "database", "git", "javascript", "dsa", "data structures"];
    let keywordCount = 0;
    keyKeywords.forEach((k) => {
      if (skills.includes(k) || project.toLowerCase().includes(k)) keywordCount++;
    });
    if (keywordCount >= 4) score += 20;
    else {
      score += keywordCount * 4;
      suggestions.push({
        en: "Include key placement skills like SQL, Git, and Database details under your technical skills section.",
        te: "సాంకేతిక నైపుణ్యాలలో SQL, Git, మరియు డేటాబేస్ (Database) వంటి ముఖ్యమైన పదాలు జోడించండి.",
      });
    }
    if (project.length > 50 && experience.length > 50) score += 10;
    else
      suggestions.push({
        en: "Flesh out description bullets. Give details about the problem statement and technology choices.",
        te: "ప్రాజెక్టులు మరియు అనుభవం విభాగాల్లో కొద్దిగా ఎక్కువ వివరణ ఇవ్వండి (ఏ సాంకేతికత వాడారో వివరించండి).",
      });
    setAtsScore(score);
    setAtsSuggestions(suggestions);
    setShowAtsCard(true);
    showToastMsg(lang === "en" ? "ATS Evaluation Completed!" : "రెజ్యూమ్ విశ్లేషణ పూర్తయింది!");
  };

  const switchAptitudeCategory = (category: string) => {
    setAptitudeCategory(category);
    setAptitudeIdx(0);
    setAptitudeAnswer(null);
    setShowAptSolution(false);
  };

  const selectAptitudeOption = (optIdx: number) => {
    setAptitudeAnswer(optIdx);
    setShowAptSolution(true);
  };

  const nextAptitudeQuestion = () => {
    if (aptitudeIdx < aptitudeQuestions.length - 1) {
      setAptitudeIdx((i) => i + 1);
      setAptitudeAnswer(null);
      setShowAptSolution(false);
    }
  };

  const applyToJob = (id: number) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, applied: true } : j))
    );
    const job = jobs.find((j) => j.id === id);
    if (job) showToastMsg(lang === "en" ? `Applied to ${job.company} successfully!` : `${job.company} కి విజయవంతంగా అప్లై చేసారు!`);
  };

  const startInterviewSession = (type: string) => {
    setInterviewActive(true);
    setInterviewType(type);
    setInterviewIdx(0);
    setChatLog([]);
    setInterviewScores([]);
    setInterviewPanel("chat");
    setInterviewTyping(true);
    setTimeout(() => {
      const q = appData.interviews[type as keyof typeof appData.interviews][0];
      setInterviewTyping(false);
      setChatLog([{ sender: "interviewer", text: q.question, textTe: q.questionTe }]);
    }, 1000);
  };

  const submitCandidateAnswer = () => {
    const text = chatInput.trim();
    if (!text || !interviewType) return;
    setChatInput("");
    setChatLog((prev) => [...prev, { sender: "candidate", text }]);
    setInterviewTyping(true);
    setTimeout(() => {
      const questions = appData.interviews[interviewType as keyof typeof appData.interviews];
      const q = questions[interviewIdx];
      let hits = 0;
      const lower = text.toLowerCase();
      q.hints.forEach((hint) => {
        if (lower.includes(hint.toLowerCase())) hits++;
      });
      const score = hits === 0 ? 3.5 : Math.min(4.5 + (hits / q.hints.length) * 5.5, 10);
      setInterviewScores((s) => [...s, score]);
      let feedback = "";
      let feedbackTe = "";
      if (score >= 8) {
        feedback = `Excellent response! You touched on key concepts: ${q.hints.slice(0, 3).join(", ")}. Very professional articulation.`;
        feedbackTe = "చాలా చక్కగా సమాధానం చెప్పారు. మీరు ప్రధానమైన పదాలను ఉపయోగించారు. కమ్యూనికేషన్ చాలా బాగుంది.";
      } else if (score >= 5.5) {
        feedback = `Decent effort. However, you should emphasize more on terms like: ${q.hints.filter((h) => !lower.includes(h)).slice(0, 2).join(", ")}.`;
        feedbackTe = `మంచి ప్రయత్నం. కానీ, మీరు ఇంకా కొన్ని ముఖ్యమైన విషయాలను కవర్ చేయాల్సి ఉంటుంది.`;
      } else {
        feedback = `Your answer is too short or missing fundamental technical keywords. Please review: ${q.hints.slice(0, 3).join(", ")}.`;
        feedbackTe = "మీ సమాధానంలో అవసరమైన సాంకేతిక పదాలు లేవు. దయచేసి బేసిక్స్ మరొక్కసారి రివిజన్ చేయండి.";
      }
      setInterviewTyping(false);
      const nextIdx = interviewIdx + 1;
      setChatLog((prev) => [
        ...prev,
        { sender: "interviewer", text: `[Feedback: ${score.toFixed(1)}/10] - ${feedback}`, textTe: feedbackTe },
      ]);
      if (nextIdx < questions.length) {
        setInterviewIdx(nextIdx);
        setTimeout(() => {
          setInterviewTyping(true);
          setTimeout(() => {
            const nq = questions[nextIdx];
            setInterviewTyping(false);
            setChatLog((prev) => [...prev, { sender: "interviewer", text: nq.question, textTe: nq.questionTe }]);
          }, 1000);
        }, 1500);
      } else {
        setTimeout(() => {
          setChatLog((prev) => [
            ...prev,
            {
              sender: "interviewer",
              text: "You have completed the mock interview! Please click 'End Interview & Get Report' at the top to view your detailed scorecard.",
              textTe: "మీ మాక్ ఇంటర్వ్యూ విజయవంతంగా పూర్తయింది! రిపోర్ట్ చూడటానికి పైన ఉన్న బటన్ క్లిక్ చేయండి.",
            },
          ]);
        }, 1000);
      }
    }, 1200);
  };

  const endInterviewSession = () => {
    setInterviewActive(false);
    setInterviewPanel("report");
  };

  const restartMockInterview = () => {
    setInterviewPanel("setup");
    setActiveTab("dashboard");
  };

  const interviewAvgScore = interviewScores.length
    ? interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length
    : 0;

  const getInterviewReport = () => {
    const avg = interviewAvgScore;
    if (avg >= 8)
      return {
        summary:
          lang === "en"
            ? "Outstanding performance! Ready for corporate interviews."
            : "అద్భుతమైన ప్రదర్శన! మీరు ఇంటర్వ్యూకి సిద్ధంగా ఉన్నారు.",
        tech:
          lang === "en"
            ? "Demonstrates high confidence and command over engineering terms."
            : "సాంకేతిక నైపుణ్యాలు చాలా బాగున్నాయి.",
        comm:
          lang === "en"
            ? "Vocabulary flow is clear. Very polite and well-structured professional answers."
            : "కమ్యూనికేషన్ ఫ్లో స్పష్టంగా ఉంది.",
        improve:
          lang === "en"
            ? "Focus on solving problems slightly faster and explaining code lines as you write."
            : "కోడింగ్ వేగాన్ని పెంచడానికి రోజువారీ లీట్‌కోడ్ ప్రాక్టీస్ చేయండి.",
      };
    if (avg >= 5.5)
      return {
        summary:
          lang === "en"
            ? "Good foundation, but needs more refinement in technical structures."
            : "మంచి పునాది ఉంది, కానీ సాంకేతిక వివరణలలో మరింత మెరుగుపడాలి.",
        tech:
          lang === "en"
            ? "Understands basic logic but misses detail definitions."
            : "బేసిక్స్ బాగానే తెలుసు కానీ నిర్వచనాలు సరిగ్గా చెప్పలేకపోయారు.",
        comm:
          lang === "en"
            ? "Occasional hesitations or grammar issues. Consider practicing in front of a mirror."
            : "ఇంగ్లీషులో మాట్లాడేటప్పుడు కొద్దిగా తడబాటు ఉంది.",
        improve:
          lang === "en"
            ? "Use 'Telglish' logic to outline your thoughts first, then formulate correct English sentences."
            : "ముందుగా తెలుగులో ఆలోచించి, ఆపై ఇంగ్లీషులో అనువదించడానికి ప్రయత్నించండి.",
      };
    return {
      summary:
        lang === "en"
          ? "Needs significant practice. Recommend restarting basic roadmaps."
          : "చాలా ప్రాక్టీస్ అవసరం. బేసిక్ కోడింగ్ రోడ్‌మ్యాప్‌ని మరొకసారి రివిజన్ చేయండి.",
      tech:
        lang === "en"
          ? "Missing core data structure concepts and OOP terms."
          : "డేటా స్ట్రక్చర్స్ మరియు OOPs పద్ధతులపై సరైన అవగాహన లేదు.",
      comm:
        lang === "en"
          ? "Struggles to articulate answers. Keep practice sessions regular."
          : "సమాధానం చెప్పడానికి చాలా ఇబ్బంది పడుతున్నారు.",
      improve:
        lang === "en"
          ? "Follow our Telugu roadmap lectures and try explaining concepts out loud in Telugu first."
          : "మా తెలుగు రోడ్‌మ్యాప్ క్లాసులు వినండి మరియు మొదట తెలుగులో అర్థం చేసుకోండి.",
    };
  };

  const startSkillGapQuiz = () => {
    setQuizPanel("active");
    setQuizIdx(0);
    setQuizAnswers([]);
    setQuizSelected(null);
  };

  const selectQuizOption = (optIdx: number) => {
    if (quizSelected !== null) return;
    setQuizSelected(optIdx);
    setQuizAnswers((prev) => [...prev, optIdx]);
  };

  const nextQuizQuestion = () => {
    if (quizIdx < appData.quizzes.length - 1) {
      setQuizIdx((i) => i + 1);
      setQuizSelected(null);
    } else {
      setQuizPanel("report");
    }
  };

  const quizCorrectCount = appData.quizzes.filter((q, i) => quizAnswers[i] === q.answerIndex).length;
  const quizScorePercent = (quizCorrectCount / appData.quizzes.length) * 100;

  const getQuizReport = () => {
    const codingCorrect =
      quizAnswers[0] === appData.quizzes[0].answerIndex && quizAnswers[1] === appData.quizzes[1].answerIndex;
    const aptCorrect =
      quizAnswers[2] === appData.quizzes[2].answerIndex && quizAnswers[3] === appData.quizzes[3].answerIndex;
    const commCorrect = quizAnswers[4] === appData.quizzes[4].answerIndex;
    const strengths: string[] = [];
    const gaps: string[] = [];
    const actions: string[] = [];
    if (codingCorrect)
      strengths.push(lang === "en" ? "Programming Basics & Python list types" : "పైథాన్ బేసిక్స్ మరియు ప్రాథమిక కోడింగ్");
    else {
      gaps.push(lang === "en" ? "Stack/Queue structures & Python list variables" : "డేటా స్ట్రక్చర్స్ మరియు పైథాన్ జాబితాలు");
      actions.push(lang === "en" ? "Revise stack and queue operations on GeeksforGeeks." : "స్టాక్ మరియు క్యూ బేసిక్ క్లాసులు తెలుగులో వినండి.");
    }
    if (aptCorrect)
      strengths.push(lang === "en" ? "Quantitative Aptitude (Averages, Time & Work)" : "ఆప్టిట్యూడ్ పనుల వేగం మరియు సగటులు");
    else {
      gaps.push(lang === "en" ? "Quantitative speed calculations" : "వేగం, దూరం, మరియు సగటు లెక్కల సాధన");
      actions.push(lang === "en" ? "Practice 10 average-calculation questions on Indiabix." : "రోజువారీ 10 ఆప్టిట్యూడ్ లెక్కలను సాధన చేయండి.");
    }
    if (commCorrect)
      strengths.push(lang === "en" ? "Email etiquette & Professional communication" : "మర్యాదపూర్వక కమ్యూనికేషన్");
    else {
      gaps.push(lang === "en" ? "Formal workplace sentence structuring" : "ప్రొఫెషనల్ ఈమెయిల్ మరియు ఇంగ్లీష్ వాక్యాల నిర్మాణం");
      actions.push(lang === "en" ? "Write a mock self-introduction email and check its spelling." : "ఒక మర్యాదపూర్వక పరిచయ ఈమెయిల్ డ్రాఫ్ట్ చేయండి.");
    }
    if (!strengths.length)
      strengths.push(lang === "en" ? "No major strengths identified. Restart basic preparation." : "స్పష్టమైన బలాలు లేవు.");
    if (!gaps.length) {
      gaps.push(lang === "en" ? "Perfect! No significant placement gaps detected." : "చాలా బాగుంది! లోపాలు ఏవీ లేవు.");
      actions.push(lang === "en" ? "Keep practice levels active and prepare core mock interviews." : "ఇలాగే నిలకడగా మాక్ ఇంటర్వ్యూలు చేస్తూ ఉండండి.");
    }
    return { strengths, gaps, actions };
  };

  const restartSkillGapQuiz = () => {
    setQuizPanel("intro");
    setQuizIdx(0);
    setQuizAnswers([]);
    setQuizSelected(null);
  };

  const currentQuote = quotes[quoteIdx];

  return {
    lang,
    theme,
    activeTab,
    streak,
    habits,
    heatmapHistory,
    roadmapPhases,
    completedRoadmapTasks,
    roadmapForm,
    setRoadmapForm,
    resume,
    setResume,
    atsScore,
    atsSuggestions,
    showAtsCard,
    jobs,
    toast,
    projectFilter,
    modalProject,
    aptitudeCategory,
    aptitudeIdx,
    aptitudeAnswer,
    showAptSolution,
    aptitudeQuestions,
    currentAptitudeQ,
    filteredProjects,
    interviewPanel,
    interviewType,
    chatLog,
    interviewTyping,
    chatInput,
    setChatInput,
    interviewAvgScore,
    quizPanel,
    quizIdx,
    quizSelected,
    quizScorePercent,
    quizCorrectCount,
    completedHabits,
    activeDays,
    readinessPercent,
    pageHeader,
    t,
    toggleTheme,
    toggleLanguage,
    switchTab,
    toggleHabit,
    toggleHeatmapCell,
    generateUserRoadmap,
    toggleRoadmapTask,
    evaluateResumeATS,
    switchAptitudeCategory,
    selectAptitudeOption,
    nextAptitudeQuestion,
    applyToJob,
    startInterviewSession,
    submitCandidateAnswer,
    endInterviewSession,
    restartMockInterview,
    getInterviewReport,
    getInterviewerTitle,
    startSkillGapQuiz,
    selectQuizOption,
    nextQuizQuestion,
    getQuizReport,
    restartSkillGapQuiz,
    setProjectFilter,
    setModalProjectId,
    currentQuote,
  };
}
