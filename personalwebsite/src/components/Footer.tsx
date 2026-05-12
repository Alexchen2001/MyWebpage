import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

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
        color: 'var(--ink-900)',
        py: 3,
        px: { xs: 2, md: 3 },
        textAlign: 'center',
        borderRadius: 4,
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: 'var(--panel-shadow)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        <Link
          href="https://linkedin.com/in/aybc2001"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.1,
            color: 'var(--ink-900)',
            fontWeight: 700,
            fontSize: '1.24rem',
          }}
        >
          <LinkedInIcon sx={{ fontSize: 44 }} />
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
            gap: 1.1,
            color: 'var(--ink-900)',
            fontWeight: 700,
            fontSize: '1.24rem',
          }}
        >
          <GitHubIcon sx={{ fontSize: 44 }} />
          GitHub
        </Link>
        <Link
          href="mailto:Alexander.yb.chen@gmail.com"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.1,
            color: 'var(--ink-900)',
            fontWeight: 700,
            fontSize: '1.24rem',
          }}
        >
          <EmailRoundedIcon sx={{ fontSize: 44 }} />
          Alexander.yb.chen@gmail.com
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
