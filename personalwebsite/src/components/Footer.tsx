import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        maxWidth: 1100,
        mx: 'auto',
        mt: 2,
        mb: 3,
        color: '#eef4fb',
        py: 3,
        px: { xs: 2, md: 3 },
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
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link
          href="https://linkedin.com/in/aybc2001"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            color: '#e6f4ff',
            fontWeight: 700,
          }}
        >
          <LinkedInIcon fontSize="small" />
          LinkedIn
        </Link>
        <Link
          href="https://github.com/Alexchen2001"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            color: '#e6f4ff',
            fontWeight: 700,
          }}
        >
          <GitHubIcon fontSize="small" />
          GitHub
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
