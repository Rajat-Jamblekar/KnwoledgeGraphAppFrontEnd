import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import InputForm from './InputForm';
import QuerySection from './QuerySection';
import Graph from './Graph';

const App: React.FC = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
      color: '#0f3057',
      py: 2,
      fontFamily: 'Inter, sans-serif',
    }}>
      <Container maxWidth="lg">
        <Header />
        <InputForm />
        <QuerySection />
        <Graph />
      </Container>
    </Box>
  );
};

export default App;