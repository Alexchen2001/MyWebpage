import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { blogCategories, blogPosts, georgiaTechCourses, seattleCourseReflections } from '../data/blog';
import { BlogCategory } from '../types';

const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('Seattle University');
  const [selectedCourse, setSelectedCourse] = useState<string>(seattleCourseReflections[0].code);
  const [selectedGeorgiaCourse, setSelectedGeorgiaCourse] = useState<string>(georgiaTechCourses[0].code);
  const filteredPosts = blogPosts.filter((post) => post.category === selectedCategory);
  const selectedCourseReflection = seattleCourseReflections.find((item) => item.code === selectedCourse);
  const selectedGeorgiaCourseItem = georgiaTechCourses.find((item) => item.code === selectedGeorgiaCourse);

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, px: 2, maxWidth: 1100, mx: 'auto', width: '100%' }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, color: 'var(--ink-900)' }}>
        Blog
      </Typography>
      <Typography sx={{ color: 'var(--ink-700)', mb: 3.5 }}>
        Writing about software engineering, backend architecture, and product-focused development.
      </Typography>

      <ButtonGroup
        variant="outlined"
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiButton-root': {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 700,
            borderColor: 'rgba(99, 102, 241, 0.35)',
            color: 'var(--ink-900)',
            background: 'var(--panel-bg-soft)',
          },
        }}
      >
        {blogCategories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              if (category === 'Seattle University') {
                setSelectedCourse(seattleCourseReflections[0].code);
              }
              if (category === 'Georgia Institute of Technology') {
                setSelectedGeorgiaCourse(georgiaTechCourses[0].code);
              }
            }}
            sx={
              selectedCategory === category
                ? {
                    background: 'linear-gradient(120deg, var(--accent-700), var(--violet-500))',
                    color: '#fff',
                    borderColor: 'transparent',
                  }
                : undefined
            }
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      {selectedCategory === 'Seattle University' ? (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1.15fr 1.85fr' } }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 3,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              background: 'var(--panel-bg)',
              boxShadow: '0 18px 35px rgba(1, 4, 12, 0.28)',
              maxHeight: 420,
              overflowY: 'auto',
            }}
          >
            {seattleCourseReflections.map((item) => (
              <Button
                key={item.code}
                onClick={() => setSelectedCourse(item.code)}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontWeight: 700,
                  mb: 0.6,
                  borderRadius: 1.5,
                  color: selectedCourse === item.code ? '#fff' : 'var(--ink-900)',
                  background:
                    selectedCourse === item.code
                      ? 'linear-gradient(120deg, var(--accent-700), var(--violet-500))'
                      : 'rgba(16, 26, 56, 0.74)',
                  '&:hover': {
                    background:
                      selectedCourse === item.code
                        ? 'linear-gradient(120deg, var(--accent-700), var(--violet-500))'
                        : 'rgba(20, 32, 66, 0.9)',
                  },
                }}
              >
                {item.code} - {item.course}
              </Button>
            ))}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              background: 'var(--panel-bg)',
              boxShadow: '0 18px 35px rgba(1, 4, 12, 0.28)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              {selectedCourseReflection?.code} - {selectedCourseReflection?.course}
            </Typography>
            <Typography sx={{ color: 'var(--ink-700)' }}>{selectedCourseReflection?.reflection}</Typography>
          </Paper>
        </Box>
      ) : selectedCategory === 'Georgia Institute of Technology' ? (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1.15fr 1.85fr' } }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 3,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              background: 'var(--panel-bg)',
              boxShadow: '0 18px 35px rgba(1, 4, 12, 0.28)',
              maxHeight: 420,
              overflowY: 'auto',
            }}
          >
            {georgiaTechCourses.map((item) => (
              <Button
                key={item.code}
                onClick={() => setSelectedGeorgiaCourse(item.code)}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontWeight: 700,
                  mb: 0.6,
                  borderRadius: 1.5,
                  color: selectedGeorgiaCourse === item.code ? '#fff' : 'var(--ink-900)',
                  background:
                    selectedGeorgiaCourse === item.code
                      ? 'linear-gradient(120deg, var(--accent-700), var(--violet-500))'
                      : 'rgba(16, 26, 56, 0.74)',
                  '&:hover': {
                    background:
                      selectedGeorgiaCourse === item.code
                        ? 'linear-gradient(120deg, var(--accent-700), var(--violet-500))'
                        : 'rgba(20, 32, 66, 0.9)',
                  },
                }}
              >
                {item.code} - {item.course}
              </Button>
            ))}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              background: 'var(--panel-bg)',
              boxShadow: '0 18px 35px rgba(1, 4, 12, 0.28)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              {selectedGeorgiaCourseItem?.code} - {selectedGeorgiaCourseItem?.course}
            </Typography>
          </Paper>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {filteredPosts.map((post) => (
            <Paper
              key={post.title}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid rgba(99, 102, 241, 0.2)',
                background: 'var(--panel-bg)',
                boxShadow: '0 18px 35px rgba(1, 4, 12, 0.28)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                {post.title}
              </Typography>
              <Typography sx={{ color: 'var(--ink-700)', mb: 2 }}>{post.excerpt}</Typography>
              <Link
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 700,
                  color: 'var(--teal-500)',
                }}
              >
                {post.cta}
                <OpenInNewRoundedIcon fontSize="small" />
              </Link>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BlogSection;
