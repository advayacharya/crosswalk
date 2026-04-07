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
        fill: '#2563a8', // Steel Blue
        size: 15,
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
          size: 10,
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
    <div className="w-full h-[600px] ghost-border rounded-xl bg-white overflow-hidden shadow-sm">
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
            fill: '#2563a8',
            activeFill: '#004b8b',
            label: {
              ...lightTheme.node.label,
              color: '#161b2a',
              activeColor: '#2563a8',
              fontSize: 12,
            },
          },
          edge: {
            ...lightTheme.edge,
            fill: 'rgba(194, 198, 210, 0.4)',
            activeFill: '#2563a8',
            label: {
              ...lightTheme.edge.label,
              color: '#575e6d',
              fontSize: 9,
            },
          },
        }}
      />
    </div>
  );
}
