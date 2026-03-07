import React, { JSX } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import avatar from './assets/avatar.jpg';

function ProfileAvatar(): JSX.Element {
  return (
    <Box sx={{ mt: { xs: 2, md: 5 }, px: 2, maxWidth: 1100, mx: 'auto' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid size={{ xs: 12, md: 6.8 }}>
          <Box
            sx={{
              p: { xs: 2.5, md: 3.2 },
              borderRadius: 5,
              border: '1px solid rgba(255, 255, 255, 0.48)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(222,233,251,0.68))',
              boxShadow: '0 28px 70px rgba(15, 22, 42, 0.2)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.05,
                mb: 1,
                fontWeight: 800,
              }}
            >
              Alex Chen
            </Typography>
            <Typography sx={{ color: 'var(--ink-700)', mb: 2.5, maxWidth: 550 }}>
              Backend-focused software engineer building cloud systems, data pipelines, and product experiences that
              scale from prototype to production.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {['MSCS @ Georgia Tech', 'Backend Engineer', 'Web3 + Cloud'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 999,
                    background: 'rgba(14, 165, 164, 0.14)',
                    border: '1px solid rgba(14, 165, 164, 0.35)',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    color: 'var(--ink-900)',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.1, flexWrap: 'wrap' }}>
              <Button
                href="https://linkedin.com/in/aybc2001"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<LinkedInIcon />}
                sx={{
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  background: 'linear-gradient(120deg, var(--violet-500), var(--teal-500))',
                }}
              >
                LinkedIn
              </Button>
              <Button
                href="https://github.com/Alexchen2001"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  borderColor: 'rgba(18, 26, 45, 0.35)',
                  color: 'var(--ink-900)',
                }}
              >
                GitHub
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5.2, lg: 4.2 }}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              animation: 'floatPortrait 7s ease-in-out infinite',
              '@keyframes floatPortrait': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-14px)' },
              },
            }}
          >
            <Avatar
              alt="Profile Avatar"
              src={avatar}
              sx={{
                width: { xs: 200, sm: 230, md: 280, lg: 300 },
                height: { xs: 200, sm: 230, md: 280, lg: 300 },
                border: '8px solid rgba(255,255,255,0.8)',
                boxShadow: '0 36px 66px rgba(10, 21, 36, 0.35)',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileAvatar;
