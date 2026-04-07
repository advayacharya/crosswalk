import { useNavigate } from 'react-router-dom';
import FrameworkBadge from './FrameworkBadge';

export default function ControlCard({ control }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/control/${control.id}`)}
      className="interactive-card ghost-border p-6 cursor-pointer animate-fade-in group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/control/${control.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="tech-id font-medium text-primary bg-primary-light px-2 py-0.5 rounded uppercase">
          {control.code}
        </span>
        <FrameworkBadge frameworkId={control.framework_id} frameworkName={control.framework} />
      </div>

      <h3 className="text-base font-bold text-obsidian mb-2 leading-tight group-hover:text-primary transition-colors">
        {control.title}
      </h3>

      <div className="mb-4">
        <span className="text-[10px] text-steel font-bold uppercase tracking-widest bg-stone-low px-2 py-1 rounded">
          {control.domain}
        </span>
      </div>

      <p className="text-sm text-steel leading-relaxed line-clamp-3">
        {control.description}
      </p>
    </div>
  );
}
