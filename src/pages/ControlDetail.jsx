import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getControlById,
  getAllMappingsForControl,
  getCoverageBreakdown,
  getCoverageScore,
} from '../utils/dataHelpers';
import FrameworkBadge from '../components/FrameworkBadge';
import CoverageBar from '../components/CoverageBar';
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

  // 404 state
  if (!control) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-xl font-semibold text-gray-700 mb-2">Control Not Found</h1>
          <p className="text-gray-500 mb-6">
            The control ID &ldquo;{id}&rdquo; does not exist in the dataset.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Determine if on mobile (simplified check via window width for graph hide)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-white">
      {/* Section A — Control Header */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all controls
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <FrameworkBadge
              frameworkId={control.framework_id}
              frameworkName={control.framework}
              size="lg"
            />
            <span className="text-sm text-gray-400 font-medium">{control.domain}</span>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-1">
                {control.code}
              </h1>
              <h2 className="text-lg sm:text-xl text-gray-700 font-medium">
                {control.title}
              </h2>
            </div>

            <div className="hidden sm:flex flex-col items-center bg-white border border-border rounded-xl px-4 py-3 min-w-[100px]">
              <span className="text-2xl font-bold text-navy">{coverageScore}</span>
              <span className="text-xs text-gray-400 font-medium">Avg Score</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            {control.description}
          </p>

          {/* Coverage Bar */}
          <CoverageBar
            equivalent={coverage.equivalent}
            partial={coverage.partial}
            gap={coverage.gap}
            total={coverage.total}
          />
        </div>
      </section>

      {/* Section B — Mappings */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {allMappings.length > 0 ? (
          <>
            {/* View Toggle */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setView('table')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  view === 'table'
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M3 6h18M3 18h18" />
                  </svg>
                  Table View
                </span>
              </button>
              <button
                onClick={() => setView('graph')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  view === 'graph'
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="4" cy="6" r="2" />
                    <circle cx="20" cy="6" r="2" />
                    <circle cx="4" cy="18" r="2" />
                    <circle cx="20" cy="18" r="2" />
                    <line x1="12" y1="9" x2="4" y2="8" />
                    <line x1="12" y1="9" x2="20" y2="8" />
                    <line x1="12" y1="15" x2="4" y2="16" />
                    <line x1="12" y1="15" x2="20" y2="16" />
                  </svg>
                  Graph View
                </span>
              </button>

              <span className="ml-auto text-sm text-gray-400">
                {allMappings.length} mapping{allMappings.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* View Content */}
            {view === 'table' ? (
              <MappingTable mappings={allMappings} />
            ) : (
              <>
                {/* Mobile disclaimer */}
                <div className="block md:hidden text-center py-12 text-gray-500">
                  <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium">Graph view is best experienced on desktop.</p>
                  <p className="text-sm mt-1">Switch to Table View for mobile.</p>
                </div>

                {/* Desktop graph */}
                <div className="hidden md:block">
                  <MappingGraph controlId={control.id} mappings={allMappings} />
                </div>
              </>
            )}
          </>
        ) : (
          /* Section C — No Mappings */
          <div className="text-center py-16 animate-fade-in">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
            </svg>
            <p className="text-lg font-medium text-gray-600 mb-2">No mappings found for this control</p>
            <p className="text-sm text-gray-400 mb-6">
              This control does not currently have any cross-framework mappings in the dataset.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
