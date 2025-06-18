import { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import GraphView from "./components/GraphView";
import UploadForm from "./components/UploadForm";
import QueryPanel from "./components/QueryPanel";

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

function App() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const fetchGraph = async () => {
    const res = await axios.get<GraphData>("http://localhost:5000/graph_data");
    setGraphData(res.data);
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Healthcare Diagnosis Network</h2>
      <InputForm onUpdate={fetchGraph} />
      <UploadForm onUpdate={fetchGraph} />
      <QueryPanel />
      <GraphView data={graphData} />
    </div>
  );
}

export default App;
