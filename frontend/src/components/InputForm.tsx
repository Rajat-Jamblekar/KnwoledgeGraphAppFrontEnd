// InputForm.tsx
import React, { useState } from 'react';
import {
  Grid, Paper, TextField, Select, MenuItem, InputLabel, FormControl,
  Button, Typography
} from '@mui/material';

const InputForm: React.FC = () => {
  const [source, setSource] = useState('');
  const [sourceType, setSourceType] = useState('Symptom');
  const [relation, setRelation] = useState('indicates');
  const [target, setTarget] = useState('');
  const [targetType, setTargetType] = useState('Disease');
  const [file, setFile] = useState<File | null>(null);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: 'rgba(255,255,255,0.85)' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="Source Entity" value={source} onChange={(e) => setSource(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Source Type</InputLabel>
            <Select value={sourceType} label="Source Type" onChange={(e) => setSourceType(e.target.value)}>
              {['Symptom', 'Disease', 'Treatment', 'Specialist'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Relation Type</InputLabel>
            <Select value={relation} label="Relation Type" onChange={(e) => setRelation(e.target.value)}>
              {['indicates', 'treated by', 'managed by', 'prescribed by'].map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="Target Entity" value={target} onChange={(e) => setTarget(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Target Type</InputLabel>
            <Select value={targetType} label="Target Type" onChange={(e) => setTargetType(e.target.value)}>
              {['Symptom', 'Disease', 'Treatment', 'Specialist'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display="flex" alignItems="flex-end">
          <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
            Add Relationship
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600} color="#004d40" mb={1}>Upload JSON or CSV file</Typography>
          <input type="file" accept=".json,.csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button variant="contained" sx={{ mt: 1 }}>
            Upload File
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InputForm;
