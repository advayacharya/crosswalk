import { useNavigate } from 'react-router-dom';
import FrameworkBadge from './FrameworkBadge';

export default function ControlCard({ control }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/control/${control.id}`)}
      className="bg-white border border-border rounded-xl p-5 cursor-pointer card-hover animate-fade-in"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/control/${control.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-base font-bold text-navy">{control.code}</span>
        <FrameworkBadge frameworkId={control.framework_id} frameworkName={control.framework} />
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
        {control.title}
      </h3>

      <span className="inline-block text-xs text-gray-400 font-medium mb-2">
        {control.domain}
      </span>

      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {control.description}
      </p>
    </div>
  );
}
