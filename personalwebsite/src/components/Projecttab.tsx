import React, { useState } from 'react';
import { Button, ButtonGroup, Typography, Box } from '@mui/material';

export default function RecentProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 5,
        bgcolor: '#f8f8f8', // Light background color
      }}
    >
      {/* Section Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Recent Projects
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Some of the Projects I've worked on. Use the buttons to toggle the different categories.
      </Typography>

      {/* Filter Buttons */}
      <ButtonGroup
        variant="outlined"
        aria-label="project categories"
        sx={{
          display: 'flex', // Flex layout
          justifyContent: 'center', // Center buttons
          gap: 2, // Space between buttons
          '& .MuiButton-root': {
            borderRadius: '20px', // Rounded buttons
            textTransform: 'none', // Keep button text case as it is
            px: 3, // Padding inside buttons
          },
          '& .MuiButton-root.Mui-selected': {
            bgcolor: '#6200EA', // Active button background
            color: '#fff', // Active button text color
            borderColor: '#6200EA', // Active button border
            '&:hover': {
              bgcolor: '#5300D6', // Hover effect for active button
            },
          },
        }}
      >
        {['All', 'Full-Stack', 'Back-End', 'Front-End'].map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'Mui-selected' : ''}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      {/* Display Selected Category */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">
          Showing: <strong>{selectedCategory}</strong> Projects
        </Typography>
      </Box>
    </Box>
  );
}