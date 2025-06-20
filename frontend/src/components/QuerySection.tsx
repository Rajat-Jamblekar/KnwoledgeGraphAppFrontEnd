// QuerySection.tsx
import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

const QuerySection: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [disease, setDisease] = useState('');
  const [entity, setEntity] = useState('');

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: 'rgba(255,255,255,0.85)' }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="Find Diagnoses for Symptom" value={symptom} onChange={(e) => setSymptom(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ mt: 1 }}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="Find Treatments for Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ mt: 1 }}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="Find Specialists for Entity" value={entity} onChange={(e) => setEntity(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ mt: 1 }}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography id="query-results" role="region" aria-live="polite" aria-atomic="true" mt={2}>
            <strong>Query results will appear here</strong>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuerySection;