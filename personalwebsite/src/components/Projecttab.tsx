import React, { useState } from 'react';
import { Button, ButtonGroup, Typography, Box, Paper } from '@mui/material';

type Category = 'All' | 'Full-Stack' | 'Back-End' | 'Front-End';

interface Project {
  name: string;
  category: Exclude<Category, 'All'>;
  summary: string;
  stack: string;
}

const projects: Project[] = [
  {
    name: 'Panda-S E-Commerce Web Application',
    category: 'Full-Stack',
    summary:
      'Built a full-stack e-commerce platform with REST APIs, product/user management, and NoSQL persistence deployed on Azure. Implemented authentication, catalog search/filtering, and admin workflows.',
    stack: 'TypeScript, Angular, Node.js, Express, MongoDB, Azure',
  },
];

export default function RecentProjects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const visibleProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleTilt = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((px - 50) / 50) * 7;
    const rotateX = ((50 - py) / 50) * 7;

    target.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    target.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    target.style.setProperty('--px', `${px.toFixed(1)}%`);
    target.style.setProperty('--py', `${py.toFixed(1)}%`);
  };

  const resetTilt = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty('--tilt-x', '0deg');
    target.style.setProperty('--tilt-y', '0deg');
    target.style.setProperty('--px', '50%');
    target.style.setProperty('--py', '50%');
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 4, md: 7 },
        px: 2,
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      {/* Section Title */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, color: 'var(--ink-900)' }}>
        Recent Projects
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-700)' }}>
        Selected project work with production-ready architecture and cloud deployment.
      </Typography>

      {/* Filter Buttons */}
      <ButtonGroup
        variant="outlined"
        aria-label="project categories"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1.25,
          flexWrap: 'wrap',
          '& .MuiButton-root': {
            borderRadius: '20px',
            textTransform: 'none',
            px: 3,
            borderColor: 'rgba(15, 33, 55, 0.28)',
            color: 'var(--ink-900)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            fontWeight: 700,
          },
          '& .MuiButton-root.Mui-selected': {
            background: 'linear-gradient(120deg, var(--accent-700), var(--teal-500))',
            color: '#fff',
            borderColor: 'transparent',
            '&:hover': {
              opacity: 0.93,
            },
          },
        }}
      >
        {(['All', 'Full-Stack', 'Back-End', 'Front-End'] as Category[]).map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'Mui-selected' : ''}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      <Box
        sx={{
          mt: 4,
          display: 'grid',
          gap: 2,
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 520px))',
        }}
      >
        {visibleProjects.map((project, idx) => (
          <Paper
            key={project.name}
            elevation={0}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            sx={{
              p: 2.5,
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              border: '1px solid rgba(15, 33, 55, 0.15)',
              background: 'rgba(255, 255, 255, 0.78)',
              boxShadow: '0 18px 32px rgba(15, 33, 55, 0.1)',
              animation: `cardSlideIn 420ms ease ${idx * 60}ms both`,
              transform:
                'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(0)',
              transformStyle: 'preserve-3d',
              transition: 'transform 220ms ease, box-shadow 220ms ease',
              '&:hover': {
                boxShadow: '0 24px 42px rgba(15, 33, 55, 0.18)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                  'radial-gradient(220px circle at var(--px, 50%) var(--py, 50%), rgba(255, 255, 255, 0.42), transparent 64%)',
              },
              '@keyframes cardSlideIn': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Typography sx={{ color: 'var(--teal-500)', fontWeight: 700, mb: 0.8 }}>
              {project.category}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              {project.name}
            </Typography>
            <Typography sx={{ color: 'var(--ink-700)', mb: 1.25 }}>
              {project.summary}
            </Typography>
            <Typography sx={{ color: 'var(--accent-800)', fontWeight: 700 }}>
              {project.stack}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
