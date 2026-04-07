import { useMemo } from 'react';
import { GraphCanvas, lightTheme } from 'reagraph';
import { getAllFrameworks, getMappingTypeColor } from '../utils/dataHelpers';

export default function GlobalNetworkGraph() {
  const frameworks = getAllFrameworks();

  const { nodes, edges } = useMemo(() => {
    const nodeList = [];
    const edgeList = [];
    const domainSet = new Set();

    frameworks.forEach((fw, idx) => {
      // Framework Node
      nodeList.push({
        id: fw.id,
        label: fw.name,
        fill: fw.id === 'iso27001' ? '#1a4fa8' : fw.id === 'soc2' ? '#2d5a6e' : '#2d6e45',
        size: 20,
        symbolType: 'circle',
      });

      // Domain Nodes
      fw.domains.forEach((domain) => {
        const domainId = `domain-${domain.replace(/\s+/g, '-').toLowerCase()}`;
        if (!domainSet.has(domainId)) {
          nodeList.push({
            id: domainId,
            label: domain,
            fill: '#575e6d',
            size: 10,
            symbolType: 'square',
          });
          domainSet.add(domainId);
        }

        // Edge between Framework and its Domain
        edgeList.push({
          id: `edge-${fw.id}-${domainId}`,
          source: fw.id,
          target: domainId,
          label: '',
        });
      });
    });

    // Add some cross-framework edges representing conceptual mappings
    // (Simplified logic for visualization)
    edgeList.push({ id: 'cross-1', source: 'domain-access-control', target: 'domain-logical-access', label: 'Mapped', fill: '#2563a8' });
    edgeList.push({ id: 'cross-2', source: 'domain-security', target: 'domain-system-operations', label: 'Aligned', fill: '#2563a8' });
    edgeList.push({ id: 'cross-3', source: 'domain-incident-management', target: 'domain-breach-notification', label: 'Connected', fill: '#2563a8' });

    return { nodes: nodeList, edges: edgeList };
  }, [frameworks]);

  return (
    <div className="w-full h-[500px] ghost-border rounded-xl bg-white overflow-hidden shadow-sm relative group">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-bold text-steel uppercase tracking-widest bg-stone-low/80 backdrop-blur px-2 py-1 rounded">
          Ecosystem Interconnectivity
        </h3>
      </div>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        labelType="all"
        draggable
        animated
        layoutType="forceDirected2d"
        theme={{
          ...lightTheme,
          canvas: { background: '#ffffff' },
          node: {
            ...lightTheme.node,
            label: {
              ...lightTheme.node.label,
              color: '#161b2a',
              fontSize: 10,
            },
          },
          edge: {
            ...lightTheme.edge,
            fill: 'rgba(194, 198, 210, 0.3)',
            label: {
              ...lightTheme.edge.label,
              color: '#575e6d',
              fontSize: 8,
            },
          },
        }}
      />
      <div className="absolute bottom-4 right-4 z-10 flex gap-4 text-[10px] font-bold text-steel uppercase tracking-tighter">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span>Framework</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-steel"></div>
          <span>Domain</span>
        </div>
      </div>
    </div>
  );
}
