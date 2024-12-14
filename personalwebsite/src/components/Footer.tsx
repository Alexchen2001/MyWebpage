import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: 'primary.main', // Use theme's primary color
        color: 'white',
        py: 2, // Padding top and bottom
        mt: 5, // Margin top to separate from other content
        textAlign: 'center', // Center align the text
        position: 'relative',
        bottom: 0,
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Alexander Chen. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Built with Material-UI and React.
      </Typography>
    </Box>
  );
};

export default Footer;