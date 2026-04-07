import { useNavigate } from 'react-router-dom';
import { getControlById, getMappingTypeColor } from '../utils/dataHelpers';
import FrameworkBadge from './FrameworkBadge';

export default function MappingTable({ mappings }) {
  const navigate = useNavigate();

  if (mappings.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl ghost-border bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="surface-low border-b border-stone-high">
          <tr>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Context</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Registry</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Identifier</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Title</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Alignment</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em]">Score</th>
            <th className="px-6 py-4 text-[10px] font-bold text-steel uppercase tracking-[0.2em] min-w-[300px]">Forensic Reasoning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-low">
          {mappings.map((mapping) => {
            const relatedControl = getControlById(mapping.relatedControlId);
            if (!relatedControl) return null;

            const typeColor = getMappingTypeColor(mapping.type);

            return (
              <tr
                key={mapping.id + mapping.direction}
                onClick={() => navigate(`/control/${relatedControl.id}`)}
                className="group hover:bg-stone-low transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                    mapping.direction === 'outbound'
                      ? 'bg-primary-light text-primary'
                      : 'bg-stone-high text-steel'
                  }`}>
                    {mapping.direction === 'outbound' ? (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Source
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Target
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <FrameworkBadge
                    frameworkId={relatedControl.framework_id}
                    frameworkName={relatedControl.framework}
                  />
                </td>
                <td className="px-6 py-4 tech-id font-bold text-primary group-hover:underline">
                  {relatedControl.code}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-obsidian leading-tight">
                  {relatedControl.title}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${typeColor.bg} ${typeColor.text}`}>
                    {mapping.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-obsidian">{mapping.score}</span>
                    <div className="w-12 h-1.5 bg-stone-low rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${mapping.score}%`,
                          backgroundColor: typeColor.fill,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-steel font-medium leading-relaxed italic">
                  "{mapping.reasoning}"
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
