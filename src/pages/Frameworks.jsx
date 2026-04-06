import { useMemo } from 'react';
import {
  getAllFrameworks,
  getControlsByFramework,
  getFrameworkMappingStats,
  getFrameworkCoverageScore,
} from '../utils/dataHelpers';
import CoverageBar from '../components/CoverageBar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Frameworks() {
  const frameworks = getAllFrameworks();

  const frameworkData = useMemo(() => {
    return frameworks.map((fw) => {
      const controls = getControlsByFramework(fw.id);
      const stats = getFrameworkMappingStats(fw.id);
      const coverageScore = getFrameworkCoverageScore(fw.id);

      return {
        ...fw,
        controls,
        stats,
        coverageScore,
      };
    });
  }, [frameworks]);

  const chartData = useMemo(() => {
    return frameworkData.map((fw) => ({
      name: fw.name,
      'Total Controls': fw.total_controls,
      'Mappings as Source': fw.stats.asSource,
      'Mappings as Target': fw.stats.asTarget,
    }));
  }, [frameworkData]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Frameworks Overview
          </h1>
          <p className="text-gray-500 text-base">
            Compare the three compliance frameworks side by side — controls, domains, and mapping coverage.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Framework Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {frameworkData.map((fw, i) => (
            <div
              key={fw.id}
              className="bg-white border border-border rounded-xl p-6 shadow-sm animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4">
                <h2 className="text-lg font-bold text-navy mb-1">{fw.name}</h2>
                <span className="text-xs text-gray-400 font-medium">{fw.version}</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {fw.description}
              </p>

              <div className="flex items-center gap-6 mb-4 text-sm">
                <div>
                  <span className="text-2xl font-bold text-navy">{fw.total_controls}</span>
                  <span className="block text-xs text-gray-400">Controls</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-navy">{fw.coverageScore}</span>
                  <span className="block text-xs text-gray-400">Avg Score</span>
                </div>
              </div>

              {/* Domains */}
              <div className="mb-5">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Domains</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {fw.domains.map((domain) => (
                    <span
                      key={domain}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              {/* Type Breakdown Bar */}
              <CoverageBar
                equivalent={fw.stats.typeBreakdown.equivalent}
                partial={fw.stats.typeBreakdown.partial}
                gap={fw.stats.typeBreakdown.gap}
                total={fw.stats.asSource}
              />
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy mb-6">Framework Comparison</h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={chartData} barGap={4} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 13, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                }}
              />
              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: '13px', color: '#64748b' }}
              />
              <Bar dataKey="Total Controls" fill="#1e2a4a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Mappings as Source" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Mappings as Target" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
