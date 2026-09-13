import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Search, Volume2, VolumeX, Sparkles, Bookmark, Check } from 'lucide-react';

export default function OneLinersMode({ dataRepository, onBookmarkToggle, isBookmarked }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  // Compile high-yield one-liners from repository
  const allOneLiners = useMemo(() => {
    const list = [];

    // From current affairs
    (dataRepository?.ca || []).forEach((c, idx) => {
      list.push({
        id: `OL-CA-${idx}`,
        category: 'CURRENT AFFAIRS',
        fact: `${c.headline}: ${c.exam_fact}`,
        tag: c.category
      });
    });

    // From schemes
    (dataRepository?.schemes || []).forEach((s, idx) => {
      list.push({
        id: `OL-SCHEME-${idx}`,
        category: 'GOVERNMENT SCHEMES',
        fact: `${s.name}: Launched by ${s.nodal_ministry || s.nodal_agency} in ${s.launch_date}. ${s.exam_relevance || ''}`,
        tag: 'Schemes'
      });
    });

    // From countries
    (dataRepository?.countries || []).forEach((c, idx) => {
      list.push({
        id: `OL-COUNTRY-${idx}`,
        category: 'COUNTRIES & CAPITALS',
        fact: `${c.country}: Capital is ${c.capital}; Currency is ${c.currency} (${c.code}). ${c.notes || ''}`,
        tag: c.continent
      });
    });

    // From orgs
    (dataRepository?.orgs || []).forEach((o, idx) => {
      list.push({
        id: `OL-ORG-${idx}`,
        category: 'INTERNATIONAL ORGS',
        fact: `${o.name} (${o.abbreviation}): Headquartered in ${o.headquarters}, headed by ${o.current_head}. Established in ${o.established}.`,
        tag: 'Multilateral'
      });
    });

    // From parks
    (dataRepository?.parks || []).forEach((p, idx) => {
      list.push({
        id: `OL-PARK-${idx}`,
        category: 'NATIONAL PARKS',
        fact: `${p.name} (${p.state}): Famous for ${p.key_species}. ${p.facts}`,
        tag: p.category
      });
    });

    return list;
  }, [dataRepository]);

  const categories = ['ALL', 'CURRENT AFFAIRS', 'GOVERNMENT SCHEMES', 'COUNTRIES & CAPITALS', 'INTERNATIONAL ORGS', 'NATIONAL PARKS'];

  const filtered = useMemo(() => {
    return allOneLiners.filter(ol => {
      const matchCat = selectedCategory === 'ALL' || ol.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch = !q || ol.fact.toLowerCase().includes(q) || ol.tag.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allOneLiners, selectedCategory, searchTerm]);

  const handleSpeak = (id, text) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking && speakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    setSpeakingId(id);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-ga-600" />
              <span>High-Yield Factual One-Liners</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Rapid memory revision capsules with built-in text-to-speech audio reader.
            </p>
          </div>
          <span className="text-xs font-bold text-ga-600 px-3 py-1 rounded-full bg-ga-50 dark:bg-ga-950 border border-ga-200 dark:border-ga-800 self-start sm:self-auto">
            {filtered.length} Facts Available
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
              placeholder="Search facts by keyword (e.g. RBI, Geneva, Rhino, Cheetah)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facts List */}
      <div className="space-y-3">
        {filtered.map((ol) => {
          const currentlyPlaying = isSpeaking && speakingId === ol.id;

          return (
            <div
              key={ol.id}
              className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex items-start justify-between gap-4 shadow-sm ${
                currentlyPlaying 
                  ? 'border-ga-500 ring-2 ring-ga-500/20 bg-ga-50/20 dark:bg-ga-950/20' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {ol.category}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {ol.fact}
                </p>
              </div>

              {/* Audio Read-Aloud Button */}
              <button
                onClick={() => handleSpeak(ol.id, ol.fact)}
                className={`p-2 rounded-xl border transition-colors shrink-0 ${
                  currentlyPlaying
                    ? 'bg-ga-600 text-white border-ga-600 animate-pulse'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-ga-600 border-slate-200 dark:border-slate-700'
                }`}
                title={currentlyPlaying ? 'Stop Audio' : 'Listen to this fact'}
              >
                {currentlyPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
