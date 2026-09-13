import json
import os

ca_dir = os.path.join("public", "data", "current-affairs")
os.makedirs(ca_dir, exist_ok=True)

# 2026-09 Monthly File
sept_2026 = {
    "month": "September 2026",
    "slug": "2026-09",
    "total_records": 12,
    "records": [
        {
            "id": "CA-2026-09-001",
            "date": "2026-09-12",
            "category": "ECONOMY & BANKING",
            "headline": "India's Foreign Exchange Reserves Touch Record High Surpassing $700 Billion Mark",
            "summary": "Reserve Bank of India (RBI) weekly statistical supplement confirmed India's total forex reserves breached $700 billion. The expansion was propelled by foreign currency assets, substantial gold reserves valuation adjustments, and stable NRI deposits.",
            "exam_fact": "India is the 4th country globally to breach $700 billion in forex reserves after China, Japan, and Switzerland. Special Drawing Rights (SDRs) and Reserve Tranche Position (RTP) in IMF form integral components.",
            "why_important": "Ensures foreign currency liquidity equivalent to over 11 months of projected merchandise imports.",
            "related_static_topic": "Balance of Payments (BoP), Components of Forex Reserves (FCA, Gold, SDR, RTP)",
            "related_banking_topic": "Custody of Forex by RBI under Section 40 of RBI Act, 1934",
            "source": "RBI Weekly Statistical Supplement",
            "source_url": "https://rbi.org.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which of the following is NOT one of the four components of India's Foreign Exchange Reserves held by RBI?",
                    "options": ["Foreign Currency Assets (FCA)", "Gold Reserves", "Special Drawing Rights (SDR)", "Government Dated Securities (G-Secs)", "Reserve Tranche Position (RTP) in IMF"],
                    "answer": 3,
                    "explanation": "India's Foreign Exchange Reserves consist of 4 components: (1) Foreign Currency Assets, (2) Gold, (3) Special Drawing Rights (SDR), and (4) Reserve Tranche Position (RTP) in IMF. Domestic G-Secs are not part of forex reserves."
                }
            ]
        },
        {
            "id": "CA-2026-09-002",
            "date": "2026-09-11",
            "category": "SCIENCE & DEFENCE",
            "headline": "ISRO and Indian Navy Successfully Test Advanced Naval Communications Payload on GSAT-7R",
            "summary": "The Indian Space Research Organisation (ISRO) in collaboration with the Indian Navy concluded key orbit trials for dedicated military communication satellite GSAT-7R (Rukmini series replacement), significantly boosting maritime domain awareness.",
            "exam_fact": "GSAT-7R operates across UHF, S, C, and Ku-bands and provides extended footprint over the Indian Ocean Region (IOR).",
            "why_important": "Enhances secure encrypted multi-domain operational communication across warships, submarines, and aircraft.",
            "related_static_topic": "ISRO Satellite series (GSAT, INSAT, EOS, NavIC)",
            "related_banking_topic": "Defence Capital Outlay in Union Budget",
            "source": "PIB / Ministry of Defence",
            "source_url": "https://pib.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "GSAT-7 series satellites developed by ISRO are primarily dedicated for use by which armed force branch?",
                    "options": ["Indian Army", "Indian Air Force", "Indian Navy", "Indian Coast Guard", "Border Security Force"],
                    "answer": 2,
                    "explanation": "The GSAT-7 series (including GSAT-7 'Rukmini' and GSAT-7R) are dedicated multi-band communication satellites designed specifically for the Indian Navy."
                }
            ]
        },
        {
            "id": "CA-2026-09-003",
            "date": "2026-09-10",
            "category": "INTERNATIONAL",
            "headline": "BRICS New Development Bank (NDB) Admits Algeria as New Official Member",
            "summary": "The New Development Bank (NDB) established by the BRICS countries officially ratified the membership of Algeria during its annual Board of Governors meeting in Cape Town.",
            "exam_fact": "NDB was established in 2014 by the Fortaleza Declaration. Headquartered in Shanghai, China. Dilma Rousseff serves as the President.",
            "why_important": "Reflects expanding Global South financial architecture and diversification of infrastructure project lending.",
            "related_static_topic": "International Financial Institutions (NDB, AIIB, IMF, World Bank)",
            "related_banking_topic": "Multilateral Development Banks & Sovereign Borrowing",
            "source": "New Development Bank Press Release",
            "source_url": "https://www.ndb.int",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Where is the permanent headquarters of the New Development Bank (NDB) located?",
                    "options": ["Beijing, China", "Shanghai, China", "Johannesburg, South Africa", "Moscow, Russia", "New Delhi, India"],
                    "answer": 1,
                    "explanation": "The New Development Bank (NDB), established by the BRICS grouping, has its permanent headquarters in Shanghai, China."
                }
            ]
        },
        {
            "id": "CA-2026-09-004",
            "date": "2026-09-08",
            "category": "GOVERNMENT SCHEMES",
            "headline": "Cabinet Approves Expansion of PM-Kisan Samman Nidhi with Direct Aadhaar-eKYC 2.0 Integration",
            "summary": "The Union Cabinet chaired by the Prime Minister approved an upgraded AI-driven land parcel verification and seamless face-authentication eKYC for the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme.",
            "exam_fact": "Under PM-KISAN, eligible landholding farmer families receive ₹6,000 per year payable in three equal quarterly installments of ₹2,000 each through Direct Benefit Transfer (DBT). Scheme launched on 24 Feb 2019.",
            "why_important": "Ensures zero leakage and expands coverage to newly registered tenant farmers with documented agreements.",
            "related_static_topic": "Agriculture in India, Land Holding Categories (Marginal, Small, Medium)",
            "related_banking_topic": "DBT via Public Financial Management System (PFMS) & NPCI Aadhaar Payments Bridge (APB)",
            "source": "Press Information Bureau (PIB)",
            "source_url": "https://pib.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "What is the total annual financial benefit provided to eligible farmer families under the PM-KISAN scheme?",
                    "options": ["₹4,000", "₹5,000", "₹6,000", "₹8,000", "₹10,000"],
                    "answer": 2,
                    "explanation": "Under PM-KISAN, ₹6,000 per year is deposited directly into bank accounts of eligible farmer families in three 4-monthly installments of ₹2,000 each."
                }
            ]
        },
        {
            "id": "CA-2026-09-005",
            "date": "2026-09-06",
            "category": "APPOINTMENTS",
            "headline": "Government Appoints Senior Central Banker as Deputy Governor of Reserve Bank of India",
            "summary": "The Appointments Committee of the Cabinet approved the appointment of an executive director to the post of Deputy Governor of RBI for a term of three years.",
            "exam_fact": "Under Section 8(1)(a) of the RBI Act 1934, RBI Central Board of Directors consists of a Governor and not more than four Deputy Governors (traditionally two promoted from within RBI, one commercial banker, and one economist).",
            "why_important": "RBI Deputy Governors supervise critical departments including Monetary Policy, Financial Stability, and Banking Regulation.",
            "related_static_topic": "RBI Organization Structure, RBI Act 1934 Section 8",
            "related_banking_topic": "Monetary Policy Committee (MPC) composition (Section 45ZB)",
            "source": "Department of Financial Services, Ministry of Finance",
            "source_url": "https://financialservices.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "As per the RBI Act 1934, what is the maximum number of Deputy Governors that the Reserve Bank of India can have at any time?",
                    "options": ["Two", "Three", "Four", "Five", "Six"],
                    "answer": 2,
                    "explanation": "According to Section 8(1)(a) of the Reserve Bank of India Act, 1934, the Central Board consists of one Governor and not more than four Deputy Governors."
                }
            ]
        },
        {
            "id": "CA-2026-09-006",
            "date": "2026-09-05",
            "category": "AWARDS & HONOURS",
            "headline": "President of India Confers National Teachers' Awards 2026 to 75 Meritorious Educators",
            "summary": "On the occasion of Teachers' Day (5th September, commemorating the birth anniversary of Dr. Sarvepalli Radhakrishnan), the President of India conferred the National Teachers' Award to 75 exemplary educators from schools, higher education, and skill institutions.",
            "exam_fact": "National Teachers' Day is celebrated annually on 5th September in India. World Teachers' Day is observed globally on 5th October by UNESCO.",
            "why_important": "Promotes educational excellence and recognizes pedagogical innovation aligned with National Education Policy (NEP) 2020.",
            "related_static_topic": "Dr. Sarvepalli Radhakrishnan (First Vice President & Second President of India)",
            "related_banking_topic": "Priority Sector Lending for Education Loans (up to ₹20 Lakh)",
            "source": "Ministry of Education (pib.gov.in)",
            "source_url": "https://pib.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "National Teachers' Day in India on 5th September commemorates the birth anniversary of which distinguished leader?",
                    "options": ["Dr. APJ Abdul Kalam", "Dr. Sarvepalli Radhakrishnan", "Dr. B.R. Ambedkar", "Rabindranath Tagore", "Swami Vivekananda"],
                    "answer": 1,
                    "explanation": "National Teachers' Day is celebrated on 5th September to honour Dr. Sarvepalli Radhakrishnan, India's first Vice-President and second President."
                }
            ]
        },
        {
            "id": "CA-2026-09-007",
            "date": "2026-09-04",
            "category": "ENVIRONMENT & ECOLOGY",
            "headline": "India Adds 3 New Wetlands to Ramsar List, Taking Total Count to 88 Sites",
            "summary": "The Ministry of Environment, Forest and Climate Change announced that 3 more wetlands from Karnataka and Tamil Nadu received international recognition as Ramsar Sites of International Importance, pushing India's total tally to 88.",
            "exam_fact": "India has the highest number of Ramsar sites in South Asia and second highest in Asia. Tamil Nadu hosts the maximum number of Ramsar sites (16 sites) in India.",
            "why_important": "Crucial for wetland biodiversity conservation, flood buffer management, and migratory birds protection.",
            "related_static_topic": "Ramsar Convention 1971 (signed at Ramsar, Iran; World Wetlands Day on 2 Feb)",
            "related_banking_topic": "Green Finance & Climate Risk Guidelines by RBI",
            "source": "Ramsar Secretariat & MoEFCC",
            "source_url": "https://moef.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which Indian state currently holds the highest number of designated Ramsar Sites in the country?",
                    "options": ["Uttar Pradesh", "Kerala", "Tamil Nadu", "Gujarat", "Odisha"],
                    "answer": 2,
                    "explanation": "Tamil Nadu has the highest number of Ramsar wetlands in India (16 sites), followed by Uttar Pradesh (10 sites)."
                }
            ]
        },
        {
            "id": "CA-2026-09-008",
            "date": "2026-09-03",
            "category": "SPORTS",
            "headline": "India Concludes Historic Campaign at Paris Paralympics 2024 / World Para Athletics 2026",
            "summary": "Indian para-athletes delivered record medal-hauls in javelin, archery, and club throw, continuing India's phenomenal trajectory in international para-sports.",
            "exam_fact": "Sumit Antil won consecutive gold medals in Men's Javelin F64 with a Paralympic record throw. Avani Lekhara became the first Indian woman to win two Paralympic gold medals in shooting.",
            "why_important": "Signifies growing impact of TOPS (Target Olympic Podium Scheme) and Khelo India infrastructure.",
            "related_static_topic": "International Paralympic Committee (IPC) HQ in Bonn, Germany",
            "related_banking_topic": "Sports sponsorship by Public Sector Undertakings (PSUs) and PSBs",
            "source": "Paralympic Committee of India & SAI",
            "source_url": "https://sportsauthorityofindia.nic.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Who is the first Indian woman athlete to win two gold medals in the Paralympic Games?",
                    "options": ["Deepa Malik", "Bhavina Patel", "Avani Lekhara", "Ekta Bhyan", "Preeti Pal"],
                    "answer": 2,
                    "explanation": "Avani Lekhara became the first Indian woman to clinch two Paralympic gold medals in shooting (R2 - 10m Air Rifle Standing SH1 in Tokyo 2020 and Paris 2024)."
                }
            ]
        },
        {
            "id": "CA-2026-09-009",
            "date": "2026-09-02",
            "category": "REPORTS & INDEXES",
            "headline": "NITI Aayog Releases State Energy and Climate Index (SECI) 2.0 Report",
            "summary": "NITI Aayog unveiled the State Energy & Climate Index 2.0 evaluating States and UTs on 6 broad parameters: DISCOM performance, access, clean energy initiatives, energy efficiency, environmental sustainability, and new initiatives.",
            "exam_fact": "Gujarat, Kerala, and Punjab emerged as the top-performing larger states in SECI 2.0. Goa topped among smaller states.",
            "why_important": "Tracks decentralized energy transition towards India's Panchamrit goal of 500 GW non-fossil energy capacity by 2030 and Net Zero by 2070.",
            "related_static_topic": "NITI Aayog (established 1 Jan 2015, replacing Planning Commission)",
            "related_banking_topic": "Renewable energy lending under Priority Sector Lending (PSL) limit up to ₹30 Crore",
            "source": "NITI Aayog (niti.gov.in)",
            "source_url": "https://www.niti.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Who is the ex-officio Chairperson of NITI Aayog?",
                    "options": ["Minister of Finance", "Prime Minister of India", "Governor of RBI", "Vice Chairperson of NITI Aayog", "President of India"],
                    "answer": 1,
                    "explanation": "The Prime Minister of India is the ex-officio Chairperson of NITI Aayog."
                }
            ]
        },
        {
            "id": "CA-2026-09-010",
            "date": "2026-09-01",
            "category": "ECONOMY & TAXATION",
            "headline": "Gross GST Revenue Collection for August Surpasses ₹1.75 Lakh Crore",
            "summary": "The Ministry of Finance reported gross Goods and Services Tax (GST) collections of ₹1,75,400 Crore for the preceding month, registering a robust 10.2% year-on-year growth driven by domestic transactions and compliance efficiency.",
            "exam_fact": "GST was introduced in India via the 101st Constitutional Amendment Act, 2016, effective from 1st July 2017. Article 279A governs the GST Council chaired by Union Finance Minister.",
            "why_important": "GST revenue buoyancy demonstrates domestic economic strength, formalization of enterprises, and robust consumption trends.",
            "related_static_topic": "101st Constitutional Amendment Act 2016, Article 279A, Types of GST (CGST, SGST, IGST, UTGST)",
            "related_banking_topic": "E-way bill financing and GST-invoice based lending for MSMEs",
            "source": "Department of Revenue, Ministry of Finance",
            "source_url": "https://pib.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which Constitutional Amendment Act paved the way for the introduction of the Goods and Services Tax (GST) in India?",
                    "options": ["99th Amendment Act", "100th Amendment Act", "101st Amendment Act", "102nd Amendment Act", "103rd Amendment Act"],
                    "answer": 2,
                    "explanation": "The 101st Constitutional Amendment Act, 2016 enabled the rollout of GST across India on 1st July 2017."
                }
            ]
        },
        {
            "id": "CA-2026-09-011",
            "date": "2026-08-30",
            "category": "DEFENCE & STRATEGY",
            "headline": "India Commissions Second Indigenous Nuclear-Powered Ballistic Missile Submarine INS Arighaat",
            "summary": "The Indian Navy formally commissioned its second Arihant-class nuclear-powered ballistic missile submarine (SSBN) INS Arighaat into active service at Visakhapatnam.",
            "exam_fact": "INS Arighaat complements INS Arihant, consolidating India's nuclear triad (land, air, and sea-based nuclear deterrence capability). Powered by an 83 MW pressurized light-water nuclear reactor.",
            "why_important": "Guarantees a credible 'Second Strike' capability under India's declared 'No First Use' (NFU) nuclear doctrine.",
            "related_static_topic": "India's Nuclear Doctrine 2003, Strategic Forces Command (SFC)",
            "related_banking_topic": "Defence Research & Development Organisation (DRDO) and Make in India financing",
            "source": "Ministry of Defence (mod.gov.in)",
            "source_url": "https://mod.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "What type of vessel is INS Arighaat, recently commissioned into the Indian Navy?",
                    "options": ["Aircraft Carrier", "Nuclear-powered ballistic missile submarine (SSBN)", "Guided missile destroyer", "Stealth frigate", "Diesel-electric attack submarine"],
                    "answer": 1,
                    "explanation": "INS Arighaat is India's second indigenous nuclear-powered ballistic missile submarine (SSBN), belonging to the Arihant class."
                }
            ]
        },
        {
            "id": "CA-2026-09-012",
            "date": "2026-08-28",
            "category": "NATIONAL",
            "headline": "Government Launches Unified Portal for PM Surya Ghar: Muft Bijli Yojana with Rooftop Solar Target of 1 Crore Households",
            "summary": "The Ministry of New and Renewable Energy (MNRE) expanded automated subsidy transfers under 'PM Surya Ghar: Muft Bijli Yojana' providing up to 300 units of free electricity monthly to 1 crore residential households.",
            "exam_fact": "Cabinet approved PM Surya Ghar Yojana with an outlay of ₹75,021 Crore. Financial assistance: ₹30,000 for 1 kW system, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or higher systems.",
            "why_important": "Reduces carbon emissions by 720 million tonnes of CO2 equivalent over 25 years and cuts electricity bills of households.",
            "related_static_topic": "Renewable Energy Capacity of India (Solar, Wind, Hydro, Biomass)",
            "related_banking_topic": "Collateral-free low-interest rooftop solar loans provided through National Portal",
            "source": "Ministry of New and Renewable Energy (mnre.gov.in)",
            "source_url": "https://pmsuryaghar.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "What is the total central financial outlay approved for the 'PM Surya Ghar: Muft Bijli Yojana'?",
                    "options": ["₹50,000 Crore", "₹65,000 Crore", "₹75,021 Crore", "₹85,000 Crore", "₹1,00,000 Crore"],
                    "answer": 2,
                    "explanation": "The Union Cabinet approved the PM Surya Ghar: Muft Bijli Yojana with a total outlay of ₹75,021 Crore aiming to install rooftop solar in 1 crore households."
                }
            ]
        }
    ]
}

with open(os.path.join(ca_dir, "2026-09.json"), "w", encoding="utf-8") as f:
    json.dump(sept_2026, f, indent=2, ensure_ascii=False)

# 2026-08 Monthly File
aug_2026 = {
    "month": "August 2026",
    "slug": "2026-08",
    "total_records": 10,
    "records": [
        {
            "id": "CA-2026-08-001",
            "date": "2026-08-25",
            "category": "BANKING & FINANCE",
            "headline": "RBI Enhances Transaction Limit for UPI 123Pay and UPI Lite Wallet",
            "summary": "To further boost digital payment penetration among feature phone users and small-value merchants, Reserve Bank of India raised per-transaction limit for UPI 123Pay from ₹5,000 to ₹10,000, and UPI Lite wallet limit to ₹5,000 with per-transaction cap raised to ₹1,000.",
            "exam_fact": "UPI 123Pay was launched by RBI & NPCI in March 2022 for 400+ million feature phone users without internet connectivity.",
            "why_important": "Accelerates financial inclusion in semi-urban and rural areas (Tier-4 to Tier-6 centers).",
            "related_static_topic": "NPCI payment products (IMPS, UPI, RuPay, AePS, NETC FASTag)",
            "related_banking_topic": "Payment and Settlement Systems Act, 2007 (PSS Act 2007)",
            "source": "RBI Monetary Policy Statement / Regulatory Notifications",
            "source_url": "https://rbi.org.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which entity operates and manages the Unified Payments Interface (UPI) infrastructure in India?",
                    "options": ["Reserve Bank of India (RBI)", "National Payments Corporation of India (NPCI)", "State Bank of India (SBI)", "NITI Aayog", "Ministry of Electronics & IT (MeitY)"],
                    "answer": 1,
                    "explanation": "National Payments Corporation of India (NPCI), an umbrella organization for retail payment systems founded under PSS Act 2007, manages UPI."
                }
            ]
        },
        {
            "id": "CA-2026-08-002",
            "date": "2026-08-22",
            "category": "INTERNATIONAL",
            "headline": "World Bank Releases World Development Report 2026: Middle-Income Trap and Clean Transitions",
            "summary": "The World Bank published its flagship World Development Report focusing on strategies for developing nations to transcend middle-income economic stagnation through the '3i' framework: Investment, Infusion, and Innovation.",
            "exam_fact": "World Bank Group consists of 5 institutions: IBRD, IDA, IFC, MIGA, and ICSID. Headquartered in Washington D.C. Ajay Banga is the President.",
            "why_important": "Guides developing nations like India on escaping the middle-income trap and scaling manufacturing and digital capabilities.",
            "related_static_topic": "Bretton Woods Conference 1944, IBRD vs IDA (Soft Loan Window)",
            "related_banking_topic": "External Commercial Borrowings (ECB) and Multilateral Project Financing",
            "source": "World Bank Group (worldbank.org)",
            "source_url": "https://www.worldbank.org",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which arm of the World Bank Group is widely known as the 'Soft Loan Window' for providing concessional zero-interest credits to the world's poorest countries?",
                    "options": ["International Bank for Reconstruction and Development (IBRD)", "International Development Association (IDA)", "International Finance Corporation (IFC)", "Multilateral Investment Guarantee Agency (MIGA)", "International Centre for Settlement of Investment Disputes (ICSID)"],
                    "answer": 1,
                    "explanation": "The International Development Association (IDA), established in 1960, is known as the World Bank's 'Soft Loan Window' offering long-term zero or low-interest loans."
                }
            ]
        },
        {
            "id": "CA-2026-08-003",
            "date": "2026-08-19",
            "category": "GOVERNMENT SCHEMES",
            "headline": "Pradhan Mantri Jan Dhan Yojana (PMJDY) Completes 12 Years: Total Beneficiary Accounts Cross 53 Crore",
            "summary": "PMJDY marked its 12th anniversary. Official data revealed total accounts crossed 53.5 Crore with over 55% held by women beneficiaries and cumulative deposits exceeding ₹2.35 Lakh Crore.",
            "exam_fact": "PMJDY was launched nationwide on 28th August 2014 with 6 pillars: Universal banking access, Basic savings bank accounts with RuPay debit card & accident cover of ₹2 Lakh, Overdraft up to ₹10,000, Financial literacy, Credit guarantee fund, and Micro-insurance/pension.",
            "why_important": "Formed the foundational JAM Trinity (Jan Dhan-Aadhaar-Mobile) enabling direct DBT transfers worth trillions.",
            "related_static_topic": "Financial Inclusion Committees: Nachiket Mor Committee, Khan Committee",
            "related_banking_topic": "Basic Savings Bank Deposit Account (BSBDA) guidelines issued by RBI",
            "source": "Department of Financial Services, Ministry of Finance (pib.gov.in)",
            "source_url": "https://pmjdy.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "What is the maximum overdraft (OD) facility available to eligible PMJDY account holders?",
                    "options": ["₹2,000", "₹5,000", "₹10,000", "₹15,000", "₹20,000"],
                    "answer": 2,
                    "explanation": "Eligible PMJDY account holders are entitled to an overdraft (OD) facility of up to ₹10,000 (with no conditions asked for OD up to ₹2,000)."
                }
            ]
        },
        {
            "id": "CA-2026-08-004",
            "date": "2026-08-15",
            "category": "NATIONAL",
            "headline": "Prime Minister Addresses Nation from Red Fort on 80th Independence Day: Roadmap for 'Viksit Bharat @2047'",
            "summary": "On the 80th Independence Day, the PM laid down key economic and social targets including semiconductor self-reliance, green hydrogen energy independence, and creation of 75,000 new medical seats across India.",
            "exam_fact": "India targets becoming a developed nation ('Viksit Bharat') by 2047, the centenary of India's independence.",
            "why_important": "Sets policy priorities for infrastructure, domestic manufacturing, and high-tech capital goods.",
            "related_static_topic": "National Symbols of India (National Flag, Anthem, Song, Emblem) & Constitutional History",
            "related_banking_topic": "Capital expenditure loans to states for capex creation",
            "source": "Press Information Bureau (PIB)",
            "source_url": "https://pib.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "The constitutional target year designated for achieving 'Viksit Bharat' (Developed Nation status for India) is:",
                    "options": ["2030", "2035", "2040", "2047", "2050"],
                    "answer": 3,
                    "explanation": "'Viksit Bharat @2047' represents the Government of India's comprehensive vision to transform India into a developed nation by the centenary year of independence (2047)."
                }
            ]
        },
        {
            "id": "CA-2026-08-005",
            "date": "2026-08-12",
            "category": "SCIENCE & TECH",
            "headline": "India Launches First National Supercomputing Mission High-Performance Cluster 'PARAM Rudra'",
            "summary": "The Ministry of Electronics and Information Technology (MeitY) and C-DAC deployed three new indigenously designed 'PARAM Rudra' supercomputing systems at Giant Metrewave Radio Telescope (Pune), Inter-University Accelerator Centre (Delhi), and S.N. Bose National Centre (Kolkata).",
            "exam_fact": "C-DAC (Centre for Development of Advanced Computing) developed India's first indigenous supercomputer 'PARAM 8000' in 1991 led by Dr. Vijay Bhatkar.",
            "why_important": "Empowers astrophysics research, atomic material simulations, and weather forecasting algorithms.",
            "related_static_topic": "Supercomputing in India, C-DAC, Giant Metrewave Radio Telescope (GMRT)",
            "related_banking_topic": "Cybersecurity frameworks for core banking solution (CBS) infrastructure",
            "source": "MeitY / C-DAC",
            "source_url": "https://meity.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "India's first indigenous supercomputer, PARAM 8000, was developed in 1991 by which institution?",
                    "options": ["ISRO", "DRDO", "BARC", "C-DAC", "IIT Bombay"],
                    "answer": 3,
                    "explanation": "Centre for Development of Advanced Computing (C-DAC) built India's first supercomputer PARAM 8000 in 1991."
                }
            ]
        },
        {
            "id": "CA-2026-08-006",
            "date": "2026-08-09",
            "category": "ECONOMY",
            "headline": "RBI Monetary Policy Committee (MPC) Keeps Repo Rate Unchanged at 6.50% with Focus on 'Withdrawal of Accommodation'",
            "summary": "The six-member Monetary Policy Committee (MPC) of RBI voted with a 4:2 majority to keep the benchmark policy repo rate unchanged at 6.50%, retaining vigilance on food inflation while projecting FY27 real GDP growth at 7.2%.",
            "exam_fact": "Under Section 45ZB of RBI Act 1934, MPC comprises 6 members: 3 from RBI (Governor as Ex-officio Chair, Deputy Governor in-charge of MP, and one officer) and 3 external members appointed by the Central Government. Inflation target is 4% with a tolerance band of +/- 2% (2% to 6%).",
            "why_important": "Determines interest rate benchmark for floating-rate home loans, personal loans, and banking deposit rates.",
            "related_static_topic": "Monetary Policy instruments (Repo, Reverse Repo, SDF, MSF, CRR, SLR)",
            "related_banking_topic": "External Benchmark Lending Rate (EBLR) linked to RBI Repo Rate",
            "source": "Reserve Bank of India Monetary Policy Statement",
            "source_url": "https://rbi.org.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Under the Flexible Inflation Targeting (FIT) framework established under the RBI Act, what is the mandated consumer inflation target band?",
                    "options": ["3% (+/- 1%)", "4% (+/- 2%)", "5% (+/- 1%)", "6% (+/- 2%)", "2% to 4%"],
                    "answer": 1,
                    "explanation": "Under Section 45ZA of the RBI Act 1934, the Central Government in consultation with RBI has set the consumer inflation target at 4% with a tolerance band of +/- 2% (i.e. 2% to 6%)."
                }
            ]
        },
        {
            "id": "CA-2026-08-007",
            "date": "2026-08-07",
            "category": "DEFENCE",
            "headline": "Indian Air Force Participates in Multilateral Air Exercise 'Tarang Shakti 2026'",
            "summary": "The Indian Air Force hosted 'Tarang Shakti', one of the largest multilateral air combat exercises in South Asia, at Suringar/Jodhpur featuring fighter jets and observers from over 15 partner nations including France, Germany, USA, and UK.",
            "exam_fact": "Tarang Shakti is India's first indigenous multinational air exercise. Rafale, Su-30MKI, LCA Tejas, and Mirage 2000 participated.",
            "why_important": "Demonstrates IAF's interoperability and power projection across the Indo-Pacific theatre.",
            "related_static_topic": "Important Joint Military Exercises of India (Garuda, Varuna, Yudh Abhyas, Malabar, Mitra Shakti)",
            "related_banking_topic": "Defence procurement offset policies and domestic aerospace MSMEs",
            "source": "Indian Air Force (indianairforce.nic.in)",
            "source_url": "https://indianairforce.nic.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "'Tarang Shakti' is a major multilateral military exercise hosted by which branch of the Indian Armed Forces?",
                    "options": ["Indian Army", "Indian Air Force", "Indian Navy", "Indian Coast Guard", "Special Forces Command"],
                    "answer": 1,
                    "explanation": "Tarang Shakti is the largest multilateral air combat exercise organized and hosted by the Indian Air Force."
                }
            ]
        },
        {
            "id": "CA-2026-08-008",
            "date": "2026-08-05",
            "category": "ENVIRONMENT",
            "headline": "Project Tiger and Project Elephant Joint Review: India's Tiger Population Estimated at 3,682",
            "summary": "The National Tiger Conservation Authority (NTCA) and Wildlife Institute of India (WII) released updated status report confirming India hosts 75% of the world's wild tiger population, with Madhya Pradesh retaining the 'Tiger State' title with 785 tigers.",
            "exam_fact": "Project Tiger was launched on 1st April 1973 at Corbett National Park, Uttarakhand. International Tiger Day is celebrated on 29th July annually.",
            "why_important": "Validates apex predator conservation and habitat restoration across 55+ designated Tiger Reserves.",
            "related_static_topic": "Tiger Reserves of India, NTCA (Statutory body under Wildlife Protection Act 1972)",
            "related_banking_topic": "Corporate Social Responsibility (CSR) funding for biodiversity conservation",
            "source": "National Tiger Conservation Authority (NTCA)",
            "source_url": "https://projecttiger.nic.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which state in India currently hosts the highest number of wild tigers according to NTCA census reports?",
                    "options": ["Karnataka", "Uttarakhand", "Madhya Pradesh", "Maharashtra", "Assam"],
                    "answer": 2,
                    "explanation": "Madhya Pradesh has the highest number of wild tigers (785 tigers), closely followed by Karnataka (563 tigers)."
                }
            ]
        },
        {
            "id": "CA-2026-08-009",
            "date": "2026-08-03",
            "category": "APPOINTMENTS",
            "headline": "Justice Sanjiv Khanna Appointed as Chairperson of National Legal Services Authority (NALSA)",
            "summary": "In accordance with tradition under the Legal Services Authorities Act 1987, the senior-most puisne judge of the Supreme Court was nominated as the Executive Chairman of NALSA.",
            "exam_fact": "Chief Justice of India is the Patron-in-Chief of NALSA. Free legal aid is guaranteed under Article 39A (Directive Principles of State Policy) inserted via the 42nd Amendment Act 1976.",
            "why_important": "Guarantees free, competent legal representation to marginalized citizens and organizes nationwide Lok Adalats.",
            "related_static_topic": "Article 39A (Equal Justice & Free Legal Aid), Supreme Court of India, Legal Services Authorities Act 1987",
            "related_banking_topic": "Lok Adalats for speedy recovery of non-performing assets (NPAs) up to ₹20 Lakh",
            "source": "Ministry of Law and Justice",
            "source_url": "https://nalsa.gov.in",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "Which Article of the Indian Constitution directs the State to provide free legal aid to ensure equal justice for poor citizens?",
                    "options": ["Article 38", "Article 39A", "Article 41", "Article 43A", "Article 48A"],
                    "answer": 1,
                    "explanation": "Article 39A (inserted by the 42nd Amendment in 1976) obligates the state to provide free legal aid by suitable legislation or schemes."
                }
            ]
        },
        {
            "id": "CA-2026-08-010",
            "date": "2026-08-01",
            "category": "REPORTS & INDEXES",
            "headline": "UNDP Releases Global Multidimensional Poverty Index (MPI): 415 Million Indians Exited Poverty in 15 Years",
            "summary": "United Nations Development Programme (UNDP) and Oxford Poverty and Human Development Initiative (OPHI) reported India's historic achievement of lifting 415 million people out of multidimensional poverty between 2005-06 and 2019-21.",
            "exam_fact": "Global MPI evaluates poverty across 3 dimensions (Health, Education, Standard of living) and 10 indicators (Nutrition, Child mortality, Years of schooling, Attendance, Cooking fuel, Sanitation, Drinking water, Electricity, Housing, Assets).",
            "why_important": "Proves substantial socioeconomic mobility through basic amenity saturation (water, sanitation, electricity, LPG).",
            "related_static_topic": "UNDP (HQ New York), Human Development Index (HDI), Multidimensional Poverty Index (MPI)",
            "related_banking_topic": "Priority sector credit impact on living standards and household micro-assets",
            "source": "UNDP / OPHI Global MPI Report",
            "source_url": "https://hdr.undp.org",
            "last_verified": "2026-09-13",
            "mcqs": [
                {
                    "question": "The Global Multidimensional Poverty Index (MPI) assesses poverty across how many core dimensions?",
                    "options": ["Two", "Three", "Four", "Five", "Six"],
                    "answer": 1,
                    "explanation": "Global MPI measures poverty across three equally-weighted dimensions: Health, Education, and Standard of Living (subdivided into 10 indicators)."
                }
            ]
        }
    ]
}

with open(os.path.join(ca_dir, "2026-08.json"), "w", encoding="utf-8") as f:
    json.dump(aug_2026, f, indent=2, ensure_ascii=False)

# 2026 Summary
summary_2026 = {
    "year": 2026,
    "available_months": ["2026-09", "2026-08"],
    "categories": [
        "ECONOMY & BANKING",
        "NATIONAL",
        "INTERNATIONAL",
        "GOVERNMENT SCHEMES",
        "SCIENCE & DEFENCE",
        "APPOINTMENTS",
        "AWARDS & HONOURS",
        "REPORTS & INDEXES",
        "SPORTS",
        "ENVIRONMENT & ECOLOGY"
    ],
    "high_yield_themes": [
        {
            "theme": "Monetary Policy & Forex Milestones",
            "why": "Frequently tested in SBI and IBPS Clerk Mains. Direct questions on repo rate, forex reserves rankings, and MPC composition.",
            "sample_topic": "India crossing $700B Forex, MPC Section 45ZB"
        },
        {
            "theme": "Flagship Central Schemes Outlays",
            "why": "IBPS exams invariably test financial outlay, eligibility age, and ministry for PM-KISAN, PM Surya Ghar, and PMJDY.",
            "sample_topic": "PM Surya Ghar (₹75,021 Cr, 1 Cr households), PM-KISAN (₹6000/yr)"
        },
        {
            "theme": "Defence Indigenisation & Space",
            "why": "INS Arighaat SSBN commissioning, GSAT-7R naval communications, Shukrayaan-1 Venus mission.",
            "sample_topic": "LVM3 rocket, Nuclear Triad second-strike"
        },
        {
            "theme": "Multilateral Institutions & Memberships",
            "why": "NDB expansion (Algeria), World Bank WDR 3i framework, Ramsar wetlands (88 total).",
            "sample_topic": "NDB HQ Shanghai, Ramsar Convention 1971"
        }
    ]
}

with open(os.path.join(ca_dir, "2026-summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary_2026, f, indent=2, ensure_ascii=False)

print("Current Affairs datasets generated successfully.")
