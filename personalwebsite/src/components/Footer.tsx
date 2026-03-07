import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        maxWidth: 1240,
        mx: 'auto',
        mt: 3,
        mb: 3,
        color: '#eef4fb',
        py: 3,
        px: 2,
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(120deg, #0f2137, #1b3f66)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 14px 30px rgba(10, 21, 36, 0.25)',
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
