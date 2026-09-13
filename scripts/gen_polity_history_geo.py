import json
import os

# Create directories
os.makedirs(os.path.join("public", "data", "polity"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "history"), exist_ok=True)
os.makedirs(os.path.join("public", "data", "geography"), exist_ok=True)

# 1. INDIAN POLITY
polity_data = {
    "title": "Master Guide to Indian Polity & Constitution for Banking Exams",
    "version": "2026.09",
    "preamble_and_making": {
        "constituent_assembly": {
            "demand_first_raised": "M. N. Roy in 1934",
            "formed_under": "Cabinet Mission Plan of 1946",
            "first_meeting": "9 December 1946 (Dr. Sachchidananda Sinha as Temporary President)",
            "permanent_president": "Dr. Rajendra Prasad (elected 11 December 1946)",
            "constitutional_advisor": "Sir B. N. Rau",
            "drafting_committee_chairman": "Dr. B. R. Ambedkar (appointed 29 August 1947, 7 members)",
            "total_time_taken": "2 years, 11 months, and 18 days",
            "adoption_date": "26 November 1949 (Constitution Day / Samvidhan Divas)",
            "enforcement_date": "26 January 1950 (Celebrated as Republic Day)",
            "original_constitution": "395 Articles, 22 Parts, and 8 Schedules (Calligraphed by Prem Behari Narain Raizada, decorated by Nandalal Bose)"
        },
        "preamble": {
            "based_on": "'Objectives Resolution' moved by Jawaharlal Nehru on 13 December 1946 (adopted 22 Jan 1947)",
            "amendment": "Amended only once by the 42nd Constitutional Amendment Act, 1976 (added three words: 'SOCIALIST', 'SECULAR', and 'INTEGRITY')",
            "nature_of_state": "Sovereign, Socialist, Secular, Democratic, Republic",
            "objectives": "Justice (Social, Economic, Political), Liberty (Thought, Expression, Belief, Faith, Worship), Equality (Status and Opportunity), Fraternity (Assuring dignity of individual and unity & integrity of the Nation)",
            "key_court_rulings": [
                {"case": "Berubari Union Case (1960)", "ruling": "Preamble is NOT a part of the Constitution"},
                {"case": "Kesavananda Bharati Case (1973)", "ruling": "Preamble IS an integral part of the Constitution and can be amended under Article 368 without altering Basic Structure"},
                {"case": "LIC of India Case (1995)", "ruling": "Reaffirmed Preamble as an integral part of the Constitution"}
            ]
        },
        "sources_borrowed": [
            {"feature": "Parliamentary Government, Rule of Law, Single Citizenship, Bicameralism, Cabinet System, Prerogative Writs", "source": "United Kingdom (British Constitution)"},
            {"feature": "Fundamental Rights, Judicial Review, Independence of Judiciary, Impeachment of President, Removal of Supreme Court & High Court Judges, Preamble", "source": "United States (US Constitution)"},
            {"feature": "Directive Principles of State Policy (DPSP), Method of Election of the President, Nomination of Members to Rajya Sabha", "source": "Ireland (Irish Constitution)"},
            {"feature": "Fundamental Duties (Art 51A), Ideals of Justice (Social, Economic, Political) in Preamble", "source": "Former USSR (Soviet Constitution)"},
            {"feature": "Concurrent List, Freedom of Trade, Commerce and Intercourse, Joint Sitting of both Houses of Parliament (Art 108)", "source": "Australia (Australian Constitution)"},
            {"feature": "Suspension of Fundamental Rights during National Emergency", "source": "Weimar Constitution of Germany"},
            {"feature": "Federation with a strong Centre, Vesting of Residual Powers in Centre, Appointment of State Governors by Centre, Advisory Jurisdiction of Supreme Court (Art 143)", "source": "Canada (Canadian Constitution)"},
            {"feature": "Procedure for Amendment of Constitution (Art 368), Election of Members of Rajya Sabha", "source": "South Africa"},
            {"feature": "Procedure Established by Law", "source": "Japan"}
        ]
    },
    "articles_and_parts": [
        {"part": "Part I", "articles": "Articles 1 to 4", "subject": "The Union and its Territory", "high_yield_article": "Art 1 (India, that is Bharat, shall be a Union of States), Art 3 (Formation of new States and alteration of areas, boundaries or names of existing States by Parliament)"},
        {"part": "Part II", "articles": "Articles 5 to 11", "subject": "Citizenship", "high_yield_article": "Art 11 (Parliament to regulate the right of citizenship by law - Citizenship Act 1955)"},
        {"part": "Part III", "articles": "Articles 12 to 35", "subject": "Fundamental Rights (Magna Carta of India)", "high_yield_article": "Art 14 (Equality before Law), Art 17 (Abolition of Untouchability), Art 19 (Six Freedoms), Art 21 (Right to Life & Personal Liberty), Art 21A (Right to Elementary Education - 86th CAA 2002), Art 32 (Right to Constitutional Remedies - 'Heart and Soul of the Constitution' as per Dr. Ambedkar; 5 Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto)"},
        {"part": "Part IV", "articles": "Articles 36 to 51", "subject": "Directive Principles of State Policy (DPSP)", "high_yield_article": "Art 39A (Equal Justice & Free Legal Aid), Art 40 (Organisation of Village Panchayats), Art 44 (Uniform Civil Code - UCC), Art 45 (Early childhood care & education), Art 48A (Protection of environment, forests and wildlife), Art 50 (Separation of Judiciary from Executive), Art 51 (Promotion of international peace and security)"},
        {"part": "Part IV-A", "articles": "Article 51A", "subject": "Fundamental Duties", "high_yield_article": "Added by 42nd CAA 1976 on recommendation of Swaran Singh Committee (initially 10 duties; 11th duty added by 86th CAA 2002 for parent/guardian to provide education to child aged 6-14)"},
        {"part": "Part V", "articles": "Articles 52 to 151", "subject": "The Union Government", "high_yield_article": "Art 52 (President of India), Art 61 (Procedure for Impeachment of President), Art 72 (Pardoning Power of President), Art 76 (Attorney General for India), Art 108 (Joint Sitting of Parliament summoned by President, presided by Lok Sabha Speaker), Art 110 (Money Bill - certified by Speaker), Art 112 (Annual Financial Statement / Union Budget), Art 123 (Ordinance Making Power of President), Art 124 (Supreme Court), Art 143 (Advisory Jurisdiction of SC), Art 148 (Comptroller and Auditor General of India - CAG)"},
        {"part": "Part VI", "articles": "Articles 152 to 237", "subject": "The State Governments", "high_yield_article": "Art 153 (Governors of States), Art 161 (Pardoning Power of Governor), Art 165 (Advocate General for the State), Art 213 (Ordinance Making Power of Governor), Art 214 (High Courts for States), Art 226 (Power of High Courts to issue Writs - broader scope than Art 32)"},
        {"part": "Part IX & IX-A", "articles": "Articles 243 to 243ZG", "subject": "Panchayats and Municipalities", "high_yield_article": "73rd CAA 1992 (11th Schedule, 29 subjects for Panchayats) and 74th CAA 1992 (12th Schedule, 18 subjects for Municipalities)"},
        {"part": "Part XII", "articles": "Articles 264 to 300A", "subject": "Finance, Property, Contracts and Suits", "high_yield_article": "Art 266 (Consolidated Fund & Public Account of India), Art 267 (Contingency Fund of India held by Secretary, Dept of Economic Affairs on behalf of President), Art 279A (Goods and Services Tax Council - 101st CAA 2016), Art 280 (Finance Commission appointed by President every 5 years), Art 300A (Right to Property - legal right after 44th CAA 1978 deleted it from Fundamental Rights Art 31)"},
        {"part": "Part XIV", "articles": "Articles 308 to 323", "subject": "Services under Union & States", "high_yield_article": "Art 312 (All-India Services created by Rajya Sabha resolution), Art 315 (Union and State Public Service Commissions)"},
        {"part": "Part XV", "articles": "Articles 324 to 329", "subject": "Elections", "high_yield_article": "Art 324 (Superintendence, direction and control of elections vested in Election Commission of India), Art 326 (Elections on basis of Adult Suffrage - voting age 18 years via 61st CAA 1988)"},
        {"part": "Part XVIII", "articles": "Articles 352 to 360", "subject": "Emergency Provisions", "high_yield_article": "Art 352 (National Emergency on grounds of War, External Aggression, or Armed Rebellion), Art 356 (President's Rule / State Emergency due to failure of constitutional machinery), Art 360 (Financial Emergency - never declared in India till date)"},
        {"part": "Part XX", "articles": "Article 368", "subject": "Amendment of the Constitution", "high_yield_article": "Power of Parliament to amend the Constitution and procedure therefor (By Simple Majority, Special Majority, or Special Majority with ratification by at least half of State Legislatures)"}
    ],
    "twelve_schedules": [
        {"schedule": "First Schedule", "provisions": "Names of the States and Union Territories and their territorial extent (28 States and 8 UTs)"},
        {"schedule": "Second Schedule", "provisions": "Salaries, allowances, and emoluments of President, Governors, Speaker/Deputy Speaker, Judges of SC/HC, and CAG"},
        {"schedule": "Third Schedule", "provisions": "Forms of Oaths and Affirmations for Union Ministers, MPs, Judges, and CAG"},
        {"schedule": "Fourth Schedule", "provisions": "Allocation of seats in the Rajya Sabha (Council of States) to States and UTs (UP has maximum 31 seats)"},
        {"schedule": "Fifth Schedule", "provisions": "Administration and control of Scheduled Areas and Scheduled Tribes"},
        {"schedule": "Sixth Schedule", "provisions": "Administration of Tribal Areas in 4 North-Eastern States: Assam, Meghalaya, Tripura, and Mizoram (Mnemonic: AMTM)"},
        {"schedule": "Seventh Schedule", "provisions": "Division of powers between Union and States in 3 Lists: Union List (100 subjects), State List (61 subjects), Concurrent List (52 subjects)"},
        {"schedule": "Eighth Schedule", "provisions": "22 Recognized Official Languages of India (Original: 14; Added: Sindhi by 21st CAA 1967; Konkani, Manipuri, Nepali by 71st CAA 1992; Bodo, Dogri, Maithili, Santhali by 92nd CAA 2003)"},
        {"schedule": "Ninth Schedule", "provisions": "Validation of certain Acts and Regulations beyond judicial review (added by 1st CAA 1951; subject to basic structure review post-1973 per I.R. Coelho case)"},
        {"schedule": "Tenth Schedule", "provisions": "Anti-Defection Law (Disqualification of MPs/MLAs on ground of defection; added by 52nd CAA 1985; amended by 91st CAA 2003)"},
        {"schedule": "Eleventh Schedule", "provisions": "Panchayati Raj functional subjects (29 subjects; added by 73rd CAA 1992)"},
        {"schedule": "Twelfth Schedule", "provisions": "Municipalities functional subjects (18 subjects; added by 74th CAA 1992)"}
    ],
    "constitutional_bodies": [
        {"body": "Election Commission of India (ECI)", "article": "Article 324", "composition": "1 Chief Election Commissioner (CEC) and 2 Election Commissioners appointed by President for 6 years or up to 65 years of age", "role": "Conducts elections for President, Vice-President, Parliament, and State Legislatures"},
        {"body": "Comptroller and Auditor General of India (CAG)", "article": "Article 148", "composition": "Appointed by President for 6 years or up to 65 years of age. Known as 'Guardian of the Public Purse' and 'Friend, Philosopher and Guide' of Public Accounts Committee (PAC)", "role": "Audits accounts of Union, States, and public sector undertakings"},
        {"body": "Finance Commission of India", "article": "Article 280", "composition": "Chairman and 4 other members appointed by President every 5 years (16th Finance Commission headed by Dr. Arvind Panagariya)", "role": "Recommends devolution of net proceeds of taxes between Union and States"},
        {"body": "Attorney General for India", "article": "Article 76", "composition": "Appointed by President; holds office during pleasure of President. Highest Law Officer of the country", "role": "Right of audience in all courts in India; right to speak in both Houses of Parliament but without right to vote (Art 88)"},
        {"body": "Union Public Service Commission (UPSC)", "article": "Article 315 to 323", "composition": "Chairman and members appointed by President for 6 years or up to 65 years of age", "role": "Conducts examinations for recruitment to All-India and Central Civil Services"},
        {"body": "Goods and Services Tax Council (GST Council)", "article": "Article 279A", "composition": "Chaired by Union Finance Minister; Members: Union Minister of State in charge of Revenue/Finance and State Finance Ministers", "role": "Makes recommendations on GST tax slabs, exemptions, model laws, and threshold limits"}
    ]
}

with open(os.path.join("public", "data", "polity", "indian-polity.json"), "w", encoding="utf-8") as f:
    json.dump(polity_data, f, indent=2, ensure_ascii=False)

# 2. INDIAN HISTORY
history_data = {
    "title": "Master Guide to Indian History for Banking & Competitive Exams",
    "version": "2026.09",
    "ancient_india": [
        {
            "period": "Indus Valley Civilization (2500 BCE - 1750 BCE)",
            "key_sites": [
                {"site": "Harappa", "location": "Montgomery, Punjab (Pakistan) on Ravi River", "excavated_by": "Daya Ram Sahni (1921)", "findings": "Six granaries in a row, graveyard R-37, stone dancing Nataraja"},
                {"site": "Mohenjo-daro", "location": "Larkana, Sindh (Pakistan) on Indus River", "excavated_by": "R. D. Banerjee (1922)", "findings": "Great Bath, Great Granary, Bronze Dancing Girl, Bearded Priest, Pashupati Seal"},
                {"site": "Lothal", "location": "Ahmedabad, Gujarat on Bhogava River", "excavated_by": "S. R. Rao (1954)", "findings": "World's earliest artificial tidal dockyard, rice husk, terracotta model of ship, double burial"},
                {"site": "Kalibangan", "location": "Hanumangarh, Rajasthan on Ghaggar River", "excavated_by": "A. Ghosh (1953)", "findings": "Ploughed agricultural field surface, fire altars, camel bones, wooden furrow"},
                {"site": "Dholavira", "location": "Rann of Kutch, Gujarat", "excavated_by": "J. P. Joshi & R. S. Bisht", "findings": "UNESCO World Heritage Site (40th from India), unique water management & cascade reservoirs, city divided into three parts (Citadel, Middle town, Lower town)"},
                {"site": "Rakhigarhi", "location": "Hisar, Haryana", "findings": "Largest Indus Valley site in the Indian subcontinent"}
            ]
        },
        {
            "period": "Buddhism & Jainism (6th Century BCE)",
            "buddhism": {
                "founder": "Gautama Buddha (Siddhartha), born 563 BCE at Lumbini (Nepal), Sakya clan",
                "milestones": "Enlightenment (Nirvana) at Bodh Gaya under Bodhi tree (Peepal) on banks of Niranjana River at age 35; First Sermon (Dharmachakrapravartana) at Sarnath (Deer Park); Mahaparinirvana at Kushinagar at age 80",
                "four_councils": [
                    {"council": "First Buddhist Council (483 BCE)", "venue": "Sattapanni Cave, Rajgir", "patron": "Ajatashatru (Haryanka Dynasty)", "president": "Mahakassapa", "outcome": "Compilation of Sutta Pitaka (by Ananda) and Vinaya Pitaka (by Upali)"},
                    {"council": "Second Buddhist Council (383 BCE)", "venue": "Vaishali", "patron": "Kalasoka (Shishunaga Dynasty)", "president": "Sabbakami", "outcome": "First schism into Sthaviravadins and Mahasanghikas"},
                    {"council": "Third Buddhist Council (250 BCE)", "venue": "Pataliputra", "patron": "Ashoka (Mauryan Dynasty)", "president": "Moggaliputta Tissa", "outcome": "Compilation of Abhidhamma Pitaka; decision to dispatch Buddhist missionaries abroad"},
                    {"council": "Fourth Buddhist Council (72 CE)", "venue": "Kundalvana, Kashmir", "patron": "Kanishka (Kushan Dynasty)", "president": "Vasumitra (Vice-President: Ashvaghosha)", "outcome": "Formal split of Buddhism into Hinayana (Theravada) and Mahayana"}
                ]
            },
            "jainism": {
                "founder": "Rishabhanatha (Adinatha) was 1st Tirthankara (Symbol: Bull). 23rd Tirthankara was Parshvanatha (Symbol: Serpent). 24th Tirthankara was Vardhamana Mahavira (Symbol: Lion)",
                "mahavira": "Born at Kundagrama near Vaishali (540 BCE), Jnatrika clan; Kaivalya (supreme omniscience) under Sal tree at Jimbhikagrama on banks of Rijupalika River; Parinirvana at Pavapuri (near Nalanda)",
                "triratnas": "Samyak Darshana (Right Faith), Samyak Jnana (Right Knowledge), Samyak Charitra (Right Conduct)",
                "councils": [
                    {"council": "First Jain Council (300 BCE)", "venue": "Pataliputra", "president": "Sthulabhadra", "outcome": "Compilation of 12 Angas; split into Digambaras (sky-clad, led by Bhadrabahu) and Svetambaras (white-clad, led by Sthulabhadra)"},
                    {"council": "Second Jain Council (512 CE)", "venue": "Vallabhi (Gujarat)", "president": "Devardhi Kshamasramana", "outcome": "Final written compilation of Jain agamas"}
                ]
            }
        },
        {
            "period": "Mauryan Empire (322 BCE - 185 BCE)",
            "rulers": [
                {"ruler": "Chandragupta Maurya (322-298 BCE)", "notes": "Founded empire by overthrowing Dhanananda (Nanda dynasty) with guidance of Chanakya (Kautilya). Defeated Seleucus I Nicator (305 BCE); Megasthenes came to court and wrote 'Indica'. Embraced Jainism and fasted to death (Sallekhana) at Shravanabelagola with Bhadrabahu."},
                {"ruler": "Bindusara (298-273 BCE)", "notes": "Known to Greeks as 'Amitrochates' (Slayer of foes). Patronized the Ajivika sect."},
                {"ruler": "Ashoka the Great (268-232 BCE)", "notes": "Kalinga War in 261 BCE (9th year of his reign, described in Major Rock Edict XIII) led to renunciation of war (Bherighosha to Dhammaghosha). Embraced Buddhism influenced by Upagupta. Lion Capital at Sarnath adopted as India's National Emblem. Inscriptions deciphered by James Prinsep in 1837."}
            ]
        },
        {
            "period": "Gupta Empire - The Golden Age (319 CE - 550 CE)",
            "rulers": [
                {"ruler": "Chandragupta I (319-335 CE)", "notes": "Adopted title 'Maharajadhiraja'. Started the Gupta Era in 319-320 CE. Married Licchavi princess Kumaradevi."},
                {"ruler": "Samudragupta (335-375 CE)", "notes": "Termed the 'Napoleon of India' by historian V. A. Smith for his military conquests. Prayag Prashasti (Allahabad Pillar Inscription) composed by his court poet Harishena in Sanskrit. Depicted on coins playing Veena (Kaviraja title)."},
                {"ruler": "Chandragupta II Vikramaditya (375-415 CE)", "notes": "Defeated Saka rulers of Western India. Chinese pilgrim Fa-Hien visited during his reign. Court adorned by 'Navratnas' (Nine Gems) including Kalidasa (Abhijnanasakuntalam, Meghaduta), Amarasimha, Varahamihira, Dhanvantari, and Aryabhata (astronomer who wrote Aryabhatiya, calculated value of pi, explained solar/lunar eclipses)."},
                {"ruler": "Kumaragupta I (415-455 CE)", "notes": "Founded the world-famous Nalanda University in Bihar."}
            ]
        }
    ],
    "medieval_india": [
        {
            "period": "Delhi Sultanate (1206 - 1526 CE)",
            "five_dynasties": [
                {"dynasty": "Slave / Mamluk Dynasty (1206-1290)", "founder": "Qutb-ud-din Aibak (Lakh Baksh). Built Quwwat-ul-Islam mosque and began Qutub Minar. Iltutmish organized 'Turkan-i-Chahalgani' (The Forty) and completed Qutub Minar. Razia Sultan (1236-1240) was the first and only woman ruler of Delhi Sultanate. Ghiyasuddin Balban introduced 'Sijdah' and 'Paibos' and blood-and-iron policy."},
                {"dynasty": "Khilji Dynasty (1290-1320)", "founder": "Jalal-ud-din Khilji. Ala-ud-din Khilji introduced market control system, Dag (branding of horses) and Chehra (descriptive roll of soldiers), and built Alai Darwaza. General Malik Kafur led southern campaigns."},
                {"dynasty": "Tughlaq Dynasty (1320-1414)", "founder": "Ghiyas-ud-din Tughlaq. Muhammad bin Tughlaq ('Wise Fool') shifted capital from Delhi to Daulatabad (Devagiri) and issued token copper/brass currency. Moroccan traveler Ibn Battuta visited (wrote 'Rihla'). Firoz Shah Tughlaq built extensive irrigation canals, established Diwan-i-Khairat and cities like Hissar, Firozabad, Jaunpur."},
                {"dynasty": "Sayyid Dynasty (1414-1451)", "founder": "Khizr Khan (governor appointed by Timur who sacked Delhi in 1398)."},
                {"dynasty": "Lodi Dynasty (1451-1526)", "founder": "Bahlul Lodi (first Afghan dynasty in India). Sikandar Lodi founded Agra in 1504 and introduced 'Gaj-i-Sikandari'. Ibrahim Lodi was defeated by Babur in the First Battle of Panipat (21 April 1526), ending the Sultanate."}
            ]
        },
        {
            "period": "Mughal Empire (1526 - 1857 CE)",
            "key_rulers": [
                {"ruler": "Babur (1526-1530)", "battles": "First Battle of Panipat (1526 - defeated Ibrahim Lodi with artillery and Tulghuma tactics), Battle of Khanwa (1527 - defeated Rana Sanga of Mewar; took title 'Ghazi'), Battle of Chanderi (1528 - defeated Medini Rai), Battle of Ghaghra (1529 - defeated Afghans). Autobiography: Tuzuk-i-Baburi (Baburnama) in Chagatai Turkish."},
                {"ruler": "Humayun & Sher Shah Suri", "notes": "Sher Shah Suri defeated Humayun at Battle of Chausa (1539) and Battle of Kannauj/Bilgram (1540). Sher Shah introduced the silver 'Rupiya' (origin of Rupee), built the Grand Trunk (GT) Road from Sonargaon to Peshawar, and constructed Purana Qila in Delhi. Tomb at Sasaram, Bihar."},
                {"ruler": "Akbar the Great (1556-1605)", "notes": "Crown crowned at Kalanaur (Punjab) at age 13 under regent Bairam Khan. Defeated Hemu at Second Battle of Panipat (1556). Abolished pilgrimage tax (1563) and Jizya (1564). Battle of Haldighati (1576) against Maharana Pratap led by Man Singh. Introduced Mansabdari system and Zabti/Bandobast revenue system (Raja Todar Mal). Founded Ibadat Khana (1575) and Din-i-Ilahi (1582). Built Fatehpur Sikri, Buland Darwaza (commemorating Gujarat conquest). Court historian Abul Fazl wrote 'Akbarnama' and 'Ain-i-Akbari'."},
                {"ruler": "Shah Jahan (1628-1658)", "notes": "Golden Age of Mughal Architecture. Built Taj Mahal (Agra, architect Ustad Ahmad Lahori), Red Fort (Delhi), Jama Masjid, and Peacock Throne (Takht-i-Taus, later looted by Nadir Shah of Persia in 1739)."},
                {"ruler": "Aurangzeb (Alamgir) (1658-1707)", "notes": "Re-imposed Jizya (1679). Executed 9th Sikh Guru, Guru Tegh Bahadur (1675). Built Bibi Ka Maqbara at Aurangabad. Long Deccan campaign drained empire."}
            ]
        }
    ],
    "modern_india": [
        {
            "phase": "British Expansion & 1857 Revolt",
            "battles": [
                {"battle": "Battle of Plassey (23 June 1757)", "significance": "Robert Clive defeated Nawab Siraj-ud-Daulah of Bengal (due to treachery of Mir Jafar). Established British political foothold in Bengal."},
                {"battle": "Battle of Buxar (22 October 1764)", "significance": "Hector Munro defeated combined armies of Mir Qasim (Bengal), Shuja-ud-Daula (Awadh), and Mughal Emperor Shah Alam II. Resulted in Treaty of Allahabad (1765) granting British East India Company the Diwani rights (revenue collection) of Bengal, Bihar, and Orissa."}
            ],
            "revolt_of_1857": {
                "spark": "29 March 1857 at Barrackpore: Mangal Pandey (34th Bengal Native Infantry) fired at British officers over greased Enfield rifle cartridges (rumored to contain cow and pig fat).",
                "outbreak": "10 May 1857 at Meerut; soldiers marched to Delhi and proclaimed Mughal Emperor Bahadur Shah II (Zafar) as Shahenshah-e-Hindustan.",
                "centers_and_leaders": [
                    {"center": "Delhi", "leader": "General Bakht Khan & Bahadur Shah Zafar", "british_suppressor": "John Nicholson & Hudson"},
                    {"center": "Kanpur", "leader": "Nana Saheb (Dhondu Pant), Tantia Tope, Azimullah Khan", "british_suppressor": "Colin Campbell"},
                    {"center": "Lucknow", "leader": "Begum Hazrat Mahal & Birjis Qadr", "british_suppressor": "Colin Campbell"},
                    {"center": "Jhansi", "leader": "Rani Lakshmibai (Manikarnika)", "british_suppressor": "Sir Hugh Rose (remarked she was 'the only man among the rebels')"},
                    {"center": "Bihar (Arrah/Jagdishpur)", "leader": "Kunwar Singh (80-year-old zamindar) & Amar Singh", "british_suppressor": "William Taylor & Vincent Eyre"},
                    {"center": "Faizabad", "leader": "Maulvi Ahmadullah", "british_suppressor": "Colin Campbell"}
                ],
                "aftermath": "Government of India Act 1858 passed; East India Company rule abolished; British Crown assumed direct administration; Governor-General of India designated as Viceroy of India (Lord Canning became first Viceroy); Queen Victoria's Proclamation of 1 November 1858 read at Allahabad."
            }
        },
        {
            "phase": "Indian National Congress & National Movement",
            "inc_founding": "Formed on 28 December 1885 at Gokuldas Tejpal Sanskrit College, Bombay by retired civil servant Allan Octavian (A. O.) Hume. First President: Womesh Chandra (W. C.) Bonnerjee, attended by 72 delegates. Viceroy at the time: Lord Dufferin.",
            "key_inc_sessions": [
                {"year": 1896, "place": "Calcutta", "president": "Rahimtulla M. Sayani", "importance": "National Song 'Vande Mataram' (composed by Bankim Chandra Chattopadhyay in novel Anandamath) sung for first time"},
                {"year": 1906, "place": "Calcutta", "president": "Dadabhai Naoroji ('Grand Old Man of India')", "importance": "The word 'Swaraj' was used for the first time from Congress platform"},
                {"year": 1907, "place": "Surat", "president": "Rash Behari Ghosh", "importance": "Surat Split between Moderates (Gokhale) and Extremists (Lal-Bal-Pal: Lala Lajpat Rai, Bal Gangadhar Tilak, Bipin Chandra Pal)"},
                {"year": 1911, "place": "Calcutta", "president": "Bishan Narayan Dar", "importance": "National Anthem 'Jana Gana Mana' (composed by Rabindranath Tagore) sung for first time"},
                {"year": 1916, "place": "Lucknow", "president": "Ambica Charan Mazumdar", "importance": "Lucknow Pact between Moderates and Extremists reunited; joint agreement between INC and Muslim League"},
                {"year": 1917, "place": "Calcutta", "president": "Annie Besant", "importance": "First woman President of Indian National Congress"},
                {"year": 1924, "place": "Belgaum (Karnataka)", "president": "Mahatma Gandhi", "importance": "The ONLY session presided over by Mahatma Gandhi"},
                {"year": 1925, "place": "Kanpur", "president": "Sarojini Naidu ('Nightingale of India')", "importance": "First Indian woman President of Indian National Congress"},
                {"year": 1929, "place": "Lahore", "president": "Jawaharlal Nehru", "importance": "Passed the historic 'Purna Swaraj' (Complete Independence) resolution. Decided to celebrate 26 January 1930 as Independence Day"},
                {"year": 1931, "place": "Karachi", "president": "Sardar Vallabhbhai Patel", "importance": "Endorsed Gandhi-Irwin Pact; passed resolutions on Fundamental Rights and National Economic Programme"},
                {"year": 1938, "place": "Haripura", "president": "Subhas Chandra Bose", "importance": "National Planning Committee formed under chairmanship of Jawaharlal Nehru"},
                {"year": 1939, "place": "Tripuri", "president": "Subhas Chandra Bose", "importance": "Bose defeated Pattabhi Sitaramayya (Gandhi's nominee); resigned due to differences and founded All India Forward Bloc (1939)"}
            ],
            "gandhian_movements": [
                {"movement": "Champaran Satyagraha (1917)", "location": "Bihar", "cause": "First Civil Disobedience movement by Gandhi in India against the exploitative Tinkathia system (compulsory cultivation of indigo on 3/20th of land). Invited by Rajkumar Shukla."},
                {"movement": "Ahmedabad Mill Strike (1918)", "location": "Gujarat", "cause": "First hunger strike by Gandhi over dispute between mill owners and workers demanding 35% plague bonus hike."},
                {"movement": "Kheda Satyagraha (1918)", "location": "Gujarat", "cause": "First Non-Cooperation movement over revenue remission due to crop failure; supported by Sardar Vallabhbhai Patel."},
                {"movement": "Rowlatt Act Satyagraha & Jallianwala Bagh Massacre (1919)", "location": "Amritsar, Punjab", "cause": "Rowlatt Act ('No Dalil, No Vakil, No Appeal') allowed detention without trial. On Baisakhi Day (13 April 1919), General Dyer ordered troops to fire on unarmed gathering protesting arrest of Dr. Saifuddin Kitchlew and Dr. Satyapal at Jallianwala Bagh. Rabindranath Tagore renounced his Knighthood; Hunter Commission appointed."},
                {"movement": "Non-Cooperation Movement (1920-1922)", "cause": "Launched along with Khilafat Movement (Ali Brothers: Shaukat Ali & Mohammad Ali). Boycott of foreign cloth, courts, and government schools. Called off by Gandhi on 12 February 1922 following the violent Chauri Chaura incident (Gorakhpur, UP on 4 February 1922 where 22 policemen were burnt inside a police station)."},
                {"movement": "Civil Disobedience Movement & Dandi March (1930-1934)", "cause": "Started on 12 March 1930 from Sabarmati Ashram with 78 chosen followers, covering 240 miles (385 km) to Dandi seashore on 6 April 1930 to break the Salt Law. Led to Round Table Conferences in London (Gandhi attended only the Second Round Table Conference 1931). Signed Gandhi-Irwin Pact on 5 March 1931."},
                {"movement": "Poona Pact (24 September 1932)", "cause": "Signed between Dr. B. R. Ambedkar and Mahatma Gandhi (represented by Madan Mohan Malaviya at Yerwada Jail, Pune) against British PM Ramsay MacDonald's Communal Award. Replaced separate electorates for depressed classes with reserved seats in joint electorates."},
                {"movement": "Quit India Movement (August Kranti 1942)", "cause": "Launched at Gowalia Tank Maidan (August Kranti Maidan), Bombay on 8 August 1942 following failure of Cripps Mission. Gandhi gave the clarion call: 'DO OR DIE' (Karo ya Maro). Aruna Asaf Ali hoisted the national flag. Underground radio operated by Usha Mehta."}
            ]
        }
    ]
}

with open(os.path.join("public", "data", "history", "indian-history.json"), "w", encoding="utf-8") as f:
    json.dump(history_data, f, indent=2, ensure_ascii=False)

# 3. INDIAN GEOGRAPHY
geo_data = {
    "title": "Master Guide to Indian Geography for Banking & Competitive Exams",
    "version": "2026.09",
    "river_systems": [
        {
            "system": "The Indus River System",
            "origin": "Bokhar Chu glacier near Lake Manasarovar in Tibet (known as Singi Khamban / Lion's Mouth)",
            "length": "Total: 2,880 km; In India: 1,114 km",
            "tributaries": [
                {"name": "Jhelum (Vitasta)", "origin": "Verinag spring in Jammu & Kashmir; flows into Wular Lake"},
                {"name": "Chenab (Asikni)", "origin": "Chandra and Bhaga streams near Bara Lacha La pass in Himachal Pradesh (Largest tributary of Indus)"},
                {"name": "Ravi (Purushni)", "origin": "Kullu hills near Rohtang Pass in Himachal Pradesh"},
                {"name": "Beas (Vipasa)", "origin": "Beas Kund near Rohtang Pass (entirely within India, joins Sutlej at Harike)"},
                {"name": "Sutlej (Shutudri)", "origin": "Rakas Lake near Manasarovar in Tibet (known as Langqen Zangbo; enters India via Shipki La pass)"}
            ],
            "treaty": "Indus Waters Treaty (IWT) 1960 signed in Karachi by PM Jawaharlal Nehru and President Ayub Khan, brokered by World Bank. India controls Eastern rivers (Ravi, Beas, Sutlej), Pakistan controls Western rivers (Indus, Jhelum, Chenab)."
        },
        {
            "system": "The Ganga River System",
            "origin": "Originates as Bhagirathi from Gangotri Glacier (Gaumukh) in Uttarkashi, Uttarakhand. Confluence of Bhagirathi and Alaknanda at Devprayag forms the Ganga.",
            "panch_prayag": [
                {"confluence": "Vishnuprayag", "rivers": "Alaknanda + Dhauliganga"},
                {"confluence": "Nandaprayag", "rivers": "Alaknanda + Nandakini"},
                {"confluence": "Karnaprayag", "rivers": "Alaknanda + Pindar"},
                {"confluence": "Rudraprayag", "rivers": "Alaknanda + Mandakini"},
                {"confluence": "Devprayag", "rivers": "Alaknanda + Bhagirathi (Forms the GANGA)"}
            ],
            "total_length": "2,525 km (Longest river within India)",
            "tributaries": [
                {"name": "Yamuna", "type": "Right-bank tributary (Longest tributary of Ganga)", "origin": "Yamunotri Glacier on Bandarpoonch peak. Merges at Prayagraj (Triveni Sangam). Major tributaries: Chambal, Betwa, Ken, Tons"},
                {"name": "Son", "type": "Right-bank tributary", "origin": "Amarkantak Plateau in Madhya Pradesh"},
                {"name": "Ramganga", "type": "Left-bank tributary", "origin": "Garhwal hills; flows through Jim Corbett National Park"},
                {"name": "Gomti", "type": "Left-bank tributary", "origin": "Gomat Taal (Fulhar Jheel) in Pilibhit, UP (only major Ganga tributary originating in plains)"},
                {"name": "Ghaghara (Karnali)", "type": "Left-bank tributary (Largest tributary by volume of water)", "origin": "Mapchachungo Glacier in Tibet"},
                {"name": "Gandak", "type": "Left-bank tributary", "origin": "Nepal Himalayas near Dhaulagiri and Mt Everest"},
                {"name": "Kosi", "type": "Left-bank tributary ('Sorrow of Bihar' due to frequent course shifts)", "origin": "Tibet (Saptakoshi)"}
            ]
        },
        {
            "system": "The Brahmaputra River System",
            "origin": "Chemayungdung Glacier near Lake Manasarovar in Tibet (known as Tsangpo)",
            "entry_into_india": "Enters Arunachal Pradesh through Great Bend near Namcha Barwa as 'Siang' or 'Dihang'",
            "tributaries": "Subansiri (largest), Dibang, Lohit (Dhola-Sadiya / Bhupen Hazarika Bridge over Lohit is 9.15 km long), Manas, Sankosh, Teesta",
            "key_features": "Forms Majuli Island (Assam) - world's largest inhabited freshwater river island. In Bangladesh, joined by Teesta and called Jamuna; merges with Padma (Ganga) and Meghna to form Sundarbans Delta into Bay of Bengal."
        },
        {
            "system": "Peninsular River Systems",
            "east_flowing": [
                {"river": "Godavari (Dakshin Ganga / Vridha Ganga)", "length": "1,465 km (Second longest river in India and longest in Peninsular India)", "origin": "Trimbakeshwar near Nashik, Maharashtra. Tributaries: Penganga, Wainganga, Wardha, Pranhita, Indravati, Manjira"},
                {"river": "Krishna", "length": "1,400 km", "origin": "Mahabaleshwar in Western Ghats (Maharashtra). Tributaries: Tungabhadra, Koyna, Bhima, Ghataprabha, Malaprabha, Musi (Hyderabad located on Musi)"},
                {"river": "Mahanadi", "length": "851 km", "origin": "Dhamtari district in Dandakaranya, Chhattisgarh. Flows through Odisha; Hirakud Dam built across it. Tributaries: Seonath, Hasdeo, Mand, Ib, Tel"},
                {"river": "Cauvery (Kaveri)", "length": "800 km", "origin": "Talakaveri in Brahmagiri range, Kodagu (Coorg), Karnataka. Known as 'Ganga of the South'. Shivasamudram Falls (first hydro-electric station in India, 1902). Tributaries: Harangi, Hemavati, Arkavathi, Kabini, Bhavani, Amaravati"}
            ],
            "west_flowing_rift_valley": [
                {"river": "Narmada", "length": "1,312 km (Longest west-flowing river)", "origin": "Amarkantak Plateau, Anuppur, Madhya Pradesh. Flows in a rift valley between Vindhya range (north) and Satpura range (south). Dhuandhar Falls (Marble Rocks, Jabalpur). Sardar Sarovar Dam."},
                {"river": "Tapti (Tapi)", "length": "724 km (Twin/Handmaid of Narmada)", "origin": "Multai in Betul district, Madhya Pradesh. Flows through rift valley south of Satpura range into Gulf of Khambhat (Arabian Sea). Ukai Dam built on it."},
                {"river": "Mahi", "significance": "Only river in India that cuts the Tropic of Cancer twice (in MP and Gujarat)."},
                {"river": "Luni", "significance": "Inland drainage river originating near Pushkar (Aravalli range), disappears into the Rann of Kutch."}
            ]
        }
    ],
    "major_dams_and_projects": [
        {"dam": "Tehri Dam", "river": "Bhagirathi", "state": "Uttarakhand", "facts": "Highest dam in India (height: 260.5 meters). World's 4th tallest rock and earth-fill embankment dam."},
        {"dam": "Hirakud Dam", "river": "Mahanadi", "state": "Odisha", "facts": "Longest earthen dam in India and the world (total length: 25.8 km; main dam: 4.8 km). Built in 1957."},
        {"dam": "Bhakra Nangal Project", "river": "Sutlej", "state": "Himachal Pradesh & Punjab", "facts": "Second tallest gravity dam in India (height: 226 meters). Creates the Gobind Sagar reservoir."},
        {"dam": "Sardar Sarovar Dam", "river": "Narmada", "state": "Gujarat", "facts": "Terminal dam on Narmada; Statue of Unity (world's tallest statue, 182 m, dedicated to Sardar Patel) located 3.2 km downstream on Sadhu Bet island."},
        {"dam": "Nagarjuna Sagar Dam", "river": "Krishna", "state": "Andhra Pradesh & Telangana", "facts": "World's largest masonry dam built with stone masonry instead of concrete."},
        {"dam": "Idukki Arch Dam", "river": "Periyar", "state": "Kerala", "facts": "One of the highest arch dams in Asia, constructed between two granite hills (Kuravan and Kurathi)."},
        {"dam": "Mettur Dam (Stanley Reservoir)", "river": "Cauvery", "state": "Tamil Nadu", "facts": "One of the oldest multipurpose dams in India (completed 1934)."},
        {"dam": "Rihand Dam (Govind Ballabh Pant Sagar)", "river": "Rihand (tributary of Son)", "state": "Uttar Pradesh (Sonbhadra)", "facts": "Govind Ballabh Pant Sagar is the largest artificial man-made reservoir in India by surface area."}
    ],
    "peaks_and_passes": {
        "mountain_peaks": [
            {"peak": "Kanchenjunga", "elevation": "8,586 m", "location": "Sikkim (India-Nepal border)", "facts": "Highest mountain peak in India (under undisputed Indian territory). World's third highest peak. UNESCO Mixed World Heritage Site."},
            {"peak": "K2 (Godwin-Austen)", "elevation": "8,611 m", "location": "Karakoram Range (Gilgit-Baltistan, PoK)", "facts": "Second highest peak in the world."},
            {"peak": "Nanda Devi", "elevation": "7,816 m", "location": "Chamoli, Uttarakhand", "facts": "Second highest peak in India located entirely within Indian territory. Biosphere Reserve."},
            {"peak": "Anamudi", "elevation": "2,695 m", "location": "Anamalai Hills, Kerala", "facts": "Highest mountain peak in South India, Western Ghats, and Peninsular India. Known as 'Everest of South India'."},
            {"peak": "Doddabetta", "elevation": "2,637 m", "location": "Nilgiri Hills, Tamil Nadu", "facts": "Second highest peak in South India; highest point in Nilgiris at the junction of Western and Eastern Ghats."},
            {"peak": "Guru Shikhar", "elevation": "1,722 m", "location": "Aravalli Range (Mount Abu), Rajasthan", "facts": "Highest peak of the Aravalli Range (the oldest fold mountain system in India)."},
            {"peak": "Dhupgarh", "elevation": "1,350 m", "location": "Satpura Range (Pachmarhi), Madhya Pradesh", "facts": "Highest point in Madhya Pradesh and the Satpura Range."},
            {"peak": "Jindhagada Peak / Arma Konda", "elevation": "1,690 m", "location": "Eastern Ghats (Andhra Pradesh)", "facts": "Highest peak of the Eastern Ghats."}
        ],
        "mountain_passes": [
            {"pass": "Zoji La", "connects": "Srinagar with Leh / Ladakh", "range": "Great Himalayas"},
            {"pass": "Rohtang Pass", "connects": "Kullu Valley with Lahaul and Spiti, Himachal Pradesh", "facts": "Atal Tunnel (9.02 km, world's longest highway tunnel above 10,000 feet) built under Rohtang Pass"},
            {"pass": "Shipki La", "connects": "Himachal Pradesh with Tibet", "facts": "Sutlej River enters India through this pass"},
            {"pass": "Nathu La & Jelep La", "connects": "Sikkim with Lhasa (Tibet / Chumbi Valley)", "facts": "Ancient Silk Route trade pass reopened in 2006"},
            {"pass": "Lipulekh", "connects": "Pithoragarh, Uttarakhand with Tibet", "facts": "Crucial route for Kailash Mansarovar Yatra"},
            {"pass": "Bomdi La", "connects": "Arunachal Pradesh with Lhasa (Tibet)", "facts": "Gateway to Tawang Monastery"},
            {"pass": "Palghat Gap (Palakkad)", "connects": "Coimbatore (Tamil Nadu) with Palakkad (Kerala)", "facts": "Major low mountain pass in Western Ghats breaking Nilgiri and Anamalai hills"}
        ]
    }
}

with open(os.path.join("public", "data", "geography", "indian-geography.json"), "w", encoding="utf-8") as f:
    json.dump(geo_data, f, indent=2, ensure_ascii=False)

print("Polity, History, and Geography datasets generated successfully.")
