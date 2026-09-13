import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  MapPin, 
  TreePine, 
  Building2, 
  Search, 
  Bookmark, 
  Info, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function StaticGkHub({ 
  countriesData, 
  statesData, 
  parksData, 
  orgsData, 
  initialSubtab = 'countries',
  onBookmarkToggle,
  isBookmarked
}) {
  const [activeTab, setActiveTab] = useState(initialSubtab);
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState('ALL');

  // Subtab definitions
  const tabs = [
    { id: 'countries', name: 'Countries, Capitals & Currencies', count: countriesData?.records?.length || 0, icon: Globe },
    { id: 'states', name: 'Indian States & UTs', count: (statesData?.records?.length || 0), icon: MapPin },
    { id: 'parks', name: 'National Parks & Wildlife', count: parksData?.records?.length || 0, icon: TreePine },
    { id: 'orgs', name: 'International Organisations', count: orgsData?.records?.length || 0, icon: Building2 },
  ];

  // 1. Filtered Countries
  const filteredCountries = useMemo(() => {
    if (!countriesData?.records) return [];
    return countriesData.records.filter(c => {
      const matchCont = continentFilter === 'ALL' || c.continent === continentFilter;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch = !q || 
        c.country.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q);
      return matchCont && matchSearch;
    });
  }, [countriesData, continentFilter, searchTerm]);

  // 2. Filtered States
  const filteredStates = useMemo(() => {
    if (!statesData?.records) return [];
    const q = searchTerm.toLowerCase().trim();
    if (!q) return statesData.records;
    return statesData.records.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.capital.toLowerCase().includes(q) ||
      s.chief_minister?.toLowerCase().includes(q) ||
      s.governor?.toLowerCase().includes(q) ||
      (s.folk_dances || []).some(d => d.toLowerCase().includes(q))
    );
  }, [statesData, searchTerm]);

  // 3. Filtered Parks
  const filteredParks = useMemo(() => {
    if (!parksData?.records) return [];
    const q = searchTerm.toLowerCase().trim();
    if (!q) return parksData.records;
    return parksData.records.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.key_species.toLowerCase().includes(q) ||
      p.facts.toLowerCase().includes(q)
    );
  }, [parksData, searchTerm]);

  // 4. Filtered Orgs
  const filteredOrgs = useMemo(() => {
    if (!orgsData?.records) return [];
    const q = searchTerm.toLowerCase().trim();
    if (!q) return orgsData.records;
    return orgsData.records.filter(o =>
      o.name.toLowerCase().includes(q) ||
      o.abbreviation.toLowerCase().includes(q) ||
      o.headquarters.toLowerCase().includes(q) ||
      o.current_head.toLowerCase().includes(q) ||
      (o.key_reports || []).some(r => r.toLowerCase().includes(q))
    );
  }, [orgsData, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Static GK Master Hub
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          High-yield factual directories structured for instant retention and empirical exam weightage.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-ga-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Search & Sub-filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
            placeholder={`Search in ${tabs.find(t => t.id === activeTab)?.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {activeTab === 'countries' && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
            {['ALL', 'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'].map(cont => (
              <button
                key={cont}
                onClick={() => setContinentFilter(cont)}
                className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                  continentFilter === cont
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 1. Countries Table / Cards */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((c, i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-ga-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-ga-700 dark:text-ga-400">
                  {c.continent}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  {c.code}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {c.country}
              </h3>
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div>Capital: <strong className="text-slate-900 dark:text-white">{c.capital}</strong></div>
                <div>Currency: <strong className="text-slate-900 dark:text-white">{c.currency}</strong></div>
              </div>
              {c.notes && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  {c.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2. Indian States */}
      {activeTab === 'states' && (
        <div className="space-y-4">
          {filteredStates.map((s, i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                    {s.type}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {s.name}
                  </h3>
                </div>
                <div className="text-xs text-slate-500">
                  Capital: <strong className="text-slate-800 dark:text-slate-200">{s.capital}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Chief Minister</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{s.chief_minister || 'N/A'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Governor / LG</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{s.governor}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">High Court</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{s.high_court}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">State Animal / Bird</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{s.state_animal} • {s.state_bird}</span>
                </div>
              </div>

              {/* Cultural & Ecological Details */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                {s.folk_dances && s.folk_dances.length > 0 && (
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">Folk Dances: </strong>
                    {s.folk_dances.join(', ')}
                  </div>
                )}
                {s.festivals && s.festivals.length > 0 && (
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">Famous Festivals: </strong>
                    {s.festivals.join(', ')}
                  </div>
                )}
                {s.national_parks && s.national_parks.length > 0 && (
                  <div>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">National Parks: </strong>
                    {s.national_parks.join(', ')}
                  </div>
                )}
                {s.ramsar_sites && s.ramsar_sites.length > 0 && (
                  <div>
                    <strong className="text-blue-700 dark:text-blue-400 font-bold">Ramsar Wetlands: </strong>
                    {s.ramsar_sites.join(', ')}
                  </div>
                )}
                {s.key_facts && (
                  <div className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 mt-2">
                    <strong>Key Exam Fact: </strong>{s.key_facts}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. National Parks */}
      {activeTab === 'parks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredParks.map((p, i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {p.state}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {p.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {p.name}
              </h3>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-200">Flagship Species: </strong>
                {p.key_species}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.facts}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. International Organisations */}
      {activeTab === 'orgs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrgs.map((o, i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  {o.abbreviation}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Est. {o.established}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {o.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Headquarters</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{o.headquarters}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Head</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{o.current_head}</span>
                </div>
              </div>
              {o.key_reports && o.key_reports.length > 0 && (
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">Flagship Reports: </strong>
                  {o.key_reports.join(', ')}
                </div>
              )}
              {o.special_notes && (
                <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 text-xs text-blue-950 dark:text-blue-200">
                  {o.special_notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
