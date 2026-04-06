import { useNavigate } from 'react-router-dom';
import { getControlById, getMappingTypeColor } from '../utils/dataHelpers';
import FrameworkBadge from './FrameworkBadge';

export default function MappingTable({ mappings }) {
  const navigate = useNavigate();

  if (mappings.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="mapping-table">
        <thead>
          <tr>
            <th>Direction</th>
            <th>Framework</th>
            <th>Code</th>
            <th>Title</th>
            <th>Match Type</th>
            <th>Score</th>
            <th className="min-w-[200px]">Reasoning</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((mapping) => {
            const relatedControl = getControlById(mapping.relatedControlId);
            if (!relatedControl) return null;

            const typeColor = getMappingTypeColor(mapping.type);

            return (
              <tr
                key={mapping.id + mapping.direction}
                onClick={() => navigate(`/control/${relatedControl.id}`)}
                className="cursor-pointer"
              >
                <td>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    mapping.direction === 'outbound'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {mapping.direction === 'outbound' ? (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Maps to
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Mapped from
                      </>
                    )}
                  </span>
                </td>
                <td>
                  <FrameworkBadge
                    frameworkId={relatedControl.framework_id}
                    frameworkName={relatedControl.framework}
                  />
                </td>
                <td className="font-mono font-semibold text-navy">{relatedControl.code}</td>
                <td className="font-medium text-gray-800">{relatedControl.title}</td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColor.bg} ${typeColor.text}`}>
                    {mapping.type.charAt(0).toUpperCase() + mapping.type.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800">{mapping.score}</span>
                    <span className="text-gray-400 text-xs">/100</span>
                    <div className="score-bar-bg">
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${mapping.score}%`,
                          backgroundColor: typeColor.fill,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="text-gray-500 text-xs leading-relaxed">{mapping.reasoning}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
