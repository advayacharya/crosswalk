import { useMemo } from 'react';
import {
  getAllFrameworks,
  getControlsByFramework,
  getFrameworkMappingStats,
  getFrameworkCoverageScore,
} from '../utils/dataHelpers';
import CoverageBar from '../components/CoverageBar';
import GlobalNetworkGraph from '../components/GlobalNetworkGraph';
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
    <div className="min-h-screen surface-base flex flex-col items-center">
      {/* Header Section */}
      <section className="surface-low py-16 px-6 border-b border-stone-high w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-obsidian mb-4 tracking-tighter">
                Framework Ecosystem <span className="text-primary italic">Overview.</span>
              </h1>
              <p className="text-steel text-lg font-medium">
                Analysis of structural alignment across ISO 27001, SOC 2, and GDPR. Compare coverage scores, control density, and cross-framework density.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <span className="text-xs font-bold text-steel uppercase tracking-widest block mb-1">Total Controls</span>
                <span className="text-3xl font-bold text-obsidian leading-none">45</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-steel uppercase tracking-widest block mb-1">Average Coverage</span>
                <span className="text-3xl font-bold text-primary leading-none">82%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graph Section: The Ecosystem View */}
      <section className="max-w-6xl w-full px-6 py-12 flex flex-col items-center">
        <div className="mb-8 w-full">
          <h2 className="text-xs font-bold text-steel uppercase tracking-[2px] mb-2 font-mono">Forensic Mapping Graph.</h2>
          <p className="text-steel text-sm max-w-lg mb-6">
            Interactive visualization of framework interconnectivity through shared control domains and conceptual mappings.
          </p>
          <GlobalNetworkGraph />
        </div>
      </section>

      <section className="max-w-6xl w-full px-6 py-12 flex flex-col items-center">
        {/* Framework Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 w-full">
          {frameworkData.map((fw, i) => (
            <div
              key={fw.id}
              className="bg-white border border-stone-high rounded-2xl p-8 hover:border-primary transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-xl shadow-obsidian/5"
            >
              {/* Subtle framework specific background tint */}
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.05] -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-110 pointer-events-none ${
                fw.id === 'iso27001' ? 'bg-iso' : fw.id === 'soc2' ? 'bg-soc2' : 'bg-gdpr'
              }`}></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 block">{fw.version}</span>
                  <h2 className="text-2xl font-bold text-obsidian tracking-tight">{fw.name}</h2>
                </div>

                <p className="text-steel text-sm font-medium leading-relaxed mb-8 h-20">
                  {fw.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8 border-y border-stone-low py-6">
                  <div>
                    <span className="text-[10px] font-bold text-steel uppercase tracking-widest block mb-1">Density</span>
                    <span className="text-2xl font-bold text-obsidian">{fw.total_controls} <span className="text-xs text-steel">controls</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-steel uppercase tracking-widest block mb-1">Alignment</span>
                    <span className="text-2xl font-bold text-primary">{fw.coverageScore}%</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-steel uppercase tracking-widest block mb-3">Core Domains</span>
                  <div className="flex flex-wrap gap-2">
                    {fw.domains.map((domain) => (
                      <span
                        key={domain}
                        className="px-3 py-1 bg-stone-low text-steel font-bold text-[10px] rounded uppercase tracking-wider group-hover:bg-primary-light group-hover:text-primary transition-colors"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistical Analysis Chart */}
        <div className="bg-white border border-stone-high rounded-3xl p-10 shadow-sm overflow-hidden relative">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-obsidian tracking-tight">Statistical Density</h2>
              <p className="text-steel text-sm font-medium">Comparative analysis of control volume and mapping directionality.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-obsidian"></div>
                <span className="text-[10px] font-bold text-steel uppercase">Source Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary"></div>
                <span className="text-[10px] font-bold text-steel uppercase">Target Load</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} barGap={8} barCategoryGap="25%">
              <CartesianGrid vertical={false} stroke="rgba(194, 198, 210, 0.2)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#575e6d', fontWeight: 'bold' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#575e6d' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: '#f2f3ff' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #eaedff',
                  boxShadow: '0 10px 30px rgba(22, 27, 42, 0.05)',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                }}
              />
              <Bar dataKey="Total Controls" fill="#161b2a" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Mappings as Source" fill="#2563a8" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Mappings as Target" fill="#c2c6d2" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
