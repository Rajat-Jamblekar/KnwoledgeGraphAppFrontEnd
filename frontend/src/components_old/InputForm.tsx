import { TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface InputFormProps {
  onUpdate: () => void;
}

export default function InputForm({ onUpdate }: InputFormProps) {
  const [source, setSource] = useState("");
  const [relation, setRelation] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/add_concept", {
      source,
      relation,
      target,
    });
    onUpdate();
    setSource("");
    setRelation("");
    setTarget("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField label="Source" value={source} onChange={e => setSource(e.target.value)} />
      </Grid>
      <Grid item>
        <TextField label="Relation" value={relation} onChange={e => setRelation(e.target.value)} />
      </Grid>
      <Grid item>
        <TextField label="Target" value={target} onChange={e => setTarget(e.target.value)} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
