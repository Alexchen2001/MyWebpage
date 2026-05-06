import React, { useState } from 'react';
import gsap from 'gsap';
import { Button, ButtonGroup, Typography, Box, Paper } from '@mui/material';
import { projectCategories, ProjectCategory, projects } from '../data/projects';
import { ProjectItem } from '../types';
import { useGsapTilt } from '../hooks/useGsapTilt';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const tilt = useGsapTilt(cardRef, { rotate: 7, lift: 0 });

  React.useLayoutEffect(() => {
    const target = cardRef.current;
    if (!target) {
      return undefined;
    }

    const animation = gsap.fromTo(
      target,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.42, delay: index * 0.06, ease: 'power3.out' }
    );

    return () => animation.kill();
  }, [index]);

  return (
    <Paper
      ref={cardRef}
      elevation={0}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      sx={{
        p: 2.5,
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid rgba(99, 102, 241, 0.2)',
        background: 'var(--panel-bg)',
        boxShadow: '0 18px 32px rgba(1, 4, 12, 0.46)',
        transformStyle: 'preserve-3d',
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
  );
};

export default function RecentProjects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
  };

  const visibleProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
        Project Spotlight
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
            background: 'var(--panel-bg-soft)',
            fontWeight: 700,
          },
          '& .MuiButton-root.Mui-selected': {
            background: 'linear-gradient(120deg, var(--accent-700), var(--violet-500))',
            color: '#fff',
            borderColor: 'transparent',
            '&:hover': {
              opacity: 0.93,
            },
          },
        }}
      >
        {projectCategories.map((category) => (
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
          <ProjectCard key={project.name} project={project} index={idx} />
        ))}
      </Box>
    </Box>
  );
}
