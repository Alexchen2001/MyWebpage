import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ProfilePic from './assets/infoPic.jpg';
import ResumePDF from './assets/Resume_AlexanderChen.pdf'; // Ensure you have the file in your assets folder
import { aboutDescription, aboutStats, aboutSummary, education, skills } from '../data/about';

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
    <Box
      sx={{
        py: { xs: 4, md: 7 },
        px: 2,
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <Grid container spacing={{ xs: 2.5, md: 4 }} justifyContent="center" alignItems="flex-start">
        {/* Left Section: Avatar */}
        <Grid size={{ xs: 12, md: 5, lg: 4.5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.2,
              borderRadius: 4,
              background: 'var(--panel-bg-soft)',
              border: '1px solid var(--panel-border)',
              boxShadow: 'var(--panel-shadow)',
            }}
          >
            <Avatar
              src={ProfilePic}
              alt="Profile Avatar"
              variant="square"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                borderRadius: 3,
                transform: 'rotate(-1deg)',
                filter: 'saturate(1.06)',
              }}
            />
          </Paper>
        </Grid>

        {/* Right Section: About Me Content */}
        <Grid size={{ xs: 12, md: 7, lg: 7.5 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: 'var(--ink-900)',
                mb: 1.5,
              }}
            >
              About Me
            </Typography>
            <Typography sx={{ color: 'var(--ink-700)', mb: 3.5 }}>{aboutSummary}</Typography>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ mb: 4 }} alignItems="flex-end">
              {aboutStats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      textAlign: 'center',
                      py: 2.2,
                      px: 2,
                      background: `linear-gradient(145deg, ${primaryColor}, var(--violet-500))`,
                      color: '#f8fafc',
                      borderRadius: 3.2,
                      boxShadow: '0 18px 34px rgba(5, 14, 27, 0.2)',
                      minHeight: { xs: 120, sm: `${Math.round(170 * stat.level)}px` },
                      transition: 'transform 260ms ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                      },
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
              sx={{ color: 'var(--ink-700)', lineHeight: 1.9, mb: 4 }}
            >
              {aboutDescription[0]}
              <br />
              <br />
              {aboutDescription[1]}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--ink-900)', mb: 1.5 }}>
              Education
            </Typography>
            <Box sx={{ mb: 3.5 }}>
              {education.map((item) => (
                <Paper
                  key={item.school}
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 1.5,
                    borderRadius: 3,
                    border: '1px solid rgba(99, 102, 241, 0.16)',
                    background: 'var(--panel-bg)',
                  }}
                >
                  <Typography sx={{ fontWeight: 800, color: 'var(--ink-900)' }}>{item.school}</Typography>
                  <Typography sx={{ color: 'var(--ink-700)', fontWeight: 600 }}>
                    {item.degree} (GPA: {item.gpa})
                  </Typography>
                  <Typography sx={{ color: 'var(--ink-700)' }}>
                    {item.date} | {item.location}
                  </Typography>
                  <Typography sx={{ color: 'var(--ink-700)', mt: 0.6 }}>
                    Relevant coursework: {item.coursework}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--ink-900)', mb: 1.5 }}>
              Technical Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {skills.map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    px: 1.4,
                    py: 0.7,
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--ink-900)',
                    border: '1px solid rgba(14, 165, 164, 0.28)',
                    background: 'var(--panel-bg)',
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>

            {/* Button Section */}
            <Button
              variant="contained"
              sx={{
                background: `linear-gradient(120deg, ${buttonColor}, var(--accent-600))`,
                color: '#fff',
                px: 3.5,
                py: 1.4,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 16px 30px rgba(180, 83, 9, 0.35)',
                transition: 'transform 220ms ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                },
              }}
              href={ResumePDF} // Link to the resume file
              download="AlexanderChen_Resume.pdf" // Custom filename for the downloaded file
              endIcon={<DownloadRoundedIcon />}
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
