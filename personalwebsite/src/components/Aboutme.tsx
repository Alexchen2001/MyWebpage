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

// Define Props
interface ProfileSectionProps {
  primaryColor: string; // Color for the cards
  buttonColor: string; // Color for the button
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  primaryColor,
  buttonColor,
}) => {
  const education = [
    {
      school: 'Georgia Institute of Technology',
      degree: 'Master of Science in Computer Science',
      gpa: '4.00/4.00',
      date: 'August 2025 - Present',
      location: 'Atlanta, GA',
      coursework: 'Software Architecture & Design, Computer Networks',
    },
    {
      school: 'Seattle University',
      degree: 'Bachelor of Science in Computer Science',
      gpa: '3.615/4.00',
      date: 'September 2022 - June 2024',
      location: 'Seattle, WA',
      coursework:
        'Data Structures and Algorithms (C++), Computer Architecture, Operating Systems, Software as a Service (Full-stack), Mobile Development (Flutter), User Experience, Big Data Analytics',
    },
  ];

  const skills = [
    'C++',
    'C#',
    'Python',
    'Java',
    'JavaScript',
    'TypeScript',
    'Dart',
    'SQL (MySQL)',
    'Node.js',
    'React',
    'Angular',
    'ASP.NET Core',
    'Express',
    'Flutter',
    'Firebase',
    'Google Maps Platform',
    'AWS',
    'Azure',
    'Docker',
    'Git',
    'Blockchain (NFT)',
    'MongoDB',
    'Spark',
    'Hadoop',
    'Hive',
    'Airtable',
  ];

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
              p: 2,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.66)',
              border: '1px solid rgba(255, 255, 255, 0.55)',
              boxShadow: '0 22px 55px rgba(15, 33, 55, 0.18)',
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
            <Typography sx={{ color: 'var(--ink-700)', mb: 3.5 }}>
              Software Engineer focused on backend systems, data pipelines, and full-stack product delivery.
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { title: 'Graduate GPA', value: '4.00/4.00' },
                { title: 'Production Events', value: '300K Planned Scale' },
                { title: 'Coverage Achieved', value: '100% Unit Tests' },
              ].map((stat, index) => (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      py: 3,
                      px: 2,
                      background: `linear-gradient(160deg, ${primaryColor}, var(--teal-500))`,
                      color: '#f8fafc',
                      borderRadius: 3,
                      boxShadow: '0 18px 34px rgba(5, 14, 27, 0.2)',
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
              I am Alexander Chen, a computer science graduate student at Georgia Tech and software engineer with hands-on
              experience across backend services, cloud automation, and full-stack delivery.
              <br />
              <br />
              My recent work includes Firebase and API ownership for a Web3 music platform, serverless NLP pipelines
              on AWS, and .NET medical imaging improvements. I enjoy building reliable systems that balance product speed
              and technical quality.
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
                    borderRadius: 2.5,
                    border: '1px solid rgba(15, 33, 55, 0.12)',
                    background: 'rgba(255,255,255,0.7)',
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
                    border: '1px solid rgba(15, 33, 55, 0.2)',
                    background: 'rgba(255,255,255,0.72)',
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
