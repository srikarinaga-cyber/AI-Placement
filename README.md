# AI Placement Mentor

An interactive single-page web app that mentors **Tier-2 and Tier-3 college students in India** through engineering and degree placements. It combines personalized roadmaps, resume building, mock interviews, aptitude practice, skill-gap diagnostics, project guides, job alerts, and a daily habit tracker—with **English and Telugu (Telglish)** support throughout.

---

## The Problem

Many graduates from Tier-2 and Tier-3 colleges lack access to structured placement prep: mentors, roadmaps, resume feedback, and interview practice. Regional-language students often struggle when everything is taught only in English. This app bridges that gap as a free, self-guided mentor.

---

## Features

| Module | What it does |
|--------|----------------|
| **Dashboard** | Overview of streak, readiness score, daily targets, and focus tasks |
| **Roadmap Generator** | Weekly milestones by branch, skill level, company type, and timeframe |
| **Resume Builder** | Live ATS-style preview, keyword/impact scan, and print-to-PDF export |
| **AI Mock Interview** | Technical, HR, or AI/ML rounds with bilingual questions and scored feedback |
| **Aptitude Arena** | Flashcards for Quant and Logical Reasoning with Telugu explanations |
| **Skill Gap Quiz** | Diagnostic across coding, aptitude, and communication with action plans |
| **Project Guide** | Step-by-step placement-ready project blueprints with code snippets |
| **Job Alerts** | Off-campus fresher drives with apply and status tracking |
| **Streak Tracker** | Daily habit checklist and a 30-day GitHub-style heatmap |

### Roadmap inputs

- **Branches:** B.Sc AI/ML, CSE/IT, ECE, Mech/Civil  
- **Levels:** Beginner, Intermediate, Advanced  
- **Goals:** Service companies, product startups, FAANG / high-growth  
- **Duration:** 3, 6, or 12 months  

### Localization

Use the **తెలుగు / English** toggle in the top bar. UI labels, roadmaps, interview content, and aptitude tricks switch dynamically via `languages.js`, using a **Telglish** style—technical terms stay in English while concepts are explained in Telugu.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Logic | Vanilla JavaScript |
| Styles | CSS3 (custom properties, responsive layout, glassmorphism, print styles) |
| Data | Static content in `data.js` |
| i18n | Dictionary maps in `languages.js` |
| Dev server | [Vite](https://vitejs.dev/) (optional) |

No backend or database is required. State lives in the browser for the current session.

---

## Project Structure

```
ai/
├── index.html      # App shell, sidebar nav, and all section markup
├── app.js          # UI logic, state, and feature handlers
├── data.js         # Roadmaps, interview questions, aptitude, jobs, projects
├── languages.js    # English ↔ Telugu translation strings
├── style.css       # Themes, layout, components, and print styles
├── package.json    # Optional Vite dev tooling
└── README.md
```

---

## Getting Started

### Prerequisites

- A modern browser (Chrome, Edge, Firefox, or Safari)
- **Optional:** [Node.js](https://nodejs.org/) 18+ for Vite, or Python 3 for a simple static server

### Option 1: Open directly

Double-click `index.html` or open it in your browser.

> Some browsers restrict local file access. If features behave oddly, use a local server (Options 2 or 3).

### Option 2: Python static server

```bash
cd path/to/ai
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

### Option 3: Vite dev server (recommended for development)

```bash
cd path/to/ai
npm install
npm run dev
```

Follow the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)).

**Other npm scripts:**

```bash
npm run build    # Production build to dist/
npm run preview  # Preview the production build
```

---

## Usage Tips

1. **Resume PDF** — Fill in the resume form, run the ATS scan, then use the browser print dialog (Ctrl/Cmd + P) and choose “Save as PDF.” Print styles hide the sidebar and controls automatically.
2. **Mock interview** — Pick a round type, answer each question, then review scores and Telglish coaching in the final report.
3. **Consistency** — Check off daily habits on the Streak Tracker to grow your placement readiness score and fill the heatmap.

---

## Target Audience

- B.Sc, B.Tech, and degree students from Tier-2 and Tier-3 institutions in India  
- Freshers preparing for service-based, product, or AI/ML roles  
- Telugu-speaking learners who want bilingual placement guidance  

---

## License

This project is provided as-is for educational and placement-prep use.

---

*Built for Tier-2 & Tier-3 students in India. Supporting local languages.*
