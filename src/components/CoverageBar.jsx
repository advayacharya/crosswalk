export default function CoverageBar({ equivalent, partial, gap, total }) {
  if (total === 0) return null;

  const eqPct = (equivalent / total) * 100;
  const partialPct = (partial / total) * 100;
  const gapPct = (gap / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-equivalent inline-block"></span>
          Equivalent ({equivalent})
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-partial inline-block"></span>
          Partial ({partial})
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-gap inline-block"></span>
          Gap ({gap})
        </div>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
        {eqPct > 0 && (
          <div
            className="bg-equivalent h-full transition-all duration-500"
            style={{ width: `${eqPct}%` }}
            title={`Equivalent: ${equivalent}`}
          />
        )}
        {partialPct > 0 && (
          <div
            className="bg-partial h-full transition-all duration-500"
            style={{ width: `${partialPct}%` }}
            title={`Partial: ${partial}`}
          />
        )}
        {gapPct > 0 && (
          <div
            className="bg-gap h-full transition-all duration-500"
            style={{ width: `${gapPct}%` }}
            title={`Gap: ${gap}`}
          />
        )}
      </div>
    </div>
  );
}
