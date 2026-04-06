import { getFrameworkColor } from '../utils/dataHelpers';

export default function FrameworkBadge({ frameworkId, frameworkName, size = 'sm' }) {
  const colors = getFrameworkColor(frameworkId);

  const sizeClasses = size === 'lg'
    ? 'px-3 py-1 text-sm font-semibold'
    : 'px-2 py-0.5 text-xs font-medium';

  return (
    <span className={`inline-flex items-center rounded-full ${colors.bg} ${colors.text} ${sizeClasses}`}>
      {frameworkName}
    </span>
  );
}
