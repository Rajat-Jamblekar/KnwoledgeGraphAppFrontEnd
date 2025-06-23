// src/components/GraphViewer.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Paper, Typography } from '@mui/material';
import { fetchGraph } from '../utils/api';

interface NodeData {
  id: string;
  type: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface EdgeData {
  source: string;
  target: string;
  relation: string;
}

interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}

const GraphViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetchGraph().then(drawGraph).catch(err => {
      console.error('Failed to load graph:', err);
    });
  }, []);

  const drawGraph = (data: GraphData) => {
    const width = 960;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render
    svg.attr('width', width).attr('height', height);

    if (!data.nodes.length) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#999')
        .text('No data. Add concepts to view the graph.');
      return;
    }

    const colorScale = d3.scaleOrdinal<string>()
      .domain(['Symptom', 'Disease', 'Treatment', 'Specialist', 'Unknown'])
      .range(['#ff7043', '#29b6f6', '#66bb6a', '#ab47bc', '#9e9e9e']);

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.edges).id((d: any) => d.id).distance(120).strength(1))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#aaa')
      .selectAll('line')
      .data(data.edges)
      .join('line')
      .attr('stroke-width', 2);

    const edgeLabels = svg.append('g')
      .selectAll('text')
      .data(data.edges)
      .join('text')
      .text(d => d.relation)
      .attr('font-size', 10)
      .attr('fill', '#666');

    const node = svg.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 18)
      .attr('fill', d => colorScale(d.type || 'Unknown'))
      .call(drag(simulation));

    const labels = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', 12)
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      edgeLabels
        .attr('x', d => ((d.source as any).x + (d.target as any).x) / 2)
        .attr('y', d => ((d.source as any).y + (d.target as any).y) / 2);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      labels
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

    function drag(simulation: d3.Simulation<NodeData, undefined>) {
      return d3.drag<SVGCircleElement, NodeData>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Knowledge Graph Visualization
      </Typography>
      <svg ref={svgRef} style={{ width: '100%', height: 600, background: '#fff', borderRadius: 8 }} />
    </Paper>
  );
};

export default GraphViewer;
