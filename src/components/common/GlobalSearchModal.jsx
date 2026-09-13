import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, ExternalLink, Globe, Shield, Sparkles } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate, dataRepository }) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('SEARCH');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  // Search across aggregated datasets
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const matches = [];

    // Current affairs
    if (dataRepository?.ca) {
      dataRepository.ca.forEach(item => {
        if (
          item.headline?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.exam_fact?.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'Current Affairs',
            title: item.headline,
            subtitle: item.exam_fact,
            tab: 'CURRENT_AFFAIRS',
            item
          });
        }
      });
    }

    // Schemes
    if (dataRepository?.schemes) {
      dataRepository.schemes.forEach(s => {
        if (
          s.name?.toLowerCase().includes(q) ||
          s.nodal_ministry?.toLowerCase().includes(q) ||
          s.exam_relevance?.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'Government Scheme',
            title: s.name,
            subtitle: `${s.nodal_ministry} | ${s.launch_date}`,
            tab: 'SCHEMES',
            item: s
          });
        }
      });
    }

    // Static GK - Countries
    if (dataRepository?.countries) {
      dataRepository.countries.forEach(c => {
        if (
          c.country?.toLowerCase().includes(q) ||
          c.capital?.toLowerCase().includes(q) ||
          c.currency?.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'Country / Capital',
            title: `${c.country} - Capital: ${c.capital}`,
            subtitle: `Currency: ${c.currency} (${c.code}) | ${c.continent}`,
            tab: 'STATIC_GK',
            subtab: 'countries',
            item: c
          });
        }
      });
    }

    // Static GK - Orgs
    if (dataRepository?.orgs) {
      dataRepository.orgs.forEach(o => {
        if (
          o.name?.toLowerCase().includes(q) ||
          o.abbreviation?.toLowerCase().includes(q) ||
          o.headquarters?.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'International Organisation',
            title: `${o.name} (${o.abbreviation})`,
            subtitle: `HQ: ${o.headquarters} | Head: ${o.current_head}`,
            tab: 'STATIC_GK',
            subtab: 'orgs',
            item: o
          });
        }
      });
    }

    // Static GK - Parks
    if (dataRepository?.parks) {
      dataRepository.parks.forEach(p => {
        if (
          p.name?.toLowerCase().includes(q) ||
          p.state?.toLowerCase().includes(q) ||
          p.key_species?.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'National Park / Wildlife',
            title: `${p.name} (${p.state})`,
            subtitle: `Flagship: ${p.key_species} | ${p.category}`,
            tab: 'STATIC_GK',
            subtab: 'parks',
            item: p
          });
        }
      });
    }

    return matches.slice(0, 20); // Cap at 20 high-relevance items
  }, [query, dataRepository]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-ga-600 dark:text-ga-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            placeholder="Search current affairs, schemes, static GK, articles, capitals... (Press ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for keywords like "Forex", "MUDRA", "Ramsar", "Kaziranga", "IMF"</p>
            </div>
          )}

          {query.length < 2 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-ga-500 opacity-60" />
              Type at least 2 characters to search across all GA repositories.
            </div>
          )}

          {results.map((res, idx) => (
            <div
              key={idx}
              onClick={() => {
                onNavigate(res.tab, res.subtab);
                onClose();
              }}
              className="py-3 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-ga-50 text-ga-700 dark:bg-ga-950 dark:text-ga-300 border border-ga-200 dark:border-ga-800">
                    {res.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-ga-600 dark:group-hover:text-ga-400 transition-colors">
                    {res.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {res.subtitle}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-ga-600 shrink-0 mt-1" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Tip: Use <strong className="font-semibold text-slate-700 dark:text-slate-300">Ctrl+K</strong> to open anywhere</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
