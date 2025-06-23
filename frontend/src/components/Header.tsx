// components/Header.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <Box component="header" textAlign="center" mb={4}>
      <Typography variant="h2" fontWeight={900} color="primary">
        Healthcare Diagnosis Network
      </Typography>
    </Box>
  );
};

export default Header;
