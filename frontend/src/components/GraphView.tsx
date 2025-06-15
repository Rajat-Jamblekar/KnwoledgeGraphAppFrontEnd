import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node {
  id: string;
}

interface Link {
  source: string;
  target: string;
  label: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface GraphViewProps {
  data: GraphData | null;
}

export default function GraphView({ data }: GraphViewProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600, height = 400;

    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, any>(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#aaa");

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", "#69b3a2")
      .call(d3.drag()
        .on("start", dragstart)
        .on("drag", dragged));

    const text = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => d.id)
      .attr("dx", 12)
      .attr("dy", ".35em");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);

      text
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    function dragstart(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
}
