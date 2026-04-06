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
        // Don't allow deselecting all
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3 tracking-tight">
            Map Security Controls Across Frameworks
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Search any control from ISO 27001, SOC 2, or GDPR and instantly see how it maps to the others.
          </p>

          {/* Search Input */}
          <div className="max-w-[640px] mx-auto mb-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-controls"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search controls by title, code, framework, or description..."
                className="w-full pl-12 pr-4 py-3.5 text-base rounded-xl border-2 border-border bg-white shadow-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy/20 transition-all placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Framework Filters */}
          <div className="flex justify-center gap-2 flex-wrap">
            {frameworks.map((fw) => {
              const isActive = activeFrameworks.includes(fw.id);
              return (
                <button
                  key={fw.id}
                  onClick={() => toggleFramework(fw.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    isActive
                      ? 'bg-navy text-white border-navy shadow-sm'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-gray-700'
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            {results.length} control{results.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((control) => (
              <ControlCard key={control.id} control={control} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">No controls match your search</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search terms or filters</p>
          </div>
        )}
      </section>
    </div>
  );
}
