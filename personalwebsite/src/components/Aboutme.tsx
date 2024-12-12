import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ProfilePic from './assets/infoPic.jpg';
import ResumePDF from './assets/Resume_AlexanderChen.pdf'; // Ensure you have the file in your assets folder

// Define Props
interface ProfileSectionProps {
  primaryColor: string; // Color for the cards
  buttonColor: string; // Color for the button
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  primaryColor,
  buttonColor,
}) => {
  return (
    <Box sx={{ py: 10, px: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section: Avatar */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Avatar
              src={ProfilePic}
              alt="Profile Avatar"
              variant="square"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                borderRadius: 2,
              }}
            />
          </Paper>
        </Grid>

        {/* Right Section: About Me Content */}
        <Grid item xs={12} md={7}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#333',
                mb: 2,
              }}
            >
              About Me
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { title: 'SDE Experience', value: '12 Month Internship' },
                { title: 'Projects', value: '50+ Completed' },
                { title: 'Corporate Experience', value: '7 Years Employment' },
              ].map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      textAlign: 'center',
                      py: 3,
                      px: 2,
                      bgcolor: primaryColor,
                      color: '#fff',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="body1">{stat.value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Description Section */}
            <Typography
              variant="body1"
              sx={{ color: '#666', lineHeight: 1.8, mb: 4 }}
            >
              Good to see you here! I’m Alexander Chen, but you can call me Alex. I’m an approachable
                            software engineer with a dream of transitioning into a teaching profession later in my career.
                            As a Pacific Islander who journeyed across the globe to Washington, I strive to bring cultural
                            diversity and a unique user perspective to the world of coding.
              <br />
              <br />
              I’m a recent graduate who completed an incredible, exploratory adventure at Seattle
                            University, and I’m continuing my journey of honing my artistic touch in software development.
                            Let’s just say, who doesn’t love Agile workflows? I thrive in collaborative environments, so if
                            you’re someone who embraces this framework—hooray for the Agile league!
            </Typography>

            {/* Button Section */}
            <Button
              variant="contained"
              sx={{
                bgcolor: buttonColor,
                color: '#fff',
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: buttonColor, // Optionally adjust hover color here
                },
              }}
              href={ResumePDF} // Link to the resume file
              download="AlexanderChen_Resume.pdf" // Custom filename for the downloaded file
              endIcon={<span>📝</span>}
            >
              Download Resume
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileSection;
