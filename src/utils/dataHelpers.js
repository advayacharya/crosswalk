import seedData from '../data/seed-data.json';

const { frameworks, controls, mappings } = seedData;

// ── Getters ──

export function getAllFrameworks() {
  return frameworks;
}

export function getAllControls() {
  return controls;
}

export function getAllMappings() {
  return mappings;
}

export function getFrameworkById(id) {
  return frameworks.find((f) => f.id === id) || null;
}

export function getControlById(id) {
  return controls.find((c) => c.id === id) || null;
}

export function getControlsByFramework(frameworkId) {
  return controls.filter((c) => c.framework_id === frameworkId);
}

// ── Mapping Lookups ──

export function getOutboundMappings(controlId) {
  return mappings.filter((m) => m.source_id === controlId);
}

export function getInboundMappings(controlId) {
  return mappings.filter((m) => m.target_id === controlId);
}

export function getAllMappingsForControl(controlId) {
  const outbound = getOutboundMappings(controlId).map((m) => ({
    ...m,
    direction: 'outbound',
    relatedControlId: m.target_id,
  }));
  const inbound = getInboundMappings(controlId).map((m) => ({
    ...m,
    direction: 'inbound',
    relatedControlId: m.source_id,
  }));
  return [...outbound, ...inbound];
}

// ── Coverage Calculations ──

export function getCoverageBreakdown(controlId) {
  const allMaps = getAllMappingsForControl(controlId);
  if (allMaps.length === 0) return { equivalent: 0, partial: 0, gap: 0, total: 0 };

  const counts = { equivalent: 0, partial: 0, gap: 0 };
  allMaps.forEach((m) => {
    if (counts[m.type] !== undefined) counts[m.type]++;
  });

  return {
    equivalent: counts.equivalent,
    partial: counts.partial,
    gap: counts.gap,
    total: allMaps.length,
  };
}

export function getCoverageScore(controlId) {
  const allMaps = getAllMappingsForControl(controlId);
  if (allMaps.length === 0) return 0;
  const avg = allMaps.reduce((sum, m) => sum + m.score, 0) / allMaps.length;
  return Math.round(avg);
}

export function getFrameworkCoverageScore(frameworkId) {
  const fwControls = getControlsByFramework(frameworkId);
  if (fwControls.length === 0) return 0;

  const scores = fwControls.map((c) => getCoverageScore(c.id));
  const nonZeroScores = scores.filter((s) => s > 0);
  if (nonZeroScores.length === 0) return 0;

  return Math.round(nonZeroScores.reduce((sum, s) => sum + s, 0) / nonZeroScores.length);
}

// ── Framework Mapping Stats ──

export function getFrameworkMappingStats(frameworkId) {
  const fwControls = getControlsByFramework(frameworkId);
  const controlIds = new Set(fwControls.map((c) => c.id));

  let asSource = 0;
  let asTarget = 0;
  const typeBreakdown = { equivalent: 0, partial: 0, gap: 0 };

  mappings.forEach((m) => {
    if (controlIds.has(m.source_id)) {
      asSource++;
      if (typeBreakdown[m.type] !== undefined) typeBreakdown[m.type]++;
    }
    if (controlIds.has(m.target_id)) {
      asTarget++;
    }
  });

  return { asSource, asTarget, typeBreakdown };
}

// ── Search ──

export function searchControls(query, activeFrameworks) {
  const q = query.toLowerCase().trim();

  let filtered = controls;

  // Filter by active frameworks
  if (activeFrameworks && activeFrameworks.length > 0 && activeFrameworks.length < frameworks.length) {
    const activeIds = new Set(activeFrameworks);
    filtered = filtered.filter((c) => activeIds.has(c.framework_id));
  }

  // Filter by search query
  if (q) {
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.framework.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q)
    );
  }

  return filtered;
}

// ── Helpers ──

export function getFrameworkColor(frameworkId) {
  const map = {
    iso27001: { bg: 'bg-iso-bg', text: 'text-iso', border: 'border-iso' },
    soc2: { bg: 'bg-soc2-bg', text: 'text-soc2', border: 'border-soc2' },
    gdpr: { bg: 'bg-gdpr-bg', text: 'text-gdpr', border: 'border-gdpr' },
  };
  return map[frameworkId] || { bg: 'bg-stone-low', text: 'text-steel', border: 'border-stone-high' };
}

export function getMappingTypeColor(type) {
  const map = {
    equivalent: { bg: 'bg-equivalent-bg', text: 'text-equivalent', fill: '#2d7d4e' },
    partial: { bg: 'bg-partial-bg', text: 'text-partial', fill: '#9a6b1a' },
    gap: { bg: 'bg-gap-bg', text: 'text-gap', fill: '#b53a3a' },
  };
  return map[type] || { bg: 'bg-stone-low', text: 'text-steel', fill: '#575e6d' };
}
