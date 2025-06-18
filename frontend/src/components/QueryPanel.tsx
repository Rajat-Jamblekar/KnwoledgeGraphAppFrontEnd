// src/components/QueryPanel.tsx
import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

export default function QueryPanel() {
  const [symptom, setSymptom] = useState("");
  const [disease, setDisease] = useState("");
  const [condition, setCondition] = useState("");

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<string[]>([]);
  const [specialists, setSpecialists] = useState<string[]>([]);

  const handleDiagnosisQuery = async () => {
    const res = await axios.get("http://localhost:5000/query_diagnosis", { params: { symptom } });
    setDiagnoses(res.data);
  };

  const handleTreatmentQuery = async () => {
    const res = await axios.get("http://localhost:5000/query_treatments", { params: { disease } });
    setTreatments(res.data);
  };

  const handleSpecialistQuery = async () => {
    const res = await axios.get("http://localhost:5000/query_specialists", { params: { condition } });
    setSpecialists(res.data);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h6">Query Medical Knowledge</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField label="Symptom" value={symptom} onChange={e => setSymptom(e.target.value)} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleDiagnosisQuery}>Find Diagnoses</Button>
        </Grid>
        <Grid item>
          <TextField label="Disease" value={disease} onChange={e => setDisease(e.target.value)} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleTreatmentQuery}>Find Treatments</Button>
        </Grid>
        <Grid item>
          <TextField label="Disease/Treatment" value={condition} onChange={e => setCondition(e.target.value)} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSpecialistQuery}>Find Specialists</Button>
        </Grid>
      </Grid>

      <div style={{ marginTop: "10px" }}>
        {diagnoses.length > 0 && (
          <Typography>Diagnoses: {diagnoses.join(", ")}</Typography>
        )}
        {treatments.length > 0 && (
          <Typography>Treatments: {treatments.join(", ")}</Typography>
        )}
        {specialists.length > 0 && (
          <Typography>Specialists: {specialists.join(", ")}</Typography>
        )}
      </div>
    </div>
  );
}
