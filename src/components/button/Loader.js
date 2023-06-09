import * as React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoader() {
  const buttonSx = {
    ...(success && {
      'bgcolor': green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        size={24}
        sx={{
          color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    </Box>
  );
}
