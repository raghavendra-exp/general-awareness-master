import React, { useState } from 'react';
import { Download, Upload, Trash2, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function DataBackupSync({ onDataReload }) {
  const [importStatus, setImportStatus] = useState(null);

  const handleExport = () => {
    dataManager.exportBackup();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const res = dataManager.importBackup(json);
        if (res.success) {
          setImportStatus('Backup restored successfully!');
          if (onDataReload) onDataReload();
        } else {
          setImportStatus(`Restore failed: ${res.error}`);
        }
      } catch (err) {
        setImportStatus('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your progress, mistakes, and bookmarks? This action cannot be undone.')) {
      dataManager.resetAllData();
      if (onDataReload) onDataReload();
      alert('All local progress has been reset.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <span>Offline Data Backup & Sync</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This platform is 100% private and runs offline in your browser. Export and save your progress to JSON anytime.
        </p>
      </div>

      {importStatus && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-ga-50 dark:bg-ga-950 text-ga-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Export Progress Backup
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Download your complete streak, flashcards mastery, bookmarks, mistakes notebook, and mock exam history in an instant JSON file.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="w-full py-3 rounded-2xl bg-ga-600 hover:bg-ga-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup (.JSON)</span>
          </button>
        </div>

        {/* Import */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Restore from Backup
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Load your saved JSON backup to restore your study data across another browser or computer seamlessly.
            </p>
          </div>

          <label className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-300 dark:border-slate-700 transition-all">
            <Upload className="w-4 h-4 text-blue-500" />
            <span>Select Backup File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone: Reset */}
      <div className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          <span>Danger Zone: Clear Local Storage</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Reset all statistics, bookmarks, flashcard reviews, and mistakes. Only perform this if you wish to start from a completely clean slate.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}
