import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getControlById, getMappingTypeColor } from '../utils/dataHelpers';
import { GraphCanvas, lightTheme } from 'reagraph';

export default function MappingGraph({ controlId, mappings }) {
  const navigate = useNavigate();

  const { nodes, edges } = useMemo(() => {
    const centerControl = getControlById(controlId);
    if (!centerControl) return { nodes: [], edges: [] };

    const nodeList = [
      {
        id: centerControl.id,
        label: centerControl.code,
        fill: '#1e2a4a',
        size: 12,
      },
    ];

    const edgeList = [];
    const addedNodes = new Set([centerControl.id]);

    mappings.forEach((mapping) => {
      const relatedControl = getControlById(mapping.relatedControlId);
      if (!relatedControl) return;

      if (!addedNodes.has(relatedControl.id)) {
        const typeColor = getMappingTypeColor(mapping.type);
        nodeList.push({
          id: relatedControl.id,
          label: relatedControl.code,
          fill: typeColor.fill,
          size: 8,
        });
        addedNodes.add(relatedControl.id);
      }

      edgeList.push({
        id: mapping.id + '-' + mapping.direction,
        source: mapping.direction === 'outbound' ? centerControl.id : relatedControl.id,
        target: mapping.direction === 'outbound' ? relatedControl.id : centerControl.id,
        label: `${mapping.score}`,
      });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [controlId, mappings]);

  const handleNodeClick = useCallback(
    (node) => {
      if (node.id !== controlId) {
        navigate(`/control/${node.id}`);
      }
    },
    [controlId, navigate]
  );

  if (nodes.length === 0) return null;

  return (
    <div className="w-full h-[500px] rounded-xl border border-border bg-white overflow-hidden">
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        labelType="all"
        draggable
        animated
        layoutType="forceDirected2d"
        theme={{
          ...lightTheme,
          canvas: { background: '#ffffff' },
          node: {
            ...lightTheme.node,
            fill: '#1e2a4a',
            activeFill: '#2a3a5c',
            label: {
              ...lightTheme.node.label,
              color: '#1e293b',
              activeColor: '#1e2a4a',
              fontSize: 10,
            },
          },
          edge: {
            ...lightTheme.edge,
            fill: '#cbd5e1',
            activeFill: '#94a3b8',
            label: {
              ...lightTheme.edge.label,
              color: '#94a3b8',
              fontSize: 8,
            },
          },
        }}
      />
    </div>
  );
}
