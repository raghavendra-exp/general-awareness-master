import React, { useState, useMemo } from 'react';
import { Shield, Search, Sparkles, Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export default function SchemesExplorer({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('ALL');

  const schemes = data?.schemes || [];

  const ministries = useMemo(() => {
    const list = new Set();
    schemes.forEach(s => {
      const min = s.nodal_ministry || s.nodal_agency;
      if (min) list.add(min);
    });
    return ['ALL', ...Array.from(list)];
  }, [schemes]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(s => {
      const min = s.nodal_ministry || s.nodal_agency;
      const matchMin = selectedMinistry === 'ALL' || min === selectedMinistry;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        min?.toLowerCase().includes(q) ||
        s.exam_relevance?.toLowerCase().includes(q);
      return matchMin && matchSearch;
    });
  }, [schemes, selectedMinistry, searchTerm]);

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Schemes Explorer...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Central Government Flagship Schemes
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ministry, launch date, financial outlays, beneficiary eligibility, and empirical bank exam targets.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
              placeholder="Search scheme name, ministry, or keywords (e.g. MUDRA, Surya Ghar, ₹6,000)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 shrink-0">
            {filteredSchemes.length} of {schemes.length} Schemes
          </span>
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filteredSchemes.map((s, i) => (
          <div 
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 hover:border-ga-400 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                  {s.nodal_ministry || s.nodal_agency}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {s.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>Launched: <strong>{s.launch_date}</strong></span>
              </div>
            </div>

            {/* Financial Details / Features */}
            {s.key_features && (
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {s.key_features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {s.categories && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-xs">
                {s.categories.map((cat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white block">{cat.category}</span>
                    <span className="text-ga-700 dark:text-ga-400 font-semibold">{cat.loan_amount}</span>
                  </div>
                ))}
              </div>
            )}

            {s.financial_benefit && (
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <strong>Financial Benefit: </strong>{s.financial_benefit}
              </div>
            )}

            {s.total_outlay && (
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <strong>Total Financial Outlay: </strong>{s.total_outlay}
              </div>
            )}

            {s.premium_rates && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                {s.premium_rates.map((pr, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="text-amber-900 dark:text-amber-200 block font-medium">{pr.crop_type}</span>
                    <strong className="text-amber-800 dark:text-amber-300 font-bold text-sm">{pr.farmer_premium}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* Exam Focus Highlight */}
            {s.exam_relevance && (
              <div className="p-3 rounded-xl bg-ga-50/80 dark:bg-ga-950/40 border border-ga-200 dark:border-ga-800 text-xs text-ga-950 dark:text-ga-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-ga-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ga-800 dark:text-ga-300 font-bold">Exam Target Point: </strong>
                  {s.exam_relevance}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
