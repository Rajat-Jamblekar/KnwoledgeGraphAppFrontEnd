// Header.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Header: React.FC = () => (
  <Box textAlign="center" mb={4}>
    <Typography variant="h3" fontWeight={900} color="#00796b">
      Healthcare Diagnosis Network
    </Typography>
  </Box>
);

export default Header;