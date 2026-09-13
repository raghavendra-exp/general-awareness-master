# GENERAL AWARENESS MASTER - DATA UPDATE & MAINTENANCE GUIDE

This guide explains how faculty, researchers, and students can update and extend **General Awareness Master** month-by-month without writing or modifying React code.

---

## 1. Directory Structure of the Data Layer

All factual data is located in `public/data/`:

```
public/data/
├── current-affairs/
│   ├── latest-24h.json           # Live daily high-yield digest
│   ├── 2026-09.json              # September 2026 monthly capsule
│   ├── 2026-08.json              # August 2026 monthly capsule
│   └── 2026-summary.json         # Master catalog of months & high-yield themes
├── static-gk/
│   ├── countries-capitals-currencies.json  # 50+ Global nations, capitals, currencies
│   ├── indian-states.json                  # All 28 States & 8 UTs with CMs, Govs, dances, parks
│   ├── national-parks-wildlife.json        # 50+ National Parks, Ramsar sites, species
│   └── international-organisations.json    # 32+ Multilateral bodies, HQs, heads, reports
├── polity/
│   └── indian-polity.json        # Constitution, articles, 12 schedules, bodies
├── history/
│   └── indian-history.json       # Ancient, medieval, modern timelines & INC sessions
├── geography/
│   └── indian-geography.json     # Rivers, dams, peaks, passes
├── economy/
│   └── macro-economy.json        # CPI/WPI, IIP core industries, deficits, BoP
├── schemes/
│   └── government-schemes.json   # 20+ central schemes, outlays, ministries
├── reports/
│   └── reports-and-indexes.json  # 22+ global indexes, India ranks, publishers
├── appointments/
│   └── appointments-and-awards.json # Constitutional heads, Nobel, Bharat Ratna, Sports
├── pyq/
│   └── pyq-analysis.json         # 2020-2026 shift analytics & 5-tier priority matrix
├── questions/
│   └── questions-master.json     # Bilingual questions repository with provenance tags
├── mock-tests/
│   └── mock-presets.json         # SBI/IBPS/RRB mock test configuration presets
├── study-plans/
│   └── study-plans.json          # 30-day and 60-day structured roadmaps
└── memory-lab/
    └── memory-tricks.json        # Mnemonics and mental models (AMTM, RESC-CGC-F, etc.)
```

---

## 2. Adding a New Current Affairs Month (e.g. October 2026)

### Step 1: Create `public/data/current-affairs/2026-10.json`
Follow the standard record schema:
```json
{
  "month": "October 2026",
  "slug": "2026-10",
  "total_records": 10,
  "records": [
    {
      "id": "CA-2026-10-001",
      "date": "2026-10-02",
      "category": "ECONOMY & BANKING",
      "headline": "Example Headline...",
      "summary": "Full detailed summary explaining the event...",
      "exam_fact": "High-yield fact tested directly in exam...",
      "why_important": "Context and significance...",
      "related_static_topic": "Link to static concept (e.g. RBI Act 1934 Section 45ZB)",
      "related_banking_topic": "Link to banking rule...",
      "source": "PIB / RBI / Ministry",
      "source_url": "https://...",
      "last_verified": "2026-10-02",
      "mcqs": [
        {
          "question": "What is the key takeaway?",
          "options": ["Opt 1", "Opt 2", "Opt 3", "Opt 4", "Opt 5"],
          "answer": 1,
          "explanation": "Official explanation..."
        }
      ]
    }
  ]
}
```

### Step 2: Register the Month in `2026-summary.json`
Add `"2026-10"` into the `"available_months"` array in `public/data/current-affairs/2026-summary.json`:
```json
{
  "available_months": ["2026-10", "2026-09", "2026-08"]
}
```

---

## 3. Adding New Practice Questions

Open `public/data/questions/questions-master.json` and append to the `"questions"` array:
```json
{
  "id": "GA-Q-051",
  "provenance": "ACTUAL PYQ",
  "exam": "SBI Clerk Mains",
  "year": 2025,
  "category": "ECONOMY & BANKING",
  "topic": "Fiscal Deficit",
  "question": "Which of the following equals Primary Deficit in the Union Budget?",
  "question_hi": "केंद्रीय बजट में निम्नलिखित में से कौन सा प्राथमिक घाटे के बराबर है?",
  "options": [
    "Fiscal Deficit - Interest Payments",
    "Revenue Deficit - Capital Expenditure",
    "Fiscal Deficit + External Borrowing",
    "Total Expenditure - Total Receipts",
    "Revenue Receipts - Revenue Expenditure"
  ],
  "options_hi": [
    "राजकोषीय घाटा - ब्याज भुगतान",
    "राजस्व घाटा - पूंजीगत व्यय",
    "राजकोषीय घाटा + बाह्य ऋण",
    "कुल व्यय - कुल प्राप्तियां",
    "राजस्व प्राप्तियां - राजस्व व्यय"
  ],
  "answer": 0,
  "explanation": "Primary Deficit = Fiscal Deficit - Interest Payments. It represents the borrowing requirements of the government excluding past interest obligations.",
  "explanation_hi": "प्राथमिक घाटा = राजकोषीय घाटा - ब्याज भुगतान। यह सरकार की पिछली ब्याज देनदारियों को छोड़कर वर्तमान ऋण आवश्यकताओं को दर्शाता है।",
  "exam_shortcut": "Primary = Fiscal Deficit MINUS Interest.",
  "difficulty": "Easy"
}
```

---

## 4. Deploying Updates to GitHub Pages

Run in your terminal:
```bash
npm run build
git add .
git commit -m "Update GA content for [Month/Topic]"
git push origin main
```
The included GitHub Actions workflow `.github/workflows/deploy.yml` will automatically bundle and publish the site to GitHub Pages within 60 seconds!
