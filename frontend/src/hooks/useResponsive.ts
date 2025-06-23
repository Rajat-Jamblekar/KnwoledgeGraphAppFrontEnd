// hooks/useGraphHighlight.ts
import { useEffect } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  [key: string]: any;
}

interface Link {
  source: string | Node;
  target: string | Node;
  [key: string]: any;
}

export const useGraphHighlight = (
  svgRef: React.RefObject<SVGSVGElement>,
  simulation: d3.Simulation<Node, Link> | null,
  highlightedNodes: string[] = []
) => {
  useEffect(() => {
    if (!svgRef.current || !simulation) return;

    const svg = d3.select(svgRef.current);

    // Reset all nodes and links first
    svg.selectAll('circle')
      .attr('opacity', 1)
      .attr('stroke', null)
      .attr('stroke-width', null);

    svg.selectAll('.links line')
      .attr('opacity', 1)
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2);

    svg.selectAll('.labels text')
      .attr('opacity', 1);

    // Highlight matching nodes
    svg.selectAll('circle')
      .filter((d: Node) => highlightedNodes.includes(d.id))
      .attr('opacity', 1)
      .attr('stroke', '#f57c00')
      .attr('stroke-width', 3);

    // Highlight connected links
    svg.selectAll('.links line')
      .filter((d: Link) => 
        highlightedNodes.includes((d.source as Node).id) || 
        highlightedNodes.includes((d.target as Node).id)
      )
      .attr('opacity', 1)
      .attr('stroke', '#f57c00')
      .attr('stroke-width', 3);

    // Optionally, dim the rest of the nodes and links
    svg.selectAll('circle')
      .filter((d: Node) => !highlightedNodes.includes(d.id))
      .attr('opacity', 0.25);

    svg.selectAll('.links line')
      .filter((d: Link) => 
        !highlightedNodes.includes((d.source as Node).id) && 
        !highlightedNodes.includes((d.target as Node).id)
      )
      .attr('opacity', 0.1);

  }, [svgRef, simulation, highlightedNodes]);
};
