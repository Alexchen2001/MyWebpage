import React, { JSX } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import avatar from './assets/avatar.jpg';

function ProfileAvatar(): JSX.Element {
  return (
    <Box sx={{ mt: { xs: 4, md: 8 }, px: 2 }}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
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
                width: { xs: 220, md: 310 },
                height: { xs: 220, md: 310 },
                border: '6px solid rgba(255,255,255,0.75)',
                boxShadow: '0 30px 60px rgba(10, 21, 36, 0.35)',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileAvatar;
