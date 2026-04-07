import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getControlById,
  getAllMappingsForControl,
  getCoverageBreakdown,
  getCoverageScore,
} from '../utils/dataHelpers';
import FrameworkBadge from '../components/FrameworkBadge';
import MappingTable from '../components/MappingTable';
import MappingGraph from '../components/MappingGraph';

export default function ControlDetail() {
  const { id } = useParams();
  const [view, setView] = useState('table');

  const control = getControlById(id);

  const allMappings = useMemo(() => {
    if (!control) return [];
    return getAllMappingsForControl(control.id);
  }, [control]);

  const coverage = useMemo(() => {
    if (!control) return { equivalent: 0, partial: 0, gap: 0, total: 0 };
    return getCoverageBreakdown(control.id);
  }, [control]);

  const coverageScore = useMemo(() => {
    if (!control) return 0;
    return getCoverageScore(control.id);
  }, [control]);

  if (!control) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-stone-low rounded-3xl p-12 text-center border border-stone-high shadow-sm animate-fade-in">
          <div className="text-8xl font-black text-stone-high mb-6">404</div>
          <h1 className="text-2xl font-bold text-obsidian mb-4 tracking-tight">Record Non-Existent</h1>
          <p className="text-steel font-medium mb-10 leading-relaxed">
            The requested control identifier &ldquo;<span className="text-primary">{id}</span>&rdquo; could not be located in the current sovereign ledger.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Registry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen surface-base flex flex-col items-center">
      {/* Control Header Editorial */}
      <section className="surface-low border-b border-stone-high py-16 px-6 w-full flex justify-center">
        <div className="max-w-6xl w-full animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-steel hover:text-primary uppercase tracking-widest mb-10 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Registry Overview
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <FrameworkBadge
                  frameworkId={control.framework_id}
                  frameworkName={control.framework}
                />
                <span className="text-[10px] font-bold text-steel bg-stone-high px-2 py-1 rounded-sm uppercase tracking-widest">
                  {control.domain}
                </span>
              </div>

              <h1 className="text-5xl font-black text-obsidian mb-4 tracking-tighter leading-none">
                <span className="tech-id text-primary block mb-2">{control.code}</span>
                {control.title}
              </h1>

              <p className="text-steel text-lg font-medium leading-relaxed max-w-3xl italic">
                "{control.description}"
              </p>
            </div>

            <div className="bg-white ghost-border rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-steel uppercase tracking-widest block mb-4">Structural Alignment</span>
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-black text-primary leading-none">{coverageScore}</span>
                  <span className="text-xl font-bold text-steel mb-1">/100</span>
                </div>
                <div className="mt-4 w-full h-1 bg-stone-low rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${coverageScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-steel uppercase tracking-widest">Equivalent</span>
                  <span className="text-sm font-black text-equivalent">{coverage.equivalent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-steel uppercase tracking-widest">Partial</span>
                  <span className="text-sm font-black text-partial">{coverage.partial}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-steel uppercase tracking-widest">Gap</span>
                  <span className="text-sm font-black text-gap">{coverage.gap}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapping Analysis Analysis */}
      <section className="max-w-6xl w-full px-6 py-16 flex flex-col items-center">
        {allMappings.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-2xl font-black text-obsidian tracking-tight">Cross-Framework Analysis</h2>
                <p className="text-steel text-sm font-medium">Mapped relationships detected in the structural registry.</p>
              </div>

              <div className="flex bg-stone-low p-1 rounded-xl ghost-border overflow-hidden">
                <button
                  onClick={() => setView('table')}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    view === 'table'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-steel hover:text-obsidian'
                  }`}
                >
                  Tabular Ledger
                </button>
                <button
                  onClick={() => setView('graph')}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    view === 'graph'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-steel hover:text-obsidian'
                  }`}
                >
                  Neural Graph
                </button>
              </div>
            </div>

            <div className="animate-fade-in">
              {view === 'table' ? (
                <MappingTable mappings={allMappings} />
              ) : (
                <div className="hidden md:block">
                  <MappingGraph controlId={control.id} mappings={allMappings} />
                </div>
              )}
              
              {view === 'graph' && (
                <div className="md:hidden text-center py-20 surface-low rounded-3xl border border-stone-high">
                   <p className="text-steel font-bold text-sm uppercase tracking-widest">Graph visualization requires extended screen real-estate.</p>
                   <button onClick={() => setView('table')} className="mt-4 text-primary font-bold text-xs uppercase underline">Back to Tabular View</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 surface-low rounded-3xl border border-stone-high border-dashed max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-obsidian mb-2">Isolated Control</h3>
            <p className="text-steel font-medium max-w-sm mx-auto italic">
              "No structural commonalities found with other recognized frameworks in current ledger."
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
