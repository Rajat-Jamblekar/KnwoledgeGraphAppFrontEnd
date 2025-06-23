// src/components/QueryForm.tsx
import React, { useState } from 'react';
import {
  Grid, TextField, Button, Paper, Typography, Box, List, ListItem
} from '@mui/material';
import { queryDiagnoses, queryTreatments, querySpecialists } from '../utils/api';

const QueryForm: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [disease, setDisease] = useState('');
  const [entity, setEntity] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [title, setTitle] = useState('');

  const handleDiagnoses = async () => {
    if (!symptom) return alert('Enter a symptom');
    try {
      const res = await queryDiagnoses(symptom);
      setResults(res.diseases || []);
      setTitle(`Diagnoses for symptom "${symptom}"`);
    } catch (e) {
      alert('Error: ' + (e as Error).message);
    }
  };

  const handleTreatments = async () => {
    if (!disease) return alert('Enter a disease');
    try {
      const res = await queryTreatments(disease);
      setResults(res.treatments || []);
      setTitle(`Treatments for disease "${disease}"`);
    } catch (e) {
      alert('Error: ' + (e as Error).message);
    }
  };

  const handleSpecialists = async () => {
    if (!entity) return alert('Enter an entity');
    try {
      const res = await querySpecialists(entity);
      setResults(res.specialists || []);
      setTitle(`Specialists for "${entity}"`);
    } catch (e) {
      alert('Error: ' + (e as Error).message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Query Medical Knowledge Graph
      </Typography>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Symptom"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            fullWidth
          />
          <Button fullWidth variant="contained" onClick={handleDiagnoses} sx={{ mt: 1 }}>
            Search Diagnoses
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            fullWidth
          />
          <Button fullWidth variant="contained" onClick={handleTreatments} sx={{ mt: 1 }}>
            Search Treatments
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Disease or Treatment"
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            fullWidth
          />
          <Button fullWidth variant="contained" onClick={handleSpecialists} sx={{ mt: 1 }}>
            Search Specialists
          </Button>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        {results.length > 0 ? (
          <List dense>
            {results.map((item, index) => (
              <ListItem key={index}>• {item}</ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No results found.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default QueryForm;
