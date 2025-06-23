// src/components/InputForm.tsx
import React, { useState } from 'react';
import {
  Grid, TextField, Button, MenuItem, Paper, Typography, Box
} from '@mui/material';
import { uploadFile, addConcept } from '../utils/api';

const conceptTypes = ['Symptom', 'Disease', 'Treatment', 'Specialist'];
const relationTypes = ['indicates', 'treated by', 'managed by', 'prescribed by'];

const InputForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [sourceType, setSourceType] = useState('Symptom');
  const [relation, setRelation] = useState('indicates');
  const [target, setTarget] = useState('');
  const [targetType, setTargetType] = useState('Disease');
  const [file, setFile] = useState<File | null>(null);

  const handleAdd = async () => {
    if (!source || !relation || !target) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await addConcept({
        source,
        relation,
        target,
        source_type: sourceType,
        target_type: targetType
      });
      alert(response.message || 'Relationship added successfully.');
    } catch (err) {
      alert('Error adding relationship: ' + (err as Error).message);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    try {
      const response = await uploadFile(file);
      alert(response.message || 'File uploaded successfully.');
      setFile(null);
    } catch (err) {
      alert('Upload failed: ' + (err as Error).message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Medical Relationship
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Source Entity" value={source} onChange={e => setSource(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Source Type"
            select
            value={sourceType}
            onChange={e => setSourceType(e.target.value)}
            fullWidth
          >
            {conceptTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Relationship"
            select
            value={relation}
            onChange={e => setRelation(e.target.value)}
            fullWidth
          >
            {relationTypes.map(rel => (
              <MenuItem key={rel} value={rel}>{rel}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Target Entity" value={target} onChange={e => setTarget(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Target Type"
            select
            value={targetType}
            onChange={e => setTargetType(e.target.value)}
            fullWidth
          >
            {conceptTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" fullWidth onClick={handleAdd} sx={{ height: '100%' }}>
            Add Relationship
          </Button>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Typography variant="subtitle1">Upload JSON or CSV file</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <input
            type="file"
            accept=".json,.csv"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="outlined" onClick={handleUpload}>
            Upload File
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InputForm;
