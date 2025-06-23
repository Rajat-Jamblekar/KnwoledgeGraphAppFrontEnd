// src/App.tsx
import React from 'react';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import InputForm from '././components/InputForm';
import QueryForm from '././components/QueryForm';
import GraphViewer from '././components/GraphViewer';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
          minHeight: '100vh',
          paddingBottom: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" fontWeight={900} align="center" color="primary.dark" gutterBottom>
            Healthcare Diagnosis Network
          </Typography>

          <Box sx={{ my: 4 }}>
            <InputForm />
          </Box>

          <Box sx={{ my: 4 }}>
            <QueryForm />
          </Box>

          <Box sx={{ my: 4 }}>
            <GraphViewer />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default App;
