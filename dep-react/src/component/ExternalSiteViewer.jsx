import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ExternalSiteViewer = ({ url, title }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100vh', padding: 2 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Paper
        elevation={3}
        sx={{ width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden' }}
      >
        <iframe
          src={url}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Paper>
    </Box>
  );
};

export default ExternalSiteViewer;
