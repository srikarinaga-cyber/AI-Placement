# AI Placement Mentor

An interactive **Next.js** web app that mentors **Tier-2 and Tier-3 college students in India** through engineering and degree placements — with personalized roadmaps, resume building, mock interviews, aptitude practice, skill-gap diagnostics, project guides, job alerts, and a daily habit tracker. Supports **English and Telugu (Telglish)**.

**Live:** [https://ai-placement-red.vercel.app/](https://ai-placement-red.vercel.app/)

---

## Features

| Module | Description |
|--------|-------------|
| Dashboard | Streak, readiness score, daily targets, focus tasks |
| Roadmap Generator | Weekly milestones by branch, level, company type, duration |
| Resume Builder | ATS preview, AI keyword scan, print-to-PDF |
| AI Mock Interview | Technical, HR, AI/ML rounds with bilingual feedback |
| Aptitude Arena | Quant & logical reasoning with Telugu explanations |
| Skill Gap Quiz | Coding, aptitude, communication diagnostic |
| Project Guide | Placement-ready project blueprints |
| Job Alerts | Off-campus fresher drives |
| Streak Tracker | Habit checklist + 30-day heatmap |

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI:** React 18 + TypeScript
- **Styling:** CSS custom properties (globals.css)
- **Data:** Static modules in `lib/`
- **Deploy:** Vercel (native Next.js support)

---

## Project Structure

```
ai/
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # All styles
├── components/
│   └── PlacementMentorApp.tsx
├── hooks/
│   └── usePlacementMentor.ts
├── lib/
│   ├── data.ts          # Roadmaps, quizzes, jobs, projects
│   ├── languages.ts     # English ↔ Telugu strings
│   └── constants.ts     # Nav items, quotes, helpers
├── package.json
└── next.config.mjs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/srikarinaga-cyber/AI-Placement.git
cd AI-Placement
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Framework preset: **Next.js** (auto-detected)
4. Deploy — no extra config needed

---

## Localization

Use the **తెలుగు / English** toggle in the top bar. UI labels, roadmaps, interviews, and aptitude content switch via `lib/languages.ts`.

---

*Built for Tier-2 & Tier-3 students in India. Supporting local languages.*
