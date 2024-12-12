import React, { JSX } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import avatar from './assets/avatar.jpg';

function ProfileAvatar(): JSX.Element {
  return (
    <Box sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Box display="flex" justifyContent="center">
            {/* Material UI Avatar with customized size */}
            <Avatar
              alt="Profile Avatar"
              src={avatar}
              sx={{
                width: 300,
                height: 300,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileAvatar;
