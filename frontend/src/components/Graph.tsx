// Graph.tsx
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Paper, Box, IconButton, Stack, Tooltip } from '@mui/material';
import { ZoomIn, ZoomOut, Refresh, PanTool } from '@mui/icons-material';
import * as d3 from 'd3';

interface NodeData {
  id: string;
  cluster?: string;
}

export interface GraphRef {
  highlightNodes: (nodeIds: string[]) => void;
}

const Graph = forwardRef<GraphRef>((_, ref) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<Element, unknown> | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const nodeSelectionRef = useRef<d3.Selection<SVGCircleElement, NodeData, SVGGElement, unknown> | null>(null);

  useImperativeHandle(ref, () => ({
    highlightNodes(nodeIds: string[]) {
      if (!nodeSelectionRef.current) return;

      nodeSelectionRef.current.attr('opacity', 0.2).attr('stroke-width', 1);

      nodeSelectionRef.current
        .filter(d => nodeIds.includes(d.id))
        .attr('opacity', 1)
        .attr('stroke', '#f57c00')
        .attr('stroke-width', 3);
    },
  }));

  useEffect(() => {
    const container = refContainer.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = 600;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white')
      .style('border-radius', '16px')
      .node();

    if (!svg) return;
    svgRef.current = svg as SVGSVGElement;

    const g = d3.select(svg).append('g');
    gRef.current = g.node();

    zoomRef.current = d3.zoom<Element, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    d3.select(svg).call(zoomRef.current);

    const medicalGroups: Record<string, string> = {
      Cough: 'respiratory',
      Asthma: 'respiratory',
      Migraine: 'neurological',
      Epilepsy: 'neurological',
      'Heart Attack': 'cardiovascular',
      Ulcer: 'digestive',
      Fever: 'infectious'
    };

    const nodes: NodeData[] = Object.entries(medicalGroups).map(([id, cluster]) => ({ id, cluster }));

    const uniqueClusters = Array.from(new Set(nodes.map(n => n.cluster || 'other')));
    const clusterColor = d3.scaleOrdinal<string, string>()
      .domain(uniqueClusters)
      .range(d3.schemeSet2.concat(d3.schemeSet3).slice(0, uniqueClusters.length));

    const clusterY = d3.scalePoint()
      .domain(uniqueClusters)
      .range([80, height - 100])
      .padding(1);

    const nodeSelection = g.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => 120 + (i % 4) * 180)
      .attr('cy', d => clusterY(d.cluster || 'other')!)
      .attr('r', 25)
      .attr('fill', d => clusterColor(d.cluster || 'other'))
      .attr('stroke', '#333')
      .attr('stroke-width', 1.5);

    nodeSelectionRef.current = nodeSelection;

    g.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', (_, i) => 120 + (i % 4) * 180)
      .attr('y', d => clusterY(d.cluster || 'other')! + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text(d => d.id);

    const legend = g.selectAll('.legend')
      .data(uniqueClusters)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(${width - 160},${40 + i * 24})`);

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d => clusterColor(d));

    legend.append('text')
      .attr('x', 24)
      .attr('y', 14)
      .text(d => d)
      .attr('font-size', 12);

    d3.select(svg).on('dblclick', null);
    d3.select(svg).on('dblclick', () => {
      d3.select(svg).transition().duration(500).call(zoomRef.current!.transform, d3.zoomIdentity);
    });
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    const svg = d3.select(svgRef.current);
    if (!svgRef.current || !zoomRef.current) return;
    svg.transition().duration(300).call(
      zoomRef.current.scaleBy,
      direction === 'in' ? 1.2 : 0.8
    );
  };

  const handleReset = () => {
    const svg = d3.select(svgRef.current);
    if (!svgRef.current || !zoomRef.current) return;
    svg.transition().duration(500).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  const handlePan = () => {
    const svg = d3.select(svgRef.current);
    if (!svgRef.current || !zoomRef.current) return;
    svg.transition().duration(500).call(
      zoomRef.current.translateBy,
      100,
      0
    );
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 2, minHeight: 600, bgcolor: 'rgba(255,255,255,0.85)', position: 'relative' }}>
      <Box ref={refContainer} />
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
        <Tooltip title="Zoom In"><IconButton onClick={() => handleZoom('in')} size="small" sx={{ bgcolor: 'white' }}><ZoomIn /></IconButton></Tooltip>
        <Tooltip title="Zoom Out"><IconButton onClick={() => handleZoom('out')} size="small" sx={{ bgcolor: 'white' }}><ZoomOut /></IconButton></Tooltip>
        <Tooltip title="Pan Right"><IconButton onClick={handlePan} size="small" sx={{ bgcolor: 'white' }}><PanTool /></IconButton></Tooltip>
        <Tooltip title="Reset Zoom"><IconButton onClick={handleReset} size="small" sx={{ bgcolor: 'white' }}><Refresh /></IconButton></Tooltip>
      </Stack>
    </Paper>
  );
});

export default Graph;
