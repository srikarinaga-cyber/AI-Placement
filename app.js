// app.js

// App State
const state = {
  lang: 'en',
  theme: 'light',
  activeTab: 'dashboard',
  streak: 5,
  habits: [false, true, false, false, true], // 2 of 5 completed initially
  roadmapPhases: [],
  completedRoadmapTasks: {}, // tracks { 'phaseIdx-taskIdx': true }
  
  // 30 days of consistency history
  heatmapHistory: [
    1, 2, 0, 4, 3, 1, 0, 0, 2, 4,
    1, 3, 2, 0, 4, 1, 2, 3, 0, 1,
    0, 2, 4, 3, 1, 2, 4, 0, 3, 4
  ],
  
  interview: {
    active: false,
    type: null,
    questions: [],
    currentIdx: 0,
    chatLog: [],
    scores: []
  },
  
  quiz: {
    active: false,
    questions: [],
    currentIdx: 0,
    userAnswers: [],
    completed: false
  },

  // NEW STATES FOR PHASE 2
  atsScoreEvaluated: null,
  
  aptitude: {
    category: 'percentages',
    questions: [],
    currentIdx: 0,
    userAnswer: null // stores selected option for active question
  },
  
  jobs: [] // populated from data.js on load
};

// Daily motivational quotes
const quotes = [
  {
    en: "Small daily improvements over time lead to stunning results. Stay consistent!",
    te: "రోజూ చేసే చిన్న చిన్న మార్పులే కాలక్రమేణా అద్భుతమైన విజయాలకు దారితీస్తాయి. నిలకడగా ఉండండి!",
    author: "Robin Sharma"
  },
  {
    en: "Opportunities don't happen, you create them. Keep building your skills.",
    te: "అవకాశాలు వాటంతట అవే రావు, మీరే వాటిని సృష్టించుకోవాలి. నైపుణ్యాలను పెంపొందించుకోండి.",
    author: "Chris Grosser"
  },
  {
    en: "Believe you can and you're halfway there.",
    te: "మీరు చేయగలరని నమ్మండి, సగం విజయం సాధించినట్లే.",
    author: "Theodore Roosevelt"
  }
];

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Set default theme
  document.documentElement.setAttribute('data-theme', state.theme);
  
  // Initialize jobs array from data
  state.jobs = JSON.parse(JSON.stringify(appData.jobAlerts));
  
  // Render initially
  updateLanguageUI();
  renderDashboardChecklist();
  renderHeatmap();
  renderTrackerHabitChecklist();
  renderProjectsList('all');
  
  // Set default resume preview
  updateResumePreview();
  
  // Load default aptitude category
  switchAptitudeCategory('percentages');
  
  // Render job board alerts
  renderJobsBoard();
  
  // Set random quote
  setRandomQuote();
});

// Theme Toggle
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
}

// Language Toggle
function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'te' : 'en';
  
  // Update UI texts
  updateLanguageUI();
  
  // Re-render components with the new language state
  renderDashboardChecklist();
  renderTrackerHabitChecklist();
  
  if (state.roadmapPhases.length > 0) {
    renderRoadmapTimeline();
  }
  
  if (state.interview.active) {
    document.getElementById("interviewer-role-name").innerText = 
      state.lang === 'en' ? getInterviewerTitle(state.interview.type).en : getInterviewerTitle(state.interview.type).te;
  }
  
  if (state.quiz.active) {
    renderQuizQuestion();
  }
  
  renderProjectsList(currentProjectFilter);
  
  // Refresh aptitude layout language
  renderAptitudeQuestionCard();
  
  // Refresh job board text
  renderJobsBoard();
}

// Update all UI elements with data-tr attributes
function updateLanguageUI() {
  const langBtnText = document.getElementById("lang-btn-text");
  if (langBtnText) {
    langBtnText.innerText = translations[state.lang].toggleLanguage;
  }
  
  const elements = document.querySelectorAll("[data-tr]");
  elements.forEach(el => {
    const key = el.getAttribute("data-tr");
    if (translations[state.lang][key]) {
      el.innerText = translations[state.lang][key];
    }
  });

  document.title = translations[state.lang].appName + " - Placements Guide";
  updateDynamicHeaders();
}

function updateDynamicHeaders() {
  const pageTitle = document.getElementById("page-main-title");
  const pageSub = document.getElementById("page-sub-title");
  
  if (state.activeTab === 'dashboard') {
    pageTitle.innerText = translations[state.lang].appName;
    pageSub.innerText = translations[state.lang].tagline;
  } else if (state.activeTab === 'roadmap') {
    pageTitle.innerText = translations[state.lang].roadmap;
    pageSub.innerText = translations[state.lang].roadmapSub;
  } else if (state.activeTab === 'resumeBuilder') {
    pageTitle.innerText = translations[state.lang].resumeBuilder;
    pageSub.innerText = translations[state.lang].resumeSub;
  } else if (state.activeTab === 'mockInterview') {
    pageTitle.innerText = translations[state.lang].mockInterview;
    pageSub.innerText = translations[state.lang].interviewSub;
  } else if (state.activeTab === 'aptitudeArena') {
    pageTitle.innerText = translations[state.lang].aptitudeArena;
    pageSub.innerText = translations[state.lang].aptitudeSub;
  } else if (state.activeTab === 'skillGap') {
    pageTitle.innerText = translations[state.lang].skillGap;
    pageSub.innerText = translations[state.lang].skillGapSub;
  } else if (state.activeTab === 'projects') {
    pageTitle.innerText = translations[state.lang].projects;
    pageSub.innerText = translations[state.lang].projectsSub;
  } else if (state.activeTab === 'jobBoard') {
    pageTitle.innerText = translations[state.lang].jobBoard;
    pageSub.innerText = translations[state.lang].jobSub;
  } else if (state.activeTab === 'tracker') {
    pageTitle.innerText = translations[state.lang].tracker;
    pageSub.innerText = translations[state.lang].trackerSub;
  }
}

// Tab Switching Logic
function switchTab(tabId) {
  state.activeTab = tabId;
  
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => item.classList.remove("active"));
  
  const activeMenu = document.getElementById(`nav-${tabId}`);
  if (activeMenu) activeMenu.classList.add("active");
  
  const views = document.querySelectorAll(".tab-view");
  views.forEach(view => {
    view.style.display = "none";
    view.classList.remove("active-view");
  });
  
  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) {
    activeView.style.display = "block";
    activeView.classList.add("active-view");
  }
  
  updateDynamicHeaders();
  updateDashboardWidgets();
}

// Daily Quotes
function setRandomQuote() {
  const quoteEl = document.getElementById("motivational-quote-text");
  const authorEl = document.getElementById("motivational-quote-author");
  
  if (quoteEl && authorEl) {
    const idx = Math.floor(Math.random() * quotes.length);
    const quote = quotes[idx];
    quoteEl.innerText = `"${quote[state.lang]}"`;
    authorEl.innerText = `- ${quote.author}`;
  }
}

// Render Dashboard Habits Checklist
function renderDashboardChecklist() {
  const container = document.getElementById("dashboard-checklist");
  if (!container) return;
  
  container.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const checked = state.habits[i];
    const item = document.createElement("div");
    item.className = `habit-item ${checked ? 'checked' : ''}`;
    item.setAttribute("onclick", `toggleHabit(${i})`);
    
    const habitKey = `habit${i+1}`;
    const habitText = translations[state.lang][habitKey];
    
    item.innerHTML = `
      <div class="habit-checkbox"></div>
      <div class="habit-text">${habitText}</div>
    `;
    container.appendChild(item);
  }
}

// Sync Checklist with Streak Tracker checklist
function renderTrackerHabitChecklist() {
  const container = document.getElementById("tracker-habit-list");
  if (!container) return;
  
  container.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const checked = state.habits[i];
    const item = document.createElement("div");
    item.className = `habit-item ${checked ? 'checked' : ''}`;
    item.setAttribute("onclick", `toggleHabit(${i})`);
    
    const habitKey = `habit${i+1}`;
    const habitText = translations[state.lang][habitKey];
    
    item.innerHTML = `
      <div class="habit-checkbox"></div>
      <div class="habit-text">${habitText}</div>
    `;
    container.appendChild(item);
  }
}

// Toggle habit complete
function toggleHabit(idx) {
  state.habits[idx] = !state.habits[idx];
  renderDashboardChecklist();
  renderTrackerHabitChecklist();
  updateDashboardWidgets();
  
  const completedCount = state.habits.filter(h => h === true).length;
  if (completedCount === 5) {
    state.heatmapHistory[state.heatmapHistory.length - 1] = 4;
    renderHeatmap();
  } else if (completedCount > 0) {
    state.heatmapHistory[state.heatmapHistory.length - 1] = Math.min(completedCount, 3);
    renderHeatmap();
  } else {
    state.heatmapHistory[state.heatmapHistory.length - 1] = 0;
    renderHeatmap();
  }
}

// Update widget values
function updateDashboardWidgets() {
  const streakEl1 = document.getElementById("dash-streak-count");
  const streakEl2 = document.getElementById("tracker-streak-count");
  const completedHabitsEl = document.getElementById("dash-completed-habits");
  const progressEl = document.getElementById("dash-readiness-percent");
  
  const completedHabits = state.habits.filter(h => h === true).length;
  
  if (streakEl1) streakEl1.innerText = state.streak;
  if (streakEl2) streakEl2.innerText = state.streak;
  if (completedHabitsEl) completedHabitsEl.innerText = completedHabits;
  
  // Calculate readiness percent
  const activeDays = state.heatmapHistory.filter(d => d > 0).length;
  const heatmapScore = Math.min((activeDays / 30) * 20, 20); // 20% max
  
  const totalSteps = Object.keys(state.completedRoadmapTasks).length;
  const roadmapScore = Math.min(totalSteps * 5, 40); // 40% max
  
  // Include ATS resume score if evaluated (max 15%)
  const resumeScore = state.atsScoreEvaluated ? (state.atsScoreEvaluated / 100) * 15 : 0;
  
  // Include mock interview & applied jobs count (max 25%)
  const appliedJobsCount = state.jobs.filter(j => j.applied === true).length;
  const appliedScore = Math.min(appliedJobsCount * 5, 15);
  
  const mockScore = state.interview.scores.length > 0 ? 
    (state.interview.scores.reduce((a,b)=>a+b,0) / state.interview.scores.length) : 5;
  const mockPerformScore = (mockScore / 10) * 10; // 10% max
  
  const totalReadiness = Math.round(heatmapScore + roadmapScore + resumeScore + appliedScore + mockPerformScore);
  if (progressEl) progressEl.innerText = Math.min(totalReadiness, 100);
}

// Render Heatmap (GitHub Contribution Style)
function renderHeatmap() {
  const container = document.getElementById("heatmap-grid-container");
  const activeDaysEl = document.getElementById("tracker-active-days-count");
  if (!container) return;
  
  container.innerHTML = "";
  state.heatmapHistory.forEach((level, index) => {
    const day = document.createElement("div");
    day.className = "heatmap-day";
    day.setAttribute("data-level", level);
    day.setAttribute("onclick", `toggleHeatmapCell(${index})`);
    
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    
    const dayName = index === 29 ? "Today" : `Day -${29 - index}`;
    tooltip.innerText = `${dayName}: ${level} tasks completed`;
    
    day.appendChild(tooltip);
    container.appendChild(day);
  });
  
  const activeCount = state.heatmapHistory.filter(d => d > 0).length;
  if (activeDaysEl) activeDaysEl.innerText = `${activeCount}/30`;
}

function toggleHeatmapCell(idx) {
  state.heatmapHistory[idx] = (state.heatmapHistory[idx] + 1) % 5;
  renderHeatmap();
  updateDashboardWidgets();
}

// ROADMAP LOGIC
function generateUserRoadmap() {
  const branch = document.getElementById("roadmap-branch").value;
  const level = document.getElementById("roadmap-level").value;
  const goal = document.getElementById("roadmap-goal").value;
  const duration = document.getElementById("roadmap-duration").value;
  
  state.roadmapPhases = appData.getRoadmap(branch, level, goal, duration);
  state.completedRoadmapTasks = {};
  
  renderRoadmapTimeline();
  updateDashboardWidgets();
}

function renderRoadmapTimeline() {
  const container = document.getElementById("generated-roadmap-section");
  if (!container) return;
  
  container.innerHTML = "";
  
  const headerCard = document.createElement("div");
  headerCard.className = "card-glass";
  headerCard.style.padding = "1.5rem";
  headerCard.style.marginBottom = "1.5rem";
  headerCard.innerHTML = `
    <h3 style="color: var(--accent-color); font-weight: 700;">
      ${state.lang === 'en' ? 'Generated Timeline & Milestones' : 'సృష్టించబడిన రోడ్‌మ్యాప్ & మైలురాళ్ళు'}
    </h3>
    <p style="font-size:0.9rem; color: var(--text-secondary); margin-top:0.25rem;">
      ${state.lang === 'en' ? 'Check off items as you complete them to increase your Placement Readiness Score.' : 'ప్లేస్‌మెంట్ సన్నద్ధత స్కోరును పెంచుకోవడానికి పూర్తి చేసిన పనులను టిక్ చేయండి.'}
    </p>
  `;
  container.appendChild(headerCard);
  
  const timeline = document.createElement("div");
  timeline.className = "timeline-container";
  
  state.roadmapPhases.forEach((phase, phaseIdx) => {
    const phaseDiv = document.createElement("div");
    phaseDiv.className = "timeline-phase";
    
    const goalsList = state.lang === 'en' ? phase.goals : phase.goalsTe;
    const titleText = state.lang === 'en' ? phase.title : phase.titleTe;
    
    let goalsHTML = "";
    goalsList.forEach((goal, goalIdx) => {
      const taskKey = `${phaseIdx}-${goalIdx}`;
      const checked = state.completedRoadmapTasks[taskKey] ? 'checked' : '';
      
      goalsHTML += `
        <li class="phase-goal-item">
          <div class="habit-item ${checked}" style="padding: 0.5rem 0.75rem; width:100%; border:none; background:transparent;" onclick="toggleRoadmapTask(${phaseIdx}, ${goalIdx})">
            <div class="habit-checkbox"></div>
            <div class="habit-text" style="font-size:0.9rem;">${goal}</div>
          </div>
        </li>
      `;
    });
    
    let resourcesHTML = "";
    phase.resources.forEach(res => {
      resourcesHTML += `
        <a href="${res.url}" target="_blank" class="resource-tag">
          🔗 ${res.name}
        </a>
      `;
    });
    
    phaseDiv.innerHTML = `
      <div class="timeline-phase-header">
        <div class="phase-title">${titleText}</div>
        <div style="font-size: 0.8rem; background: var(--primary-glow); padding:0.25rem 0.5rem; border-radius:4px; font-weight:600; color:var(--primary-color);">
          ${state.lang === 'en' ? 'Active' : 'క్రియాశీలకంగా ఉంది'}
        </div>
      </div>
      <ul class="phase-goals">
        ${goalsHTML}
      </ul>
      <div class="phase-resources">
        <strong style="font-size: 0.8rem; color: var(--text-muted); display:block; width:100%; margin-bottom:0.25rem;">
          ${state.lang === 'en' ? 'RESOURCES / వనరులు:' : 'కాన్సెప్ట్ లింక్స్ / RESOURCES:'}
        </strong>
        ${resourcesHTML}
      </div>
    `;
    timeline.appendChild(phaseDiv);
  });
  
  container.appendChild(timeline);
}

function toggleRoadmapTask(phaseIdx, goalIdx) {
  const taskKey = `${phaseIdx}-${goalIdx}`;
  if (state.completedRoadmapTasks[taskKey]) {
    delete state.completedRoadmapTasks[taskKey];
  } else {
    state.completedRoadmapTasks[taskKey] = true;
  }
  renderRoadmapTimeline();
  updateDashboardWidgets();
}

// NEW FEATURE: RESUME BUILDER LOGIC
function updateResumePreview() {
  const name = document.getElementById("res-in-name").value;
  const email = document.getElementById("res-in-email").value;
  const phone = document.getElementById("res-in-phone").value;
  const edu = document.getElementById("res-in-education").value;
  const skills = document.getElementById("res-in-skills").value;
  const proj = document.getElementById("res-in-project").value;
  const exp = document.getElementById("res-in-experience").value;
  
  document.getElementById("res-out-name").innerText = name || "Your Name";
  document.getElementById("res-out-email").innerText = email || "email@address.com";
  document.getElementById("res-out-phone").innerText = phone || "+91 0000000000";
  document.getElementById("res-out-education").innerText = edu || "College Details";
  document.getElementById("res-out-skills").innerText = skills || "Java, SQL...";
  document.getElementById("res-out-project").innerText = proj || "Project detail bullet points.";
  document.getElementById("res-out-experience").innerText = exp || "Work history details.";
}

function evaluateResumeATS() {
  const skills = document.getElementById("res-in-skills").value.toLowerCase();
  const proj = document.getElementById("res-in-project").value;
  const exp = document.getElementById("res-in-experience").value;
  
  let score = 55; // Base score
  const suggestions = [];
  
  // 1. Metric check (checking for numbers/percentages representing impact)
  const numbersRegex = /\b\d+%\b|\b\d+\s+percent\b|\bLPA\b|\b\d+\s+users\b|\bspeed\b/;
  const hasMetrics = numbersRegex.test(proj) || numbersRegex.test(exp);
  if (hasMetrics) {
    score += 15;
  } else {
    suggestions.push({
      en: "Add numerical metrics to your project achievements (e.g. 'Improved performance by 30%', 'Served 100+ users').",
      te: "మీ ప్రాజెక్ట్ వివరాలలో సంఖ్యాత్మక విజయాలు జోడించండి (ఉదాహరణ: 'వేగం 30% పెరిగింది', '100+ విద్యార్థులు వాడారు')."
    });
  }
  
  // 2. Technical keyword checks (looking for databases & clean tools)
  const keyKeywords = ["sql", "python", "mysql", "database", "git", "javascript", "dsa", "data structures"];
  let keywordCount = 0;
  keyKeywords.forEach(k => {
    if (skills.includes(k) || proj.toLowerCase().includes(k)) {
      keywordCount++;
    }
  });
  
  if (keywordCount >= 4) {
    score += 20;
  } else {
    score += keywordCount * 4;
    suggestions.push({
      en: "Include key placement skills like SQL, Git, and Database details under your technical skills section.",
      te: "సాంకేతిక నైపుణ్యాలలో SQL, Git, మరియు డేటాబేస్ (Database) వంటి ముఖ్యమైన పదాలు జోడించండి."
    });
  }
  
  // 3. Length checks
  if (proj.length > 50 && exp.length > 50) {
    score += 10;
  } else {
    suggestions.push({
      en: "Flesh out description bullets. Give details about the problem statement and technology choices.",
      te: "ప్రాజెక్టులు మరియు అనుభవం విభాగాల్లో కొద్దిగా ఎక్కువ వివరణ ఇవ్వండి (ఏ సాంకేతికత వాడారో వివరించండి)."
    });
  }
  
  // Apply state
  state.atsScoreEvaluated = score;
  
  // Render scorecard
  document.getElementById("ats-scorecard").style.display = "flex";
  document.getElementById("ats-score-num").innerText = score;
  
  const suggestionsUl = document.getElementById("ats-suggestions");
  suggestionsUl.innerHTML = "";
  
  if (suggestions.length === 0) {
    suggestionsUl.innerHTML = `<li>✨ ${state.lang === 'en' ? 'Excellent! Resume is ATS optimized.' : 'అద్భుతం! మీ రెజ్యూమ్ స్క్రీనింగ్ కి సిద్ధంగా ఉంది.'}</li>`;
  } else {
    suggestions.forEach(s => {
      const li = document.createElement("li");
      li.innerText = state.lang === 'en' ? s.en : s.te;
      suggestionsUl.appendChild(li);
    });
  }
  
  showToast(state.lang === 'en' ? "ATS Evaluation Completed!" : "రెజ్యూమ్ విశ్లేషణ పూర్తయింది!");
  updateDashboardWidgets();
}

// NEW FEATURE: APTITUDE ARENA LOGIC
function switchAptitudeCategory(category) {
  state.aptitude.category = category;
  state.aptitude.questions = appData.aptitudeQuestions.filter(q => q.topic === category);
  state.aptitude.currentIdx = 0;
  state.aptitude.userAnswer = null;
  
  // Update category tabs active class
  const tabs = document.querySelectorAll(".topic-selector-tabs .filter-btn");
  tabs.forEach(t => t.classList.remove("active"));
  
  const activeTab = document.getElementById(`apt-tab-${category}`);
  if (activeTab) activeTab.classList.add("active");
  
  renderAptitudeQuestionCard();
}

function renderAptitudeQuestionCard() {
  const idx = state.aptitude.currentIdx;
  const qList = state.aptitude.questions;
  
  const cardContent = document.getElementById("aptitude-card-content");
  const nextBtn = document.getElementById("apt-next-btn");
  const solBox = document.getElementById("apt-solution-box");
  const showSolBtn = document.getElementById("apt-show-sol-btn");
  
  if (qList.length === 0) {
    cardContent.innerHTML = `<div style="text-align:center; color:var(--text-muted);">No questions available.</div>`;
    nextBtn.style.display = "none";
    return;
  }
  
  const q = qList[idx];
  
  // Hide answer boxes
  solBox.style.display = "none";
  showSolBtn.style.display = "none";
  nextBtn.style.display = "none";
  
  // Setup question text
  document.getElementById("apt-question-text").innerText = state.lang === 'en' ? q.question : q.questionTe;
  
  // Options
  const container = document.getElementById("apt-options-container");
  container.innerHTML = "";
  
  q.options.forEach((opt, oIdx) => {
    const div = document.createElement("div");
    div.className = "quiz-option";
    
    // If already answered
    if (state.aptitude.userAnswer !== null) {
      if (oIdx === q.answerIndex) {
        div.classList.add("correct");
      } else if (oIdx === state.aptitude.userAnswer) {
        div.classList.add("incorrect");
      }
    } else {
      div.setAttribute("onclick", `selectAptitudeOption(${oIdx})`);
    }
    
    const letter = String.fromCharCode(65 + oIdx);
    div.innerHTML = `
      <div class="quiz-option-letter">${letter}</div>
      <div>${opt}</div>
    `;
    container.appendChild(div);
  });
  
  if (state.aptitude.userAnswer !== null) {
    showSolBtn.style.display = "block";
    solBox.innerHTML = `
      <strong>${state.lang === 'en' ? 'Explanation / వివరణ:' : 'లెక్క వివరణ:'}</strong><br>
      ${state.lang === 'en' ? q.explanation : q.explanationTe}
    `;
    
    if (idx < qList.length - 1) {
      nextBtn.style.display = "block";
    }
  }
}

function selectAptitudeOption(optIdx) {
  state.aptitude.userAnswer = optIdx;
  
  // Reveal answer colors
  renderAptitudeQuestionCard();
  
  // Show explanation triggers
  const showSolBtn = document.getElementById("apt-show-sol-btn");
  showSolBtn.style.display = "block";
  
  const qList = state.aptitude.questions;
  if (state.aptitude.currentIdx < qList.length - 1) {
    document.getElementById("apt-next-btn").style.display = "block";
  }
}

function showAptitudeSolution() {
  const solBox = document.getElementById("apt-solution-box");
  solBox.style.display = solBox.style.display === "block" ? "none" : "block";
}

function nextAptitudeQuestion() {
  if (state.aptitude.currentIdx < state.aptitude.questions.length - 1) {
    state.aptitude.currentIdx++;
    state.aptitude.userAnswer = null;
    renderAptitudeQuestionCard();
  }
}

// NEW FEATURE: JOB BOARD ALERTS
function renderJobsBoard() {
  const container = document.getElementById("job-alerts-container");
  if (!container) return;
  
  container.innerHTML = "";
  state.jobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "card-glass job-card";
    
    const applyBtnHTML = job.applied ? 
      `<button class="btn-primary applied-badge" disabled data-tr="applied">${translations[state.lang].applied}</button>` :
      `<button class="btn-primary" onclick="applyToJob(${job.id})" data-tr="applyNow">${translations[state.lang].applyNow}</button>`;
      
    card.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.15rem; font-weight:700;">${job.title}</h3>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Off-Campus</span>
        </div>
        <div class="job-company">${job.company}</div>
        <div class="job-pkg">${job.package}</div>
        
        <div class="job-meta-row">
          <div class="job-meta-item">📍 ${job.location}</div>
          <div class="job-meta-item">🎓 ${job.eligibility}</div>
        </div>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1rem;">
          <strong>Skills:</strong> ${job.skills}
        </p>
      </div>
      ${applyBtnHTML}
    `;
    container.appendChild(card);
  });
}

function applyToJob(id) {
  const job = state.jobs.find(j => j.id === id);
  if (!job) return;
  
  job.applied = true;
  renderJobsBoard();
  updateDashboardWidgets();
  
  showToast(state.lang === 'en' ? `Applied to ${job.company} successfully!` : `${job.company} కి విజయవంతంగా అప్లై చేసారు!`);
}

// Toast Notification trigger helper
function showToast(message) {
  const toast = document.getElementById("toast-notif");
  if (!toast) return;
  
  toast.innerText = message;
  toast.style.display = "block";
  
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// MOCK INTERVIEW ARENA LOGIC
function getInterviewerTitle(type) {
  const titles = {
    technical: { en: "AI Tech Lead (Microsoft/TCS mock)", te: "AI టెక్నికల్ మేనేజర్ (టాటా/మైక్రోసాఫ్ట్ మాక్)" },
    hr: { en: "AI Senior HR Specialist", te: "AI సీనియర్ HR మేనేజర్" },
    aiml: { en: "AI/ML Principal Architect", te: "AI/ML ప్రిన్సిపల్ ఆర్కిటెక్ట్" }
  };
  return titles[type] || { en: "Recruiter", te: "ఇంటర్వ్యూయర్" };
}

function startInterviewSession(type) {
  state.interview.active = true;
  state.interview.type = type;
  state.interview.questions = appData.interviews[type];
  state.interview.currentIdx = 0;
  state.interview.chatLog = [];
  state.interview.scores = [];
  
  document.getElementById("interview-setup-panel").style.display = "none";
  document.getElementById("interview-chat-arena").style.display = "flex";
  document.getElementById("interview-report-panel").style.display = "none";
  
  document.getElementById("interviewer-role-name").innerText = 
    state.lang === 'en' ? getInterviewerTitle(type).en : getInterviewerTitle(type).te;
  
  triggerInterviewerQuestion();
}

function triggerInterviewerQuestion() {
  const idx = state.interview.currentIdx;
  const q = state.interview.questions[idx];
  
  document.getElementById("interviewer-typing-indicator").style.display = "flex";
  
  setTimeout(() => {
    document.getElementById("interviewer-typing-indicator").style.display = "none";
    state.interview.chatLog.push({
      sender: 'interviewer',
      text: q.question,
      textTe: q.questionTe
    });
    renderChatMessages();
  }, 1000);
}

function renderChatMessages() {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;
  
  container.innerHTML = "";
  state.interview.chatLog.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = `chat-msg ${msg.sender}`;
    
    if (msg.sender === 'interviewer') {
      bubble.innerHTML = `
        <div style="font-weight:700; font-size:0.75rem; color:var(--accent-color); margin-bottom:0.25rem;">AI Mentor</div>
        <div>${msg.text}</div>
        <div style="font-size:0.85rem; color:var(--text-secondary); border-top:1px dashed var(--border-color); margin-top:0.5rem; padding-top:0.4rem; font-style:italic;">
          తెలుగు అనువాదం: ${msg.textTe}
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div style="font-weight:700; font-size:0.75rem; color:rgba(255,255,255,0.7); margin-bottom:0.25rem;">You (Candidate)</div>
        <div>${msg.text}</div>
      `;
    }
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

function handleChatSubmit(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitCandidateAnswer();
  }
}

function submitCandidateAnswer() {
  const inputEl = document.getElementById("candidate-chat-input");
  const responseText = inputEl.value.trim();
  if (!responseText) return;
  
  inputEl.value = "";
  state.interview.chatLog.push({
    sender: 'candidate',
    text: responseText
  });
  renderChatMessages();
  evaluateAnswer(responseText);
}

function evaluateAnswer(candidateText) {
  const q = state.interview.questions[state.interview.currentIdx];
  document.getElementById("interviewer-typing-indicator").style.display = "flex";
  
  setTimeout(() => {
    document.getElementById("interviewer-typing-indicator").style.display = "none";
    
    let hits = 0;
    const lowerText = candidateText.toLowerCase();
    q.hints.forEach(hint => {
      if (lowerText.includes(hint.toLowerCase())) {
        hits++;
      }
    });
    
    const score = hits === 0 ? 3.5 : Math.min(4.5 + (hits / q.hints.length) * 5.5, 10);
    state.interview.scores.push(score);
    
    let evaluationFeedback = "";
    let evaluationFeedbackTe = "";
    
    if (score >= 8) {
      evaluationFeedback = `Excellent response! You touched on key concepts: ${q.hints.slice(0, 3).join(', ')}. Very professional articulation.`;
      evaluationFeedbackTe = `చాలా చక్కగా సమాధానం చెప్పారు. మీరు ప్రధానమైన పదాలను ఉపయోగించారు. కమ్యూనికేషన్ చాలా బాగుంది.`;
    } else if (score >= 5.5) {
      evaluationFeedback = `Decent effort. However, you should emphasize more on terms like: ${q.hints.filter(h => !lowerText.includes(h)).slice(0, 2).join(', ')}.`;
      evaluationFeedbackTe = `మంచి ప్రయత్నం. కానీ, మీరు ఇంకా కొన్ని ముఖ్యమైన విషయాలను కవర్ చేయాల్సి ఉంటుంది. ఉదాహరణకు: ${q.hints.filter(h => !lowerText.includes(h)).slice(0, 2).join(', ')}.`;
    } else {
      evaluationFeedback = `Your answer is too short or missing fundamental technical keywords. Please review: ${q.hints.slice(0, 3).join(', ')}.`;
      evaluationFeedbackTe = `మీ సమాధానంలో అవసరమైన సాంకేతిక పదాలు లేవు. దయచేసి OOPs/Data structure బేసిక్స్ మరొక్కసారి రివిజన్ చేయండి.`;
    }
    
    state.interview.chatLog.push({
      sender: 'interviewer',
      text: `[Feedback: ${score.toFixed(1)}/10] - ${evaluationFeedback}`,
      textTe: `${evaluationFeedbackTe}`
    });
    renderChatMessages();
    
    state.interview.currentIdx++;
    if (state.interview.currentIdx < state.interview.questions.length) {
      setTimeout(() => {
        triggerInterviewerQuestion();
      }, 1500);
    } else {
      setTimeout(() => {
        state.interview.chatLog.push({
          sender: 'interviewer',
          text: "You have completed the mock interview! Please click 'End Interview & Get Report' at the top to view your detailed scorecard.",
          textTe: "మీ మాక్ ఇంటర్వ్యూ విజయవంతంగా పూర్తయింది! రిపోర్ట్ చూడటానికి పైన ఉన్న బటన్ క్లిక్ చేయండి."
        });
        renderChatMessages();
      }, 1000);
    }
  }, 1200);
}

function endInterviewSession() {
  state.interview.active = false;
  const avgScore = state.interview.scores.length > 0 ? 
    state.interview.scores.reduce((a,b)=>a+b, 0) / state.interview.scores.length : 0;
  
  document.getElementById("interview-setup-panel").style.display = "none";
  document.getElementById("interview-chat-arena").style.display = "none";
  document.getElementById("interview-report-panel").style.display = "flex";
  
  document.getElementById("report-score-val").innerText = avgScore.toFixed(1);
  
  const overallSummary = document.getElementById("report-overall-summary");
  const techFeedback = document.getElementById("report-tech-feedback");
  const commFeedback = document.getElementById("report-comm-feedback");
  const improveFeedback = document.getElementById("report-improve-feedback");
  
  if (avgScore >= 8) {
    overallSummary.innerText = state.lang === 'en' ? 
      "Outstanding performance! Ready for corporate interviews." : "అద్భుతమైన ప్రదర్శన! మీరు ఇంటర్వ్యూకి సిద్ధంగా ఉన్నారు.";
    techFeedback.innerText = state.lang === 'en' ? 
      "Demonstrates high confidence and command over engineering terms. Code organization vocabulary is solid." : "సాంకేతిక నైపుణ్యాలు చాలా బాగున్నాయి. కాన్సెప్ట్స్ పై మంచి అవగాహన ఉంది.";
    commFeedback.innerText = state.lang === 'en' ? 
      "Vocabulary flow is clear. Very polite and well-structured professional answers." : "కమ్యూనికేషన్ ఫ్లో స్పష్టంగా ఉంది. చక్కగా సమాధానాలు చెప్పారు.";
    improveFeedback.innerText = state.lang === 'en' ? 
      "Focus on solving problems slightly faster and explaining code lines as you write." : "కోడింగ్ వేగాన్ని పెంచడానికి రోజువారీ లీట్‌కోడ్ ప్రాక్టీస్ చేయండి.";
  } else if (avgScore >= 5.5) {
    overallSummary.innerText = state.lang === 'en' ? 
      "Good foundation, but needs more refinement in technical structures." : "మంచి పునాది ఉంది, కానీ సాంకేతిక వివరణలలో మరింత మెరుగుపడాలి.";
    techFeedback.innerText = state.lang === 'en' ? 
      "Understands basic logic but misses detail definitions. Make sure to define variables precisely." : "బేసిక్స్ బాగానే తెలుసు కానీ నిర్వచనాలు సరిగ్గా చెప్పలేకపోయారు. ముఖ్య పదాలపై పట్టు పెంచుకోండి.";
    commFeedback.innerText = state.lang === 'en' ? 
      "Occasional hesitations or grammar issues. Consider practicing in front of a mirror." : "ఇంగ్లీషులో మాట్లాడేటప్పుడు కొద్దిగా తడబాటు ఉంది. రోజువారీ రీడింగ్ ప్రాక్టీస్ చేయండి.";
    improveFeedback.innerText = state.lang === 'en' ? 
      "Use 'Telglish' logic to outline your thoughts first, then formulate correct English sentences." : "ముందుగా తెలుగులో ఆవలోకనం చేసుకుని, ఆపై ప్రశాంతంగా ఇంగ్లీషులో అనువదించడానికి ప్రయత్నించండి.";
  } else {
    overallSummary.innerText = state.lang === 'en' ? 
      "Needs significant practice. Recommend restarting basic roadmaps." : "చాలా ప్రాక్టీస్ అవసరం. బేసిక్ కోడింగ్ రోడ్‌మ్యాప్‌ని మరొకసారి రివిజన్ చేయండి.";
    techFeedback.innerText = state.lang === 'en' ? 
      "Missing core data structure concepts and OOP terms. Revise Stack vs Queue differences." : "డేటా स्ट्रक्चर्स మరియు OOPs పద్ధతులపై సరైన అవగాహన లేదు. బేసిక్స్ నుండి తిరిగి చదవండి.";
    commFeedback.innerText = state.lang === 'en' ? 
      "Struggles to articulate answers. Keep practice sessions regular." : "సమాధానం చెప్పడానికి చాలా ఇబ్బంది పడుతున్నారు. రోజువారీ ఇంగ్లీష్ మాట్లాడటం ప్రాక్టీస్ చేయండి.";
    improveFeedback.innerText = state.lang === 'en' ? 
      "Follow our Telugu roadmap lectures and try explaining concepts out loud in Telugu first." : "మా తెలుగు రోడ్‌మ్యాప్ క్లాసులు వినండి మరియు మొదట కాన్సెప్ట్స్ తెలుగులో బాగా అర్థం చేసుకోండి.";
  }
  
  state.interview.scores.push(avgScore);
  updateDashboardWidgets();
}

function restartMockInterview() {
  document.getElementById("interview-setup-panel").style.display = "block";
  document.getElementById("interview-chat-arena").style.display = "none";
  document.getElementById("interview-report-panel").style.display = "none";
  switchTab('dashboard');
}

// SKILL GAP ANALYZER QUIZ LOGIC
function startSkillGapQuiz() {
  state.quiz.active = true;
  state.quiz.questions = appData.quizzes;
  state.quiz.currentIdx = 0;
  state.quiz.userAnswers = [];
  state.quiz.completed = false;
  
  document.getElementById("quiz-intro-panel").style.display = "none";
  document.getElementById("quiz-active-panel").style.display = "block";
  document.getElementById("quiz-report-panel").style.display = "none";
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const idx = state.quiz.currentIdx;
  const q = state.quiz.questions[idx];
  
  document.getElementById("quiz-section-label").innerText = `Section: ${q.section.toUpperCase()}`;
  document.getElementById("quiz-question-number").innerText = `Question ${idx + 1} of ${state.quiz.questions.length}`;
  
  const progressPercent = ((idx) / state.quiz.questions.length) * 100;
  document.getElementById("quiz-progress-bar").style.width = `${progressPercent}%`;
  
  const questionText = state.lang === 'en' ? q.question : q.questionTe;
  document.getElementById("quiz-question-text-el").innerText = questionText;
  
  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";
  
  q.options.forEach((opt, oIdx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.setAttribute("onclick", `selectQuizOption(${oIdx})`);
    
    const letter = String.fromCharCode(65 + oIdx);
    optDiv.innerHTML = `
      <div class="quiz-option-letter">${letter}</div>
      <div>${opt}</div>
    `;
    container.appendChild(optDiv);
  });
  
  document.getElementById("quiz-explanation-el").style.display = "none";
  document.getElementById("quiz-next-btn").style.display = "none";
}

function selectQuizOption(optIdx) {
  if (state.quiz.userAnswers.length > state.quiz.currentIdx) return;
  state.quiz.userAnswers.push(optIdx);
  
  const q = state.quiz.questions[state.quiz.currentIdx];
  const options = document.querySelectorAll(".quiz-option");
  const isCorrect = optIdx === q.answerIndex;
  
  options.forEach((opt, oIdx) => {
    if (oIdx === q.answerIndex) {
      opt.classList.add("correct");
    } else if (oIdx === optIdx) {
      opt.classList.add("incorrect");
    }
  });
  
  const expEl = document.getElementById("quiz-explanation-el");
  expEl.style.display = "block";
  expEl.innerHTML = `
    <strong>${isCorrect ? '✅ Correct / సరైనది!' : '❌ Incorrect / తప్పు!'}</strong><br>
    ${state.lang === 'en' ? q.explanation : q.explanationTe}
  `;
  
  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.style.display = "block";
  
  if (state.quiz.currentIdx === state.quiz.questions.length - 1) {
    nextBtn.innerText = state.lang === 'en' ? "Get Diagnostic Report" : "నైపుణ్యాల విశ్లేషణ రిపోర్ట్ చూడండి";
  } else {
    nextBtn.innerText = state.lang === 'en' ? "Next Question" : "తదుపరి ప్రశ్న";
  }
}

function nextQuizQuestion() {
  if (state.quiz.currentIdx < state.quiz.questions.length - 1) {
    state.quiz.currentIdx++;
    renderQuizQuestion();
  } else {
    showQuizReport();
  }
}

function showQuizReport() {
  state.quiz.active = false;
  state.quiz.completed = true;
  
  document.getElementById("quiz-active-panel").style.display = "none";
  document.getElementById("quiz-report-panel").style.display = "block";
  
  let correctCount = 0;
  state.quiz.questions.forEach((q, idx) => {
    if (state.quiz.userAnswers[idx] === q.answerIndex) {
      correctCount++;
    }
  });
  
  const scorePercent = (correctCount / state.quiz.questions.length) * 100;
  document.getElementById("quiz-score-val").innerText = scorePercent;
  
  const strengthsList = document.getElementById("quiz-strengths-list");
  const gapsList = document.getElementById("quiz-gaps-list");
  const actionsList = document.getElementById("quiz-actions-list");
  const summaryEl = document.getElementById("quiz-overall-summary");
  
  strengthsList.innerHTML = "";
  gapsList.innerHTML = "";
  actionsList.innerHTML = "";
  
  summaryEl.innerText = state.lang === 'en' ? 
    `You answered ${correctCount} out of 5 questions correctly.` : `మీరు 5 ప్రశ్నలలో ${correctCount} సరైన సమాధానాలు ఇచ్చారు.`;
  
  const codingCorrect = state.quiz.userAnswers[0] === state.quiz.questions[0].answerIndex && 
                          state.quiz.userAnswers[1] === state.quiz.questions[1].answerIndex;
  const aptCorrect = state.quiz.userAnswers[2] === state.quiz.questions[2].answerIndex && 
                       state.quiz.userAnswers[3] === state.quiz.questions[3].answerIndex;
  const commCorrect = state.quiz.userAnswers[4] === state.quiz.questions[4].answerIndex;
  
  if (codingCorrect) {
    strengthsList.innerHTML += `<li>${state.lang === 'en' ? 'Programming Basics & Python list types' : 'పైథాన్ బేసిక్స్ మరియు ప్రాథమిక కోడింగ్ పద్ధతులు'}</li>`;
  } else {
    gapsList.innerHTML += `<li>${state.lang === 'en' ? 'Stack/Queue structures & Python list variables' : 'డేటా స్ట్రక్చర్స్ మరియు పైథాన్ జాబితాలు (List syntax)'}</li>`;
    actionsList.innerHTML += `<li>${state.lang === 'en' ? 'Revise stack and queue operations on GeeksforGeeks.' : 'స్టాక్ మరియు క్యూ బేసిక్ క్లాసులు తెలుగులో వినండి.'}</li>`;
  }
  
  if (aptCorrect) {
    strengthsList.innerHTML += `<li>${state.lang === 'en' ? 'Quantitative Aptitude (Averages, Time & Work)' : 'ఆప్టిట్యూడ్ పనుల వేగం మరియు సగటులు'}</li>`;
  } else {
    gapsList.innerHTML += `<li>${state.lang === 'en' ? 'Quantitative speed calculations' : 'వేగం, దూరం, మరియు సగటు లెక్కల సాధన'}</li>`;
    actionsList.innerHTML += `<li>${state.lang === 'en' ? 'Practice 10 average-calculation questions on Indiabix.' : 'రోజువారీ 10 ఆప్టిట్యూడ్ లెక్కలను సాధన చేయండి.'}</li>`;
  }
  
  if (commCorrect) {
    strengthsList.innerHTML += `<li>${state.lang === 'en' ? 'Email etiquette & Professional communication' : 'మర్యాదపూర్వక కమ్యూనికేషన్ & ఈమెయిల్ పద్ధతులు'}</li>`;
  } else {
    gapsList.innerHTML += `<li>${state.lang === 'en' ? 'Formal workplace sentence structuring' : 'ప్రొఫెషనల్ ఈమెయిల్ మరియు ఇంగ్లీష్ వాక్యాల నిర్మాణం'}</li>`;
    actionsList.innerHTML += `<li>${state.lang === 'en' ? 'Write a mock self-introduction email and check its spelling.' : 'ఒక మర్యాదపూర్వక పరిచయ ఈమెయిల్ డ్రాఫ్ట్ చేసి తనిఖీ చేయండి.'}</li>`;
  }
  
  if (strengthsList.innerHTML === "") {
    strengthsList.innerHTML = `<li>${state.lang === 'en' ? 'No major strengths identified. Restart basic preparation.' : 'స్పష్టమైన బలాలు లేవు. మళ్ళీ సాధన చేయండి.'}</li>`;
  }
  if (gapsList.innerHTML === "") {
    gapsList.innerHTML = `<li>${state.lang === 'en' ? 'Perfect! No significant placement gaps detected.' : 'చాలా బాగుంది! లోపాలు ఏవీ లేవు.'}</li>`;
    actionsList.innerHTML = `<li>${state.lang === 'en' ? 'Keep practice levels active and prepare core mock interviews.' : 'ఇలాగే నిలకడగా మాక్ ఇంటర్వ్యూలు చేస్తూ ఉండండి.'}</li>`;
  }
  
  updateDashboardWidgets();
}

function restartSkillGapQuiz() {
  document.getElementById("quiz-intro-panel").style.display = "block";
  document.getElementById("quiz-active-panel").style.display = "none";
  document.getElementById("quiz-report-panel").style.display = "none";
  state.quiz.active = false;
}

// PROJECTS LOGIC
let currentProjectFilter = 'all';

function renderProjectsList(domain) {
  currentProjectFilter = domain;
  const container = document.getElementById("projects-grid-container");
  if (!container) return;
  
  container.innerHTML = "";
  const filterBtns = document.querySelectorAll(".projects-filter-bar .filter-btn");
  filterBtns.forEach(btn => btn.classList.remove("active"));
  
  const activeBtn = Array.from(filterBtns).find(btn => btn.innerText.toLowerCase().includes(domain === 'all' ? 'all' : domain === 'webDev' ? 'web' : 'ml'));
  if (activeBtn) activeBtn.classList.add("active");
  
  const filtered = domain === 'all' ? appData.projects : appData.projects.filter(p => p.domain === domain);
  
  filtered.forEach(proj => {
    const card = document.createElement("div");
    card.className = "card-glass project-card";
    
    const title = state.lang === 'en' ? proj.title : proj.titleTe;
    const summary = state.lang === 'en' ? proj.summary : proj.summaryTe;
    
    card.innerHTML = `
      <div class="project-title-row">
        <h3 style="font-size: 1.15rem; font-weight: 700;">${title}</h3>
        <span class="project-difficulty-tag ${proj.difficulty}">${proj.difficulty}</span>
      </div>
      <div class="project-stack">Tech Stack: ${proj.stack}</div>
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height:1.5; margin-bottom:1.25rem;">
        ${summary}
      </p>
      <div class="project-details">
        <button class="btn-primary" style="font-size:0.8rem; padding:0.5rem 1rem; width:100%; text-align:center; justify-content:center;" onclick="openProjectModal(${proj.id})">
          📄 View Step-by-Step Guide
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProjects(domain) {
  renderProjectsList(domain);
}

function openProjectModal(id) {
  const proj = appData.projects.find(p => p.id === id);
  if (!proj) return;
  
  document.getElementById("modal-project-title").innerText = state.lang === 'en' ? proj.title : proj.titleTe;
  document.getElementById("modal-project-stack").innerText = `Tech Stack: ${proj.stack}`;
  
  const diffTag = document.getElementById("modal-project-difficulty");
  diffTag.innerText = proj.difficulty;
  diffTag.className = `project-difficulty-tag ${proj.difficulty}`;
  
  document.getElementById("modal-project-summary").innerText = state.lang === 'en' ? proj.summary : proj.summaryTe;
  document.getElementById("modal-project-why").innerText = state.lang === 'en' ? proj.whyPlacement : proj.whyPlacementTe;
  
  const stepsListEl = document.getElementById("modal-project-guide-steps");
  stepsListEl.innerHTML = "";
  const steps = state.lang === 'en' ? proj.guide : proj.guideTe;
  
  steps.forEach(step => {
    const li = document.createElement("li");
    li.innerText = step;
    stepsListEl.appendChild(li);
  });
  
  document.getElementById("modal-project-code").innerText = proj.codeSnippet;
  toggleModal(true);
}

function toggleModal(isOpen) {
  const modal = document.getElementById("project-modal");
  if (isOpen) {
    modal.classList.add("open");
  } else {
    modal.classList.remove("open");
  }
}

function closeProjectModal(e) {
  toggleModal(false);
}

// Expose handlers globally so inline onclick works on static hosts (e.g. Vercel).
Object.assign(window, {
  toggleTheme,
  toggleLanguage,
  switchTab,
  toggleHabit,
  toggleHeatmapCell,
  generateUserRoadmap,
  toggleRoadmapTask,
  updateResumePreview,
  evaluateResumeATS,
  switchAptitudeCategory,
  selectAptitudeOption,
  showAptitudeSolution,
  nextAptitudeQuestion,
  applyToJob,
  startInterviewSession,
  endInterviewSession,
  submitCandidateAnswer,
  restartMockInterview,
  startSkillGapQuiz,
  selectQuizOption,
  nextQuizQuestion,
  restartSkillGapQuiz,
  filterProjects,
  openProjectModal,
  toggleModal,
  closeProjectModal
});
