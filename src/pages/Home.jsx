import { useState, useMemo } from 'react';
import { searchControls, getAllFrameworks } from '../utils/dataHelpers';
import ControlCard from '../components/ControlCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeFrameworks, setActiveFrameworks] = useState(() =>
    getAllFrameworks().map((f) => f.id)
  );

  const frameworks = getAllFrameworks();

  const toggleFramework = (id) => {
    setActiveFrameworks((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((fId) => fId !== id);
      }
      return [...prev, id];
    });
  };

  const results = useMemo(
    () => searchControls(query, activeFrameworks),
    [query, activeFrameworks]
  );

  return (
    <div className="min-h-screen surface-base flex flex-col items-center">
      {/* Hero Section */}
      <section className="surface-low relative py-20 px-6 overflow-hidden w-full flex justify-center">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-5xl w-full text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-obsidian mb-6 tracking-tighter leading-[1.1]">
            The Sovereign <span className="text-primary italic">Crosswalk.</span>
          </h1>
          <p className="text-steel text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Architectural integrity for GRC professionals. Map complex security controls across ISO 27001, SOC 2, and GDPR with legal-grade precision.
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-10 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-focus-within:bg-primary/10 transition-all"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-obsidian/5 border border-stone-high group-focus-within:border-primary transition-all overflow-hidden">
                <div className="pl-6 text-steel">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="search-controls"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search architecture by code, title, or requirement..."
                  className="w-full px-4 py-6 text-lg font-medium text-obsidian bg-transparent focus:outline-none placeholder:text-steel/40"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="pr-6 text-steel/40 hover:text-obsidian transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Framework Filters */}
          <div className="flex justify-center gap-3 flex-wrap">
            {frameworks.map((fw) => {
              const isActive = activeFrameworks.includes(fw.id);
              return (
                <button
                  key={fw.id}
                  onClick={() => toggleFramework(fw.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'bg-obsidian text-white border-obsidian'
                      : 'bg-white text-steel border-stone-high hover:border-steel hover:text-obsidian'
                  }`}
                >
                  {fw.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl w-full mx-auto px-6 py-16 flex flex-col items-center">
        <div className="w-full flex items-end justify-between mb-10 border-b border-stone-high pb-4">
          <div>
            <h2 className="text-xs font-bold text-steel uppercase tracking-[0.2em] mb-1">Audit Trail</h2>
            <p className="text-obsidian font-bold text-2xl">
              {results.length} Identifiable <span className="text-steel font-medium">Controls</span>
            </p>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((control) => (
              <ControlCard key={control.id} control={control} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 surface-low rounded-3xl border border-stone-high">
            <div className="w-16 h-16 bg-stone-high rounded-full flex items-center justify-center mx-auto mb-6 text-steel">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-obsidian mb-2">Null Result</h3>
            <p className="text-steel font-medium max-w-sm mx-auto">
              The search query architecture did not match any documented controls in the ledger.
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-8 text-primary font-bold text-sm uppercase tracking-widest hover:underline"
            >
              Clear Workspace
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
