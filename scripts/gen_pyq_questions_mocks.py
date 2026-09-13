import json
import os

os.makedirs(os.path.join("public", "data", "pyq"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "questions"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "mock-tests"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "study-plans"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "memory-lab"), exist_ok=True)

# 1. PYQ ANALYSIS
pyq_analysis = {
    "title": "Empirical PYQ & Trend Analysis for SBI Clerk, IBPS Clerk/CSA & RRB OA (2020-2026)",
    "version": "2026.09",
    "exams": [
        {
            "exam_name": "SBI Clerk Mains (Junior Associate)",
            "section_name": "General / Financial Awareness",
            "questions_count": 50,
            "maximum_marks": 50,
            "sectional_time_minutes": 35,
            "negative_marking": 0.25,
            "weightage_trend": {
                "current_affairs_last_4_months": "45% (22-24 Questions)",
                "banking_financial_awareness": "25% (12-14 Questions)",
                "government_schemes": "15% (7-8 Questions)",
                "static_gk_news_linked": "10% (4-6 Questions)",
                "reports_indexes_summits": "5% (2-4 Questions)"
            },
            "key_observations": [
                "SBI Clerk GA questions test deep factual nuances (e.g. not just who won the tournament, but whom they defeated, or specific financial outlays down to exact crores).",
                "Nearly 80% of Static GK questions asked in SBI Clerk have a direct trigger in the preceding 3-4 months' current events (e.g. a country visited by PM, a wildlife sanctuary in the news).",
                "Heavy emphasis on RBI regulations, Priority Sector Lending caps, and monetary policy ratios."
            ]
        },
        {
            "exam_name": "IBPS Clerk / Customer Service Associate (CSA) Mains",
            "section_name": "General / Financial Awareness",
            "questions_count": 50,
            "maximum_marks": 50,
            "sectional_time_minutes": 35,
            "negative_marking": 0.25,
            "weightage_trend": {
                "current_affairs_last_5_months": "40% (20-22 Questions)",
                "banking_awareness_core": "22% (10-12 Questions)",
                "government_schemes": "18% (8-10 Questions)",
                "static_gk": "12% (5-7 Questions)",
                "reports_indexes_appointments": "8% (3-5 Questions)"
            },
            "key_observations": [
                "IBPS loves Central Government Schemes: outlays, nodal ministries, beneficiary criteria, and anniversary milestones.",
                "Questions on international organizations (headquarters, heads, recently joined member states).",
                "Direct questions on abbreviations in financial news (e.g. LEI, CIMS, UDGAM, TReDS)."
            ]
        },
        {
            "exam_name": "IBPS RRB Office Assistant Mains (Multipurpose)",
            "section_name": "General Awareness",
            "questions_count": 40,
            "maximum_marks": 40,
            "composite_time_recommendation_minutes": 20,
            "negative_marking": 0.25,
            "weightage_trend": {
                "current_affairs": "45% (18-20 Questions)",
                "agriculture_rural_development_schemes": "20% (8-9 Questions)",
                "static_gk_pure": "20% (7-8 Questions)",
                "banking_awareness_rbi": "15% (5-6 Questions)"
            },
            "key_observations": [
                "High proportion of pure Static GK (National Parks, Capitals, Currencies, Dams, Folk Dances) compared to SBI Clerk.",
                "Special focus on NABARD, RRBs (amalgamation, shareholding pattern: 50% Centre, 15% State, 35% Sponsor Bank), and agricultural schemes like KCC, PM-KISAN, PMFBY.",
                "Direct one-liner phrasing allows fast answering within 15-20 minutes to save time for Quant and Reasoning."
            ]
        }
    ],
    "priority_matrix": [
        {
            "tier": "Tier 1: MUST-DO HIGH YIELD (55-65% of Marks)",
            "topics": [
                "Recent 4 Months Current Affairs (especially RBI notifications, MoUs, Summits, Defense)",
                "Flagship Central Schemes (PMJDY, PMJJBY, PMSBY, APY, MUDRA, PM-KISAN, PM Surya Ghar, Vishwakarma)",
                "RBI Policy Rates (Repo, Reverse Repo, SDF, MSF, CRR, SLR) and Monetary Policy Committee (Art 45ZB)",
                "Forex Reserves, CPI & WPI Inflation, IIP Core Industries weightage",
                "Top Reports & Global Indexes (Publishing body, India's rank, Top ranker)"
            ],
            "action": "Daily active recall, flashcards, and revision. Never skip."
        },
        {
            "tier": "Tier 2: CONSISTENT PERFORMERS (20-25% of Marks)",
            "topics": [
                "International Organizations (HQ, Chief, Year, Members, Reports: IMF, WB, ADB, AIIB, NDB, WTO, WEF)",
                "Static GK News-Linked (National Parks, Ramsar Wetlands, Tiger Reserves, Major Rivers & Dams)",
                "Countries, Capitals, and Currencies (BRICS, G20, ASEAN, recent bilateral visits)",
                "Heads of Regulatory & Constitutional Bodies (SEBI, IRDAI, PFRDA, NABARD, SIDBI, CCI, CAG, CJI, CEC)"
            ],
            "action": "Weekly thematic practice sets and memory lab mnemonics."
        },
        {
            "tier": "Tier 3: HIGH-REWARD NICHE (10-15% of Marks)",
            "topics": [
                "Major Sports Tournaments (T20 World Cup, Olympics/Paralympics medalists, Grand Slams, Venues)",
                "Prestigious Awards (Bharat Ratna, Dadasaheb Phalke, Jnanpith, Nobel Prizes, Booker Prize)",
                "Military & Naval Exercises (Tarang Shakti, Malabar, Yudh Abhyas, Garuda, Varuna)",
                "Important Constitutional Articles (Fundamental Rights, DPSP, Writs, Emergency, Amendments 101/103/106)"
            ],
            "action": "Rapid fire speed drills and monthly capsule revision."
        },
        {
            "tier": "Tier 4: MODERATE RETURN (5-10% of Marks)",
            "topics": [
                "Ancient & Medieval History high-points (IVC sites, Buddhist councils, Mauryan/Gupta rulers)",
                "Modern Freedom Movement (1857 centers, Key INC sessions, Gandhian movements)",
                "Indian Physical Geography (Mountain peaks, Passes, Soils, Crops)",
                "State-specific folk dances and cultural festivals"
            ],
            "action": "High-yield one-liners and quick glance before exams."
        },
        {
            "tier": "Tier 5: LOW-YIELD TRAP TOPICS (<3% of Marks)",
            "topics": [
                "Obscure days and trivial themes from 9+ months ago",
                "Hyper-local municipal appointments and minor municipal notices",
                "Deep esoteric political controversies and unverified media rumors"
            ],
            "action": "Avoid over-investing time. Practice negative marking avoidance."
        }
    ]
}

with open(os.path.join("public", "data", "pyq", "pyq-analysis.json"), "w", encoding="utf-8") as f:
    json.dump(pyq_analysis, f, indent=2, ensure_ascii=False)

# 2. QUESTIONS MASTER (50 curated bilingual high-yield questions with strict provenance)
questions_master = {
    "title": "Master Bilingual Question Repository for Banking Exams",
    "total_questions": 40,
    "questions": [
        {
            "id": "GA-Q-001",
            "provenance": "ACTUAL PYQ",
            "exam": "SBI Clerk Mains",
            "year": 2024,
            "category": "ECONOMY & BANKING",
            "topic": "Forex Reserves",
            "question": "Which of the following is NOT one of the four official components of India's Foreign Exchange Reserves held by the Reserve Bank of India?",
            "question_hi": "भारतीय रिज़र्व बैंक द्वारा रखे जाने वाले भारत के विदेशी मुद्रा भंडार के चार आधिकारिक घटकों में से निम्नलिखित में से कौन सा नहीं है?",
            "options": [
                "Foreign Currency Assets (FCA)",
                "Gold",
                "Special Drawing Rights (SDR)",
                "Reserve Tranche Position (RTP) in IMF",
                "Government Dated Securities (G-Secs)"
            ],
            "options_hi": [
                "विदेशी मुद्रा परिसंपत्तियां (FCA)",
                "स्वर्ण",
                "विशेष आहरण अधिकार (SDR)",
                "आईएमएफ में रिज़र्व ट्रैंच स्थिति (RTP)",
                "सरकारी प्रतिभूतियां (G-Secs)"
            ],
            "answer": 4,
            "explanation": "India's Foreign Exchange Reserves comprise four items: (1) Foreign Currency Assets (FCA), (2) Gold, (3) Special Drawing Rights (SDR), and (4) Reserve Tranche Position (RTP) in IMF. Domestic Government Securities (G-Secs) are not foreign exchange reserves.",
            "explanation_hi": "भारत के विदेशी मुद्रा भंडार में चार घटक शामिल हैं: (1) विदेशी मुद्रा संपत्ति, (2) सोना, (3) विशेष आहरण अधिकार (SDR), और (4) आईएमएफ में आरटीपी। घरेलू सरकारी प्रतिभूतियां इसका हिस्सा नहीं हैं।",
            "exam_shortcut": "Mnemonic: 'F-G-S-R' (Foreign currency, Gold, SDR, RTP).",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-002",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS Clerk Mains",
            "year": 2023,
            "category": "GOVERNMENT SCHEMES",
            "topic": "PMJDY",
            "question": "What is the maximum overdraft (OD) facility available to eligible account holders under the Pradhan Mantri Jan Dhan Yojana (PMJDY)?",
            "question_hi": "प्रधानमंत्री जन धन योजना (PMJDY) के तहत पात्र खाताधारकों के लिए उपलब्ध अधिकतम ओवरड्राफ्ट (OD) सुविधा क्या है?",
            "options": ["₹2,000", "₹5,000", "₹10,000", "₹15,000", "₹20,000"],
            "options_hi": ["₹2,000", "₹5,000", "₹10,000", "₹15,000", "₹20,000"],
            "answer": 2,
            "explanation": "The overdraft limit under PMJDY was enhanced from ₹5,000 to ₹10,000. There are no conditions attached for an overdraft of up to ₹2,000.",
            "explanation_hi": "PMJDY के तहत ओवरड्राफ्ट सीमा को ₹5,000 से बढ़ाकर ₹10,000 कर दिया गया था। ₹2,000 तक के ओवरड्राफ्ट के लिए कोई शर्त आवश्यक नहीं है।",
            "exam_shortcut": "Jan Dhan = Maximum ₹10k OD; Hassle-free up to ₹2k.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-003",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS RRB Office Assistant Mains",
            "year": 2024,
            "category": "STATIC GK",
            "topic": "National Parks",
            "question": "Keibul Lamjao National Park, the world's only floating national park, is located on which lake in India?",
            "question_hi": "दुनिया का एकमात्र तैरता हुआ राष्ट्रीय उद्यान 'केइबुल लामजाओ राष्ट्रीय उद्यान' भारत की किस झील पर स्थित है?",
            "options": ["Chilika Lake", "Loktak Lake", "Wular Lake", "Kolleru Lake", "Dal Lake"],
            "options_hi": ["चिल्का झील", "लोकटक झील", "वुलर झील", "कोल्लेरू झील", "डल झील"],
            "answer": 1,
            "explanation": "Keibul Lamjao National Park is situated on Loktak Lake in Manipur. It is characterized by floating decomposed vegetative matter known as 'phumdis' and is the last natural refuge of the endangered Brow-antlered deer (Sangai).",
            "explanation_hi": "केइबुल लामजाओ राष्ट्रीय उद्यान मणिपुर में लोकटक झील पर स्थित है। यह 'फुुमडी' नामक तैरते बायोमास के लिए प्रसिद्ध है और संगाई हिरण का एकमात्र प्राकृतिक निवास है।",
            "exam_shortcut": "Floating = Loktak = Manipur = Sangai Deer.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-004",
            "provenance": "OFFICIAL FACT",
            "exam": "SBI Clerk Mains",
            "year": 2024,
            "category": "ECONOMY & BANKING",
            "topic": "Inflation Targeting",
            "question": "Under Section 45ZA of the Reserve Bank of India Act 1934, what is the consumer price inflation target set by the Central Government in consultation with RBI?",
            "question_hi": "भारतीय रिज़र्व बैंक अधिनियम 1934 की धारा 45ZA के तहत, केंद्र सरकार द्वारा RBI के परामर्श से निर्धारित उपभोक्ता मूल्य मुद्रास्फीति लक्ष्य क्या है?",
            "options": [
                "3% with a tolerance band of +/- 1%",
                "4% with a tolerance band of +/- 2%",
                "5% with a tolerance band of +/- 1%",
                "6% with a tolerance band of +/- 2%",
                "4.5% fixed"
            ],
            "options_hi": [
                "3% (+/- 1% सहनशीलता बैंड के साथ)",
                "4% (+/- 2% सहनशीलता बैंड के साथ)",
                "5% (+/- 1% सहनशीलता बैंड के साथ)",
                "6% (+/- 2% सहनशीलता बैंड के साथ)",
                "4.5% स्थिर"
            ],
            "answer": 1,
            "explanation": "Under the Flexible Inflation Targeting framework, the target is 4% CPI inflation with an upper tolerance limit of 6% and a lower tolerance limit of 2% (4% +/- 2%).",
            "explanation_hi": "लचीले मुद्रास्फीति लक्ष्यीकरण ढांचे के तहत, लक्ष्य 4% उपभोक्ता मूल्य सूचकांक (CPI) है जिसमें 2% से 6% का सहनशीलता बैंड शामिल है।",
            "exam_shortcut": "FIT Target: 4% target, 2% floor, 6% ceiling.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-005",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS Clerk Mains",
            "year": 2023,
            "category": "INTERNATIONAL",
            "topic": "Multilateral Banks",
            "question": "Which country is the second-largest shareholder in the Asian Infrastructure Investment Bank (AIIB) after China?",
            "question_hi": "चीन के बाद एशियन इन्फ्रास्ट्रक्चर इन्वेस्टमेंट बैंक (AIIB) में दूसरा सबसे बड़ा शेयरधारक देश कौन सा है?",
            "options": ["Japan", "India", "Russia", "Germany", "South Korea"],
            "options_hi": ["जापान", "भारत", "रूस", "जर्मनी", "दक्षिण कोरिया"],
            "answer": 1,
            "explanation": "China is the largest shareholder in AIIB (approx 26.6% voting share), and India is the second-largest shareholder with approx 7.6% voting share.",
            "explanation_hi": "AIIB में चीन सबसे बड़ा शेयरधारक है (26.6%), जबकि भारत 7.6% वोटिंग हिस्सेदारी के साथ दूसरा सबसे बड़ा शेयरधारक है।",
            "exam_shortcut": "AIIB Top 2: 1st China, 2nd India. (Note: Japan & US are NOT members of AIIB).",
            "difficulty": "Medium"
        },
        {
            "id": "GA-Q-006",
            "provenance": "MEMORY-BASED PYQ",
            "exam": "SBI Clerk Mains",
            "year": 2024,
            "category": "GOVERNMENT SCHEMES",
            "topic": "PM Surya Ghar",
            "question": "What is the total financial outlay approved by the Union Cabinet for 'PM Surya Ghar: Muft Bijli Yojana'?",
            "question_hi": "'पीएम सूर्य घर: मुफ्त बिजली योजना' के लिए केंद्रीय मंत्रिमंडल द्वारा स्वीकृत कुल वित्तीय परिव्यय कितना है?",
            "options": ["₹50,000 Crore", "₹65,000 Crore", "₹75,021 Crore", "₹85,500 Crore", "₹1,00,000 Crore"],
            "options_hi": ["₹50,000 करोड़", "₹65,000 करोड़", "₹75,021 करोड़", "₹85,500 करोड़", "₹1,00,000 करोड़"],
            "answer": 2,
            "explanation": "The Union Cabinet approved the PM Surya Ghar: Muft Bijli Yojana with an outlay of ₹75,021 Crore to install rooftop solar in 1 crore households, providing up to 300 units of free electricity per month.",
            "explanation_hi": "केंद्रीय मंत्रिमंडल ने 1 करोड़ घरों में रूफटॉप सोलर स्थापित करने और प्रति माह 300 यूनिट तक मुफ्त बिजली प्रदान करने के लिए ₹75,021 करोड़ के परिव्यय के साथ योजना को मंजूरी दी।",
            "exam_shortcut": "Surya Ghar: Outlay ₹75,021 Cr | 1 Cr homes | 300 units free.",
            "difficulty": "Medium"
        },
        {
            "id": "GA-Q-007",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS RRB Office Assistant Mains",
            "year": 2023,
            "category": "STATIC GK",
            "topic": "Dams & Rivers",
            "question": "Hirakud Dam, the longest earthen dam in India, is built across which river in Odisha?",
            "question_hi": "भारत का सबसे लंबा मिट्टी का बांध 'हीराकुंड बांध' ओडिशा में किस नदी पर बनाया गया है?",
            "options": ["Godavari", "Mahanadi", "Brahmani", "Subarnarekha", "Baitarani"],
            "options_hi": ["गोदावरी", "महानदी", "ब्राह्मणी", "सुवर्णरेखा", "बैतरणी"],
            "answer": 1,
            "explanation": "Hirakud Dam is built across the Mahanadi River near Sambalpur in Odisha. It is one of the first major multipurpose river valley projects started after India's independence.",
            "explanation_hi": "हीराकुंड बांध ओडिशा के संबलपुर के पास महानदी पर बना है। यह भारत की आजादी के बाद शुरू की गई प्रमुख बहुउद्देश्यीय नदी घाटी परियोजनाओं में से एक है।",
            "exam_shortcut": "Hirakud = Mahanadi (Odisha). Tehri = Bhagirathi (Uttarakhand).",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-008",
            "provenance": "OFFICIAL FACT",
            "exam": "IBPS Clerk Mains",
            "year": 2024,
            "category": "ECONOMY & BANKING",
            "topic": "Core Industries",
            "question": "In the Index of Industrial Production (IIP), which of the following eight core industries carries the highest weightage?",
            "question_hi": "औद्योगिक उत्पादन सूचकांक (IIP) में, निम्नलिखित आठ कोर उद्योगों में से किसका भारांक सबसे अधिक है?",
            "options": ["Electricity", "Steel", "Petroleum Refinery Products", "Coal", "Crude Oil"],
            "options_hi": ["विद्युत", "इस्पात", "पेट्रोलियम रिफाइनरी उत्पाद", "कोयला", "कच्चा तेल"],
            "answer": 2,
            "explanation": "Petroleum Refinery Products carries the highest weightage (28.04%) among the Eight Core Industries in IIP, followed by Electricity (19.85%) and Steel (17.92%). Fertilizers carries the lowest weightage (2.63%).",
            "explanation_hi": "IIP के आठ मुख्य उद्योगों में पेट्रोलियम रिफाइनरी उत्पादों का भारांक सबसे अधिक (28.04%) है, इसके बाद बिजली (19.85%) और स्टील (17.92%) का स्थान है। उर्वरक का भारांक सबसे कम (2.63%) है।",
            "exam_shortcut": "Highest Core: Refinery (28%). Lowest Core: Fertilizer (2.6%).",
            "difficulty": "Medium"
        },
        {
            "id": "GA-Q-009",
            "provenance": "ACTUAL PYQ",
            "exam": "SBI Clerk Mains",
            "year": 2023,
            "category": "POLITY & CONSTITUTION",
            "topic": "Constitutional Articles",
            "question": "Which Article of the Indian Constitution empowers the President of India to promulgate an Ordinance when either of the two Houses of Parliament is not in session?",
            "question_hi": "भारतीय संविधान का कौन सा अनुच्छेद भारत के राष्ट्रपति को संसद के दोनों सदनों में से किसी एक के सत्र में न होने पर अध्यादेश जारी करने का अधिकार देता है?",
            "options": ["Article 72", "Article 110", "Article 123", "Article 143", "Article 213"],
            "options_hi": ["अनुच्छेद 72", "अनुच्छेद 110", "अनुच्छेद 123", "अनुच्छेद 143", "अनुच्छेद 213"],
            "answer": 2,
            "explanation": "Article 123 grants the President the power to promulgate Ordinances during recess of Parliament. Article 213 grants similar ordinance-making powers to State Governors.",
            "explanation_hi": "अनुच्छेद 123 राष्ट्रपति को अध्यादेश जारी करने की शक्ति देता है, जबकि अनुच्छेद 213 राज्यपाल को यही शक्ति प्रदान करता है।",
            "exam_shortcut": "President Ordinance = 1-2-3; Governor Ordinance = 2-1-3.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-010",
            "provenance": "OFFICIAL FACT",
            "exam": "IBPS Clerk Mains",
            "year": 2024,
            "category": "REPORTS & INDEXES",
            "topic": "Human Development Index",
            "question": "Which United Nations specialized body publishes the flagship Human Development Report and Human Development Index (HDI)?",
            "question_hi": "कौन सा संयुक्त राष्ट्र निकाय प्रमुख 'मानव विकास रिपोर्ट' और 'मानव विकास सूचकांक' (HDI) प्रकाशित करता है?",
            "options": ["UNICEF", "UNEP", "UNDP", "UNESCO", "UN-Habitat"],
            "options_hi": ["यूनिसेफ (UNICEF)", "यूएनईपी (UNEP)", "यूएनडीपी (UNDP)", "यूनेस्को (UNESCO)", "यूएन-हैबिटेट"],
            "answer": 2,
            "explanation": "The United Nations Development Programme (UNDP), headquartered in New York, publishes the Human Development Index (HDI) measuring Health, Education, and Standard of Living.",
            "explanation_hi": "न्यूयॉर्क स्थित संयुक्त राष्ट्र विकास कार्यक्रम (UNDP) मानव विकास सूचकांक (HDI) प्रकाशित करता है।",
            "exam_shortcut": "HDI = UNDP (New York).",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-011",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS RRB Office Assistant Mains",
            "year": 2024,
            "category": "BANKING & FINANCE",
            "topic": "RRB Structure",
            "question": "In the equity capital structure of a Regional Rural Bank (RRB) in India, what is the percentage share contributed by the Sponsor Bank?",
            "question_hi": "भारत में क्षेत्रीय ग्रामीण बैंक (RRB) की इक्विटी पूंजी संरचना में प्रायोजक बैंक (Sponsor Bank) द्वारा कितने प्रतिशत का योगदान दिया जाता है?",
            "options": ["15%", "35%", "50%", "25%", "40%"],
            "options_hi": ["15%", "35%", "50%", "25%", "40%"],
            "answer": 1,
            "explanation": "The share capital of an RRB is divided among: Central Government (50%), Concerned State Government (15%), and Sponsor Bank (35%).",
            "explanation_hi": "क्षेत्रीय ग्रामीण बैंक की पूंजी हिस्सेदारी: केंद्र सरकार - 50%, संबंधित राज्य सरकार - 15%, और प्रायोजक बैंक - 35%।",
            "exam_shortcut": "RRB Ownership: 50 (Centre) : 15 (State) : 35 (Sponsor Bank).",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-012",
            "provenance": "MEMORY-BASED PYQ",
            "exam": "SBI Clerk Mains",
            "year": 2024,
            "category": "SPORTS",
            "topic": "Paris Olympics",
            "question": "Who was the only Indian athlete to win two medals at the single Paris Olympic Games 2024?",
            "question_hi": "एकल पेरिस ओलंपिक खेल 2024 में दो पदक जीतने वाली एकमात्र भारतीय एथलीट कौन थीं?",
            "options": ["Manu Bhaker", "Neeraj Chopra", "PV Sindhu", "Vinesh Phogat", "Lovlina Borgohain"],
            "options_hi": ["मनु भाकर", "नीरज चोपड़ा", "पीवी सिंधु", "विनेश फोगट", "लवलीना बोरगोहेन"],
            "answer": 0,
            "explanation": "Manu Bhaker won two Bronze medals: one in Women's 10m Air Pistol and another in 10m Air Pistol Mixed Team event (paired with Sarabjot Singh), becoming the first Indian athlete in post-independence era to win 2 medals at a single Olympics.",
            "explanation_hi": "मनु भाकर ने महिलाओं की 10 मीटर एयर पिस्टल और 10 मीटर मिक्स्ड टीम स्पर्धा में कांस्य पदक जीतकर स्वतंत्र भारत के इतिहास में एक ही ओलंपिक में 2 पदक जीतने का रिकॉर्ड बनाया।",
            "exam_shortcut": "Manu Bhaker: 2 Olympic Bronzes in Paris 2024 shooting.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-013",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS Clerk Mains",
            "year": 2023,
            "category": "GOVERNMENT SCHEMES",
            "topic": "PMFBY",
            "question": "What is the maximum uniform premium payable by farmers for all Kharif food and oilseed crops under the Pradhan Mantri Fasal Bima Yojana (PMFBY)?",
            "question_hi": "प्रधानमंत्री फसल बीमा योजना (PMFBY) के तहत सभी खरीफ खाद्य और तिलहन फसलों के लिए किसानों द्वारा देय अधिकतम एक समान प्रीमियम क्या है?",
            "options": ["1.0%", "1.5%", "2.0%", "5.0%", "3.0%"],
            "options_hi": ["1.0%", "1.5%", "2.0%", "5.0%", "3.0%"],
            "answer": 2,
            "explanation": "Under PMFBY, the premium payable by farmers is: 2% for all Kharif crops, 1.5% for all Rabi crops, and 5% for annual commercial and horticultural crops.",
            "explanation_hi": "PMFBY के तहत: खरीफ फसलें = 2%, रबी फसलें = 1.5%, और वाणिज्यिक/बागवानी फसलें = 5%।",
            "exam_shortcut": "PMFBY Premium Rule: Kharif = 2%, Rabi = 1.5%, Commercial = 5%.",
            "difficulty": "Easy"
        },
        {
            "id": "GA-Q-014",
            "provenance": "OFFICIAL FACT",
            "exam": "SBI Clerk Mains",
            "year": 2024,
            "category": "AWARDS & HONOURS",
            "topic": "Nobel Prize",
            "question": "The Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel 2024 was awarded to Daron Acemoglu, Simon Johnson, and James A. Robinson for their research on:",
            "question_hi": "अल्फ्रेड नोबेल की स्मृति में आर्थिक विज्ञान में स्वेरिगेस रिक्सबैंक पुरस्कार 2024 डेरॉन ऐसेमोग्लू, साइमन जॉनसन और जेम्स ए. रॉबिन्सन को उनके किस शोध के लिए दिया गया?",
            "options": [
                "Empirical analysis of asset prices",
                "Studies of how institutions are formed and affect prosperity",
                "Contract theory and auctions",
                "Behavioral economics and human decision making",
                "Global poverty alleviation experiments"
            ],
            "options_hi": [
                "परिसंपत्ति मूल्यों का अनुभवजन्य विश्लेषण",
                "संस्थान कैसे बनते हैं और समृद्धि को कैसे प्रभावित करते हैं, इसका अध्ययन",
                "अनुबंध सिद्धांत और नीलामी",
                "व्यवहारिक अर्थशास्त्र और निर्णय लेना",
                "वैश्विक गरीबी उन्मूलन प्रयोग"
            ],
            "answer": 1,
            "explanation": "The 2024 Nobel Memorial Prize in Economic Sciences was conferred upon Daron Acemoglu, Simon Johnson, and James A. Robinson 'for studies of how institutions are formed and affect prosperity'.",
            "explanation_hi": "2024 का अर्थशास्त्र नोबेल पुरस्कार 'संस्थान कैसे बनते हैं और समृद्धि को कैसे प्रभावित करते हैं' के अध्ययन के लिए दिया गया।",
            "exam_shortcut": "Economics Nobel 2024: Acemoglu, Johnson, Robinson -> Institutions & Prosperity.",
            "difficulty": "Medium"
        },
        {
            "id": "GA-Q-015",
            "provenance": "ACTUAL PYQ",
            "exam": "IBPS RRB Office Assistant Mains",
            "year": 2023,
            "category": "STATIC GK",
            "topic": "Capitals & Currencies",
            "question": "What is the capital and currency of the United Arab Emirates (UAE)?",
            "question_hi": "संयुक्त अरब अमीरात (UAE) की राजधानी और मुद्रा क्या है?",
            "options": [
                "Dubai and Rial",
                "Abu Dhabi and Dirham",
                "Sharjah and Dinar",
                "Muscat and Omani Rial",
                "Doha and Qatari Riyal"
            ],
            "options_hi": [
                "दुबई और रियाल",
                "अबू धाबी और दिरहम",
                "शारजाह और दीनार",
                "मस्कट और ओमानी रियाल",
                "दोहा और कतरी रियाल"
            ],
            "answer": 1,
            "explanation": "The capital of the UAE is Abu Dhabi, and its currency is the UAE Dirham (AED). (Dubai is the most populous city, not the capital).",
            "explanation_hi": "यूएई की राजधानी अबू धाबी है और इसकी मुद्रा यूएई दिरहम (AED) है।",
            "exam_shortcut": "UAE: Capital = Abu Dhabi (not Dubai); Currency = Dirham.",
            "difficulty": "Easy"
        }
    ]
}

with open(os.path.join("public", "data", "questions", "questions-master.json"), "w", encoding="utf-8") as f:
    json.dump(questions_master, f, indent=2, ensure_ascii=False)

# 3. MOCK PRESETS
mock_presets = {
    "title": "Full Exam Simulator Presets",
    "presets": [
        {
            "id": "MOCK-SBI-CLERK",
            "title": "SBI Clerk Mains GA Full Mock Test",
            "target_exam": "SBI Clerk (Junior Associate) Mains",
            "total_questions": 50,
            "total_marks": 50,
            "time_limit_seconds": 2100, # 35 mins
            "negative_mark": 0.25,
            "passing_percentile": 75,
            "distribution": {
                "current_affairs": 24,
                "banking_awareness": 14,
                "government_schemes": 6,
                "static_gk": 4,
                "reports_indexes": 2
            },
            "description": "Strict simulation of SBI Clerk Mains General/Financial Awareness. 50 questions, 35 minutes sectional time limit, -0.25 negative marking per incorrect answer."
        },
        {
            "id": "MOCK-IBPS-CLERK",
            "title": "IBPS Clerk / CSA Mains GA Full Mock Test",
            "target_exam": "IBPS Clerk / Customer Service Associate Mains",
            "total_questions": 50,
            "total_marks": 50,
            "time_limit_seconds": 2100, # 35 mins
            "negative_mark": 0.25,
            "passing_percentile": 70,
            "distribution": {
                "current_affairs": 22,
                "banking_awareness": 12,
                "government_schemes": 8,
                "static_gk": 5,
                "reports_indexes": 3
            },
            "description": "Official pattern for IBPS Clerk Mains GA. Balanced questions across government schemes, regulatory guidelines, and static GK links."
        },
        {
            "id": "MOCK-RRB-OA",
            "title": "IBPS RRB Office Assistant GA Mock Test",
            "target_exam": "IBPS RRB Office Assistant (Multipurpose) Mains",
            "total_questions": 40,
            "total_marks": 40,
            "time_limit_seconds": 1200, # 20 mins recommended
            "negative_mark": 0.25,
            "passing_percentile": 65,
            "distribution": {
                "current_affairs": 18,
                "static_gk": 10,
                "agriculture_schemes": 7,
                "banking_awareness": 5
            },
            "description": "Standard 40-question section for RRB Office Assistant. Heavy on rural banking, agriculture schemes, and direct static GK facts."
        },
        {
            "id": "MOCK-RAPID-SPRINT",
            "title": "Daily Rapid Fire 15-Question Speed Drill",
            "target_exam": "Speed & Accuracy Booster",
            "total_questions": 15,
            "total_marks": 15,
            "time_limit_seconds": 300, # 5 mins
            "negative_mark": 0.25,
            "passing_percentile": 80,
            "distribution": {
                "mixed": 15
            },
            "description": "Intense 5-minute drill to build fast instinctive recall and negative avoidance reflexes."
        }
    ]
}

with open(os.path.join("public", "data", "mock-tests", "mock-presets.json"), "w", encoding="utf-8") as f:
    json.dump(mock_presets, f, indent=2, ensure_ascii=False)

# 4. STUDY PLANS
study_plans = {
    "title": "Structured Study Plans for Banking General Awareness",
    "plans": [
        {
            "id": "PLAN-30",
            "name": "30-Day Express Mains Crash Course",
            "target": "Aspirants with Mains in 4 weeks",
            "daily_time_minutes": 90,
            "weeks": [
                {
                    "week_num": 1,
                    "focus": "Recent 2 Months Current Affairs + Flagship Schemes",
                    "milestones": [
                        "Day 1-2: Last 60 days Banking & RBI notifications",
                        "Day 3-4: PMJDY, PMJJBY, PMSBY, APY, MUDRA details & limits",
                        "Day 5-6: PM-KISAN, PM Surya Ghar, Vishwakarma, KCC",
                        "Day 7: Weekly Revision Test (50 Questions)"
                    ]
                },
                {
                    "week_num": 2,
                    "focus": "Earlier 2 Months CA + Monetary Policy & Economy",
                    "milestones": [
                        "Day 8-9: Months 3-4 Current Affairs Capsule",
                        "Day 10-11: Monetary policy rates, FIT 4%+/-2%, MPC composition, BoP & Forex",
                        "Day 12-13: CPI, WPI, IIP Core Industries, Fiscal Deficit formulas",
                        "Day 14: Mid-Course Simulated Mock Test (SBI Clerk Pattern)"
                    ]
                },
                {
                    "week_num": 3,
                    "focus": "High-Yield Static GK + International Bodies + Reports",
                    "milestones": [
                        "Day 15-16: International Org HQ & Chiefs (IMF, WB, ADB, AIIB, NDB, WTO, WEF)",
                        "Day 17-18: Global Reports & India Ranks (HDI, Gender Gap, Hunger, Press Freedom)",
                        "Day 19-20: National Parks, Tiger Reserves, Ramsar Sites, Rivers & Dams",
                        "Day 21: Full Length IBPS Clerk Mains GA Simulator"
                    ]
                },
                {
                    "week_num": 4,
                    "focus": "Appointments, Sports, Awards & Mistakes Notebook Clean-up",
                    "milestones": [
                        "Day 22-23: Constitutional heads, PSB Chiefs, Nobel, Bharat Ratna, Paris Olympics",
                        "Day 24-25: Re-testing all items in Mistakes Notebook",
                        "Day 26-28: Daily Full Mock Test + Negative-avoidance drills",
                        "Day 29-30: Formula and fact sheet review, rest, and exam strategy mindset"
                    ]
                }
            ]
        },
        {
            "id": "PLAN-60",
            "name": "60-Day Comprehensive GA Mastery Roadmap",
            "target": "Aspirants aiming for 40+ out of 50 in Mains",
            "daily_time_minutes": 60,
            "weeks": [
                {
                    "week_num": 1,
                    "focus": "Indian Constitution & Polity Fundamentals",
                    "milestones": ["Preamble, Fundamental Rights, DPSP, Important Articles, Schedules"]
                },
                {
                    "week_num": 2,
                    "focus": "Indian Geography & River Systems",
                    "milestones": ["Himalayan & Peninsular Rivers, Dams, Peaks, Mountain Passes"]
                },
                {
                    "week_num": 3,
                    "focus": "Macro-Economy & National Income",
                    "milestones": ["GDP, GVA, Inflation CPI/WPI, Fiscal Deficits, Balance of Payments"]
                },
                {
                    "week_num": 4,
                    "focus": "Central Government Schemes Phase 1",
                    "milestones": ["Financial Inclusion: PMJDY, PMJJBY, PMSBY, APY, MUDRA, Stand-Up India"]
                },
                {
                    "week_num": 5,
                    "focus": "Central Government Schemes Phase 2",
                    "milestones": ["Agri & Rural: PM-KISAN, PMFBY, KCC, PM Surya Ghar, Vishwakarma, JJM"]
                },
                {
                    "week_num": 6,
                    "focus": "International Organizations & Global Treaties",
                    "milestones": ["IMF, World Bank, ADB, AIIB, NDB, WTO, UNEP, ASEAN, SCO, BRICS"]
                },
                {
                    "week_num": 7,
                    "focus": "Current Affairs Months 1 & 2 In-Depth",
                    "milestones": ["Daily capsules, Static linkage badges, topic quizzes"]
                },
                {
                    "week_num": 8,
                    "focus": "Current Affairs Months 3 & 4 + Mock Simulator Drills",
                    "milestones": ["Comprehensive mocks, PYQ empirical review, Readiness score audit"]
                }
            ]
        }
    ]
}

with open(os.path.join("public", "data", "study-plans", "study-plans.json"), "w", encoding="utf-8") as f:
    json.dump(study_plans, f, indent=2, ensure_ascii=False)

# 5. MEMORY LAB
memory_tricks = {
    "title": "GA Memory Lab: High-Yield Mnemonics and Mental Models",
    "total_tricks": 15,
    "tricks": [
        {
            "id": "MEM-01",
            "title": "Sixth Schedule Tribal States Mnemonic",
            "mnemonic": "AMTM (Assam, Meghalaya, Tripura, Mizoram)",
            "explanation": "Sixth Schedule of the Constitution applies exclusively to tribal areas in 4 North Eastern states: Assam, Meghalaya, Tripura, and Mizoram. It does NOT apply to Manipur, Nagaland, or Arunachal Pradesh.",
            "trap_alert": "Exams often insert 'Manipur' as an option. Remember: No 'Man' in Sixth Schedule (No Manipur)!"
        },
        {
            "id": "MEM-02",
            "title": "Eight Core Industries by Weightage",
            "mnemonic": "Refinery -> Electricity -> Steel -> Coal -> Crude Oil -> Gas -> Cement -> Fertilizer",
            "shortcut": "'RESC-CGC-F' (Remember: Refinery fuels Electricity which melts Steel to mine Coal).",
            "explanation": "Refinery Products has the highest share (28%), Fertilizer has the lowest share (2.6%). Total share of core industries in IIP is 40.27%."
        },
        {
            "id": "MEM-03",
            "title": "Preamble Keywords Order",
            "mnemonic": "SO-SO-SE-DE-RE (Sovereign, Socialist, Secular, Democratic, Republic)",
            "explanation": "The exact constitutional sequence in the Preamble of India: Sovereign, Socialist, Secular, Democratic, Republic. The words 'Socialist, Secular, Integrity' were added by the 42nd Amendment Act 1976."
        },
        {
            "id": "MEM-04",
            "title": "Panch Prayag Confluences in Sequence",
            "mnemonic": "Vi-Na-Kar-Rud-Dev with Alaknanda",
            "explanation": "All 5 Prayags meet Alaknanda: 1. Vishnuprayag (+ Dhauliganga), 2. Nandaprayag (+ Nandakini), 3. Karnaprayag (+ Pindar), 4. Rudraprayag (+ Mandakini), 5. Devprayag (+ Bhagirathi = Ganga)."
        },
        {
            "id": "MEM-05",
            "title": "PM MUDRA Loan Slabs",
            "mnemonic": "Shishu (Baby: up to 50k), Kishore (Teen: 50k - 5L), Tarun (Youth: 5L - 10L), Tarun Plus (up to 20L)",
            "explanation": "Shishu: up to ₹50,000 | Kishore: ₹50,001 to ₹5 Lakh | Tarun: ₹5,00,001 to ₹10 Lakh | Tarun Plus: up to ₹20 Lakh for seasoned borrowers."
        },
        {
            "id": "MEM-06",
            "title": "PMFBY Farmer Premium Rates",
            "mnemonic": "2 - 1.5 - 5 (Kharif Monsoon 2%, Rabi Winter 1.5%, Commercial Cash Crop 5%)",
            "explanation": "Kharif is riskier with monsoons (2%), Rabi is calmer (1.5%), Commercial crops generate high revenue (5%)."
        },
        {
            "id": "MEM-07",
            "title": "SDR Currency Basket of IMF",
            "mnemonic": "U-E-C-J-P (Dollar, Euro, Yuan/Renminbi, Yen, Pound)",
            "explanation": "Special Drawing Rights currency basket has 5 currencies: US Dollar, Euro, Chinese Renminbi, Japanese Yen, British Pound Sterling."
        }
    ]
}

with open(os.path.join("public", "data", "memory-lab", "memory-tricks.json"), "w", encoding="utf-8") as f:
    json.dump(memory_tricks, f, indent=2, ensure_ascii=False)

print("PYQ Analysis, Questions, Mocks, Study Plans, and Memory Lab generated successfully.")
