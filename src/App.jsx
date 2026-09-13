import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Globe, 
  BookOpen, 
  Layers, 
  Award, 
  BarChart2, 
  Clock, 
  AlertCircle, 
  Bookmark, 
  Download, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Compass, 
  Landmark, 
  TrendingUp,
  Target
} from 'lucide-react';

// Utilities
import { dataManager } from './utils/dataManager';

// Components
import Dashboard from './components/dashboard/Dashboard';
import DailyCurrentAffairs from './components/current-affairs/DailyCurrentAffairs';
import CurrentAffairsRepository from './components/current-affairs/CurrentAffairsRepository';
import StaticGkHub from './components/static-gk/StaticGkHub';
import PolityMaster from './components/static-gk/PolityMaster';
import HistoryTimeline from './components/static-gk/HistoryTimeline';
import GeographyExplorer from './components/static-gk/GeographyExplorer';
import EconomyMaster from './components/economy/EconomyMaster';
import SchemesExplorer from './components/schemes/SchemesExplorer';
import ReportsMatrix from './components/reports/ReportsMatrix';
import PracticeArena from './components/practice/PracticeArena';
import RapidFire from './components/practice/RapidFire';
import OneLinersMode from './components/practice/OneLinersMode';
import FlashcardDeck from './components/practice/FlashcardDeck';
import MemoryLab from './components/practice/MemoryLab';
import QuestionSelectionTrainer from './components/practice/QuestionSelectionTrainer';
import ExamSimulator from './components/mock/ExamSimulator';
import PyqAnalytics from './components/analytics/PyqAnalytics';
import RevisionMistakes from './components/tools/RevisionMistakes';
import BookmarksViewer from './components/tools/BookmarksViewer';
import StudyPlans from './components/tools/StudyPlans';
import DataBackupSync from './components/tools/DataBackupSync';
import GlobalSearchModal from './components/common/GlobalSearchModal';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [activeSubtab, setActiveSubtab] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Settings & Target Exam
  const [selectedExam, setSelectedExam] = useState('SBI_CLERK');
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('gam_dark_mode') === 'true';
  });

  // User State
  const [stats, setStats] = useState(dataManager.getStats());
  const [mistakes, setMistakes] = useState(dataManager.getMistakes());
  const [bookmarks, setBookmarks] = useState(dataManager.getBookmarks());
  const [mockHistory, setMockHistory] = useState(dataManager.getMockHistory());

  // Data Store
  const [data, setData] = useState({
    latestCa: null,
    ca202609: null,
    ca202608: null,
    countries: null,
    states: null,
    parks: null,
    orgs: null,
    polity: null,
    history: null,
    geography: null,
    economy: null,
    schemes: null,
    reports: null,
    appointments: null,
    pyq: null,
    questions: null,
    mocks: null,
    plans: null,
    memory: null,
    loading: true
  });

  // Current selected month in CA archive
  const [selectedMonth, setSelectedMonth] = useState('2026-09');

  // Sync dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gam_dark_mode', isDark);
  }, [isDark]);

  // Load all JSON datasets
  useEffect(() => {
    const loadAll = async () => {
      try {
        const fetchJson = async (path) => {
          const res = await fetch(`./data/${path}`);
          if (!res.ok) throw new Error(`Failed to load ${path}`);
          return res.json();
        };

        const [
          latestCa,
          ca09,
          ca08,
          countries,
          states,
          parks,
          orgs,
          polity,
          history,
          geography,
          economy,
          schemes,
          reports,
          appointments,
          pyq,
          questions,
          mocks,
          plans,
          memory
        ] = await Promise.all([
          fetchJson('current-affairs/latest-24h.json').catch(() => null),
          fetchJson('current-affairs/2026-09.json').catch(() => null),
          fetchJson('current-affairs/2026-08.json').catch(() => null),
          fetchJson('static-gk/countries-capitals-currencies.json').catch(() => null),
          fetchJson('static-gk/indian-states.json').catch(() => null),
          fetchJson('static-gk/national-parks-wildlife.json').catch(() => null),
          fetchJson('static-gk/international-organisations.json').catch(() => null),
          fetchJson('polity/indian-polity.json').catch(() => null),
          fetchJson('history/indian-history.json').catch(() => null),
          fetchJson('geography/indian-geography.json').catch(() => null),
          fetchJson('economy/macro-economy.json').catch(() => null),
          fetchJson('schemes/government-schemes.json').catch(() => null),
          fetchJson('reports/reports-and-indexes.json').catch(() => null),
          fetchJson('appointments/appointments-and-awards.json').catch(() => null),
          fetchJson('pyq/pyq-analysis.json').catch(() => null),
          fetchJson('questions/questions-master.json').catch(() => null),
          fetchJson('mock-tests/mock-presets.json').catch(() => null),
          fetchJson('study-plans/study-plans.json').catch(() => null),
          fetchJson('memory-lab/memory-tricks.json').catch(() => null)
        ]);

        setData({
          latestCa,
          ca202609: ca09,
          ca202608: ca08,
          countries,
          states,
          parks,
          orgs,
          polity,
          history,
          geography,
          economy,
          schemes,
          reports,
          appointments,
          pyq,
          questions,
          mocks,
          plans,
          memory,
          loading: false
        });
      } catch (err) {
        console.error('Data loading error:', err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    loadAll();
  }, []);

  const handleNavigate = (tab, subtab = null) => {
    if (tab === 'SEARCH') {
      setSearchOpen(true);
      return;
    }
    setActiveTab(tab);
    setActiveSubtab(subtab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmarkToggle = (item) => {
    const res = dataManager.toggleBookmark(item);
    setBookmarks(res.bookmarks);
  };

  const isItemBookmarked = (id) => {
    return bookmarks.some(b => b.id === id);
  };

  const handleDataReload = () => {
    setStats(dataManager.getStats());
    setMistakes(dataManager.getMistakes());
    setBookmarks(dataManager.getBookmarks());
    setMockHistory(dataManager.getMockHistory());
  };

  const activeMonthlyData = selectedMonth === '2026-08' ? data.ca202608 : data.ca202609;

  // Repository for search and one-liners
  const aggregatedRepository = {
    ca: [
      ...(data.latestCa?.records || []),
      ...(data.ca202609?.records || []),
      ...(data.ca202608?.records || [])
    ],
    schemes: data.schemes?.schemes || [],
    countries: data.countries?.records || [],
    states: data.states?.records || [],
    parks: data.parks?.records || [],
    orgs: data.orgs?.records || []
  };

  // Nav Links List
  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: Home },
    { id: 'CURRENT_AFFAIRS', label: 'Current Affairs', icon: Calendar },
    { id: 'STATIC_GK', label: 'Static GK Hub', icon: Globe },
    { id: 'POLITY', label: 'Indian Polity', icon: Landmark },
    { id: 'HISTORY', label: 'History', icon: BookOpen },
    { id: 'GEOGRAPHY', label: 'Geography', icon: Compass },
    { id: 'ECONOMY', label: 'Economy', icon: TrendingUp },
    { id: 'SCHEMES', label: 'Govt Schemes', icon: ShieldCheck },
    { id: 'REPORTS', label: 'Reports & Indexes', icon: Award },
    { id: 'PRACTICE', label: 'Practice Arena', icon: Sparkles },
    { id: 'MOCK_TESTS', label: 'Full Mocks', icon: Clock },
    { id: 'ANALYTICS', label: 'PYQ Trends', icon: BarChart2 },
    { id: 'TOOLS', label: 'Mistakes & Tools', icon: Layers }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-ga-500 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Emblem */}
          <div 
            onClick={() => handleNavigate('DASHBOARD')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ga-700 to-bank-600 flex items-center justify-center text-white shadow-md shadow-ga-600/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight leading-none text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>GENERAL AWARENESS MASTER</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-700 dark:text-ga-400">
                  2026.09
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wide">
                SBI Clerk • IBPS Clerk/CSA • RRB OA
              </div>
            </div>
          </div>

          {/* Desktop Search Trigger & Fast Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Search className="w-4 h-4 text-ga-600" />
              <span>Quick search anywhere...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-500 font-mono">
                Ctrl+K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDark(d => !d)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(m => !m)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Subnav Pill Bar */}
        <div className="hidden lg:flex items-center max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto gap-1 py-2 text-xs border-t border-slate-100 dark:border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-ga-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm animate-fade-in flex justify-end">
          <div className="w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full p-6 space-y-4 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-black text-sm text-ga-600">GA Master Navigation</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-ga-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              GA Master Platform v2026.09 • Offline First
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {data.loading ? (
          <div className="py-24 text-center space-y-3">
            <Brain className="w-12 h-12 text-ga-600 mx-auto animate-bounce" />
            <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
              Initializing General Awareness Master Repository...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'DASHBOARD' && (
              <Dashboard
                stats={stats}
                mistakes={mistakes}
                mockHistory={mockHistory}
                onNavigate={handleNavigate}
                selectedExam={selectedExam}
                setSelectedExam={setSelectedExam}
                latestCaData={data.latestCa}
              />
            )}

            {activeTab === 'CURRENT_AFFAIRS' && (
              <div className="space-y-6">
                {/* Secondary subtab bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
                  <button
                    onClick={() => setActiveSubtab('daily')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      activeSubtab !== 'monthly'
                        ? 'bg-ga-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Last 24 Hours High-Yield Digest
                  </button>
                  <button
                    onClick={() => setActiveSubtab('monthly')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      activeSubtab === 'monthly'
                        ? 'bg-ga-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Monthly Capsules Archive
                  </button>
                </div>

                {activeSubtab === 'monthly' ? (
                  <CurrentAffairsRepository
                    monthlyData={activeMonthlyData}
                    currentMonth={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    availableMonths={[
                      { slug: '2026-09', name: 'September 2026' },
                      { slug: '2026-08', name: 'August 2026' }
                    ]}
                    onBookmarkToggle={handleBookmarkToggle}
                    isBookmarked={isItemBookmarked}
                  />
                ) : (
                  <DailyCurrentAffairs
                    data={data.latestCa}
                    onBookmarkToggle={handleBookmarkToggle}
                    isBookmarked={isItemBookmarked}
                  />
                )}
              </div>
            )}

            {activeTab === 'STATIC_GK' && (
              <StaticGkHub
                countriesData={data.countries}
                statesData={data.states}
                parksData={data.parks}
                orgsData={data.orgs}
                initialSubtab={activeSubtab || 'countries'}
                onBookmarkToggle={handleBookmarkToggle}
                isBookmarked={isItemBookmarked}
              />
            )}

            {activeTab === 'POLITY' && (
              <PolityMaster data={data.polity} />
            )}

            {activeTab === 'HISTORY' && (
              <HistoryTimeline data={data.history} />
            )}

            {activeTab === 'GEOGRAPHY' && (
              <GeographyExplorer data={data.geography} />
            )}

            {activeTab === 'ECONOMY' && (
              <EconomyMaster data={data.economy} />
            )}

            {activeTab === 'SCHEMES' && (
              <SchemesExplorer data={data.schemes} />
            )}

            {activeTab === 'REPORTS' && (
              <ReportsMatrix data={data.reports} />
            )}

            {activeTab === 'PRACTICE' && (
              <div className="space-y-6">
                {/* Practice Submodes Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
                  {[
                    { id: 'arena', label: 'Bilingual Arena' },
                    { id: 'rapid', label: 'Rapid Fire 15s Drill' },
                    { id: 'oneliners', label: '1000+ One-Liners (Audio)' },
                    { id: 'flashcards', label: 'Spaced Flashcards' },
                    { id: 'memory', label: 'Memory Lab & Mnemonics' },
                    { id: 'selection', label: 'Negative Strategy Trainer' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setActiveSubtab(m.id)}
                      className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                        (activeSubtab || 'arena') === m.id
                          ? 'bg-ga-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {activeSubtab === 'rapid' ? (
                  <RapidFire questions={data.questions?.questions || []} />
                ) : activeSubtab === 'oneliners' ? (
                  <OneLinersMode 
                    dataRepository={aggregatedRepository}
                    onBookmarkToggle={handleBookmarkToggle}
                    isBookmarked={isItemBookmarked}
                  />
                ) : activeSubtab === 'flashcards' ? (
                  <FlashcardDeck dataRepository={aggregatedRepository} />
                ) : activeSubtab === 'memory' ? (
                  <MemoryLab data={data.memory} />
                ) : activeSubtab === 'selection' ? (
                  <QuestionSelectionTrainer questions={data.questions?.questions || []} />
                ) : (
                  <PracticeArena
                    questions={data.questions?.questions || []}
                    onBookmarkToggle={handleBookmarkToggle}
                    isBookmarked={isItemBookmarked}
                    onNavigate={handleNavigate}
                  />
                )}
              </div>
            )}

            {activeTab === 'MOCK_TESTS' && (
              <ExamSimulator
                presetsData={data.mocks}
                questionsMaster={data.questions}
              />
            )}

            {activeTab === 'ANALYTICS' && (
              <PyqAnalytics pyqData={data.pyq} />
            )}

            {activeTab === 'TOOLS' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
                  {[
                    { id: 'mistakes', label: `Mistakes Notebook (${mistakes.length})` },
                    { id: 'bookmarks', label: `Bookmarks (${bookmarks.length})` },
                    { id: 'plans', label: 'Study Plans' },
                    { id: 'backup', label: 'Backup & Sync' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveSubtab(t.id)}
                      className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                        (activeSubtab || 'mistakes') === t.id
                          ? 'bg-ga-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {activeSubtab === 'bookmarks' ? (
                  <BookmarksViewer />
                ) : activeSubtab === 'plans' ? (
                  <StudyPlans plansData={data.plans} />
                ) : activeSubtab === 'backup' ? (
                  <DataBackupSync onDataReload={handleDataReload} />
                ) : (
                  <RevisionMistakes onStartReTest={() => handleNavigate('PRACTICE', 'arena')} />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* 3. Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
        dataRepository={aggregatedRepository}
      />

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          General Awareness Master • Designed for SBI Clerk, IBPS Clerk/CSA & RRB Office Assistant
        </p>
        <p className="text-[11px]">
          100% Client-Side & Privacy-First • Zero Backend Dependencies • Offline Ready
        </p>
      </footer>
    </div>
  );
}
