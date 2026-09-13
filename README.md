# GENERAL AWARENESS MASTER

> **"Master General Awareness for SBI Clerk • IBPS Clerk/CSA • RRB Office Assistant"**

A complete, professional, interactive web application engineered for serious banking exam aspirants. Built with **React 18**, **Vite 6**, and **Tailwind CSS**, operating 100% client-side with zero backend dependencies, offline-first persistence, and continuous deployment to GitHub Pages.

---

## 🎯 Target Exams & Exam Patterns

| Exam | Section | Questions | Marks | Time | Negative Marking | Primary Focus Areas |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **SBI Clerk Mains** | General / Financial Awareness | 50 | 50 | 35 Mins | -0.25 | Recent 4-6 Months CA, RBI Notifications, Forex, Monetary Policy |
| **IBPS Clerk / CSA Mains** | General / Financial Awareness | 50 | 50 | 35 Mins | -0.25 | Flagship Central Schemes, Banking Terms, International Org HQ |
| **IBPS RRB Office Assistant** | General Awareness | 40 | 40 | 20 Mins (rec.) | -0.25 | Pure Static GK (Parks, Rivers, Capitals), Agri & Rural Schemes, KCC |

---

## 🚀 Core Features & Modules

### 1. Dashboard Command Center
- **GA Readiness Score (0-100)**: Dynamic score computed from volume attempted, accuracy percentage, mock test scores, and mistakes management.
- **Daily Streak Tracker & Quick Stats**: Real-time tracking of active study days, attempted questions, and pending mistakes.
- **Target Exam Switcher**: Instant profile switching between SBI Clerk, IBPS Clerk, and RRB OA with customized study alerts.
- **Last 24h High-Yield Feed**: Real-time breaking current affairs with exam fact badges.

### 2. Current Affairs Repository
- **Last 24 Hours High-Yield Digest**: Daily digest with headline, detailed summary, exam fact, why it is important, related static topic link, and interactive concept-check MCQ.
- **Monthly Capsules Archive**: Categorized repository for September 2026, August 2026, and earlier months with category pills (Economy, Schemes, Science, Defense, Sports, Appointments, Awards, Reports).
- **Strict Provenance**: Official source attribution (`RBI`, `PIB`, `ISRO`, `NITI Aayog`, etc.) and last verification date.

### 3. Static GK Hub
- **Countries, Capitals & Currencies**: 50+ nations with continent filters, ISO codes, and recent exam relevance notes.
- **Indian States & Union Territories**: All 28 States and 8 UTs with Capitals, Chief Ministers, Governors, High Courts, State Animals/Birds, Folk Dances, Festivals, National Parks, and Ramsar sites.
- **National Parks, Tiger Reserves & Wetlands**: 50+ protected reserves mapped by state and flagship animal species.
- **International Organisations**: 32+ multilateral financial and regulatory institutions (IMF, World Bank, BIS, ADB, AIIB, NDB, WTO, WEF, UNEP, ASEAN, SCO, SAARC) with HQ, Chiefs, founding years, and flagship reports.

### 4. Specialized Conceptual Modules
- **Indian Polity & Constitution**: Constituent Assembly timeline, Preamble rulings, borrowed features, High-yield Articles (Art 12 to 368), 12 Schedules table, and Constitutional vs Statutory bodies.
- **Indian History Chronology**: Ancient India (Indus Valley sites & findings, Buddhist & Jain councils, Mauryas, Guptas), Medieval India (Delhi Sultanate 5 dynasties, Mughals), and Modern India (1857 Revolt centers & leaders, Landmark INC sessions, Gandhian movements).
- **Indian Geography Explorer**: Himalayan & Peninsular river systems, Panch Prayag confluences, major multipurpose dams (Tehri, Hirakud, Bhakra, Sardar Sarovar), mountain peaks (Kanchenjunga, Anamudi), and strategic passes.
- **Indian Macro-Economy**: Inflation metrics (CPI vs WPI vs IIP 8 Core Industries), Fiscal Deficits math (Fiscal, Revenue, Primary Deficit), and Balance of Payments (BoP Current & Capital accounts).
- **Central Government Flagship Schemes**: 20+ schemes (PMJDY, PMJJBY, PMSBY, APY, MUDRA, Stand-Up India, PM-KISAN, PMFBY, KCC, PM Surya Ghar, PM Vishwakarma, PM SVANidhi, Ayushman Bharat, JJM) with outlays, eligibility, and exam shortcuts.
- **Reports & Indexes**: 22+ global indexes (HDI, Global Gender Gap, Hunger Index, Happiness Report, Press Freedom, Logistics Performance, MPI) with publishing bodies, India ranks, and top rankers.

### 5. Interactive Practice & Speed Arena
- **Bilingual Practice Arena**: English and हिन्दी toggle on every question with instant explanation, exam shortcut cues, and mistake tagging.
- **Rapid Fire Speed Drill**: 10s, 15s, or 20s per-question timer with combo multipliers (2x, 3x) and visual feedback.
- **1000+ High-Yield One-Liners**: Rapid glance facts with Web Speech API audio read-aloud functionality.
- **Leitner Spaced Repetition Flashcards**: 5-Box active recall system. Cards move up on correct recall and reset to Box 1 on failure.
- **GA Memory Lab**: Visual mnemonics (AMTM, RESC-CGC-F, SO-SO-SE-DE-RE, 2-1.5-5, MUDRA slabs) to prevent exam confusion.
- **Question Selection Strategy Trainer**: Interactive scenario trainer teaching when to ATTEMPT vs SKIP based on probability and expected value to prevent negative marks (-0.25).

### 6. Full Exam Simulator (Timed Mock Tests)
- Presets for **SBI Clerk Mains** (50 Qs / 35 Mins), **IBPS Clerk Mains** (50 Qs / 35 Mins), and **RRB Office Assistant** (40 Qs / 20 Mins).
- Live exam interface with Question Palette (Answered, Not Answered, Marked for Review, Not Visited), section countdown timer, and automatic submission.
- Comprehensive Scorecard with net score (-0.25 negative), accuracy %, time spent analysis, full answer key, and automatic mistake logging.

### 7. Tools & Analytics
- **Personal Mistakes Notebook**: Review all incorrectly answered questions tagged with self-reflection notes (`Factual Confusion`, `Guessed Wrong`, `Read Question Hurriedly`, `Outdated Info`) and one-click re-test mode.
- **Bookmarks Manager**: Instant access to all saved questions and articles.
- **Structured Study Plans**: 30-Day Express Crash Course and 60-Day Comprehensive Roadmap with interactive checkboxes.
- **Offline JSON Backup & Sync**: Export complete progress to JSON and restore anytime across devices.
- **Global Search (`Ctrl+K`)**: Instant search across all current affairs, schemes, static GK, and questions.

---

## 🛠️ Technology Stack & Architecture

- **Framework**: React 18 with Vite 6
- **Styling**: Tailwind CSS 3 with custom banking and GA palette (`ga-*`, `bank-*`), dark mode support
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & Tailwind transition keyframes
- **Storage**: 100% Client-side `localStorage` with offline JSON export/import
- **Hosting**: GitHub Pages compatible (`base: './'`)

---

## 📦 Local Development

```bash
# Clone repository
git clone https://github.com/raghavendra-exp/general-awareness-master.git
cd general-awareness-master

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

---

## 🚢 Deployment to GitHub Pages

1. Push code to your GitHub repository:
```bash
git init
git add .
git commit -m "feat: complete General Awareness Master platform"
git branch -M main
git remote add origin https://github.com/raghavendra-exp/general-awareness-master.git
git push -u origin main
```
2. In GitHub repository settings:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **GitHub Actions**
3. The included workflow `.github/workflows/deploy.yml` will automatically build and publish the site!

---

## 📄 License
MIT License. Created for competitive examination aspirants preparing for SBI, IBPS, and RRB banking exams.
