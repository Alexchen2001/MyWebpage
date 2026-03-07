import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

type BlogCategory = 'Seattle University' | 'Georgia Institute of Technology' | 'Engineering';

interface BlogPost {
  category: BlogCategory;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
}

const categories: BlogCategory[] = [
  'Seattle University',
  'Georgia Institute of Technology',
  'Engineering',
];

const posts: BlogPost[] = [
  {
    category: 'Seattle University',
    title: 'Seattle University Journey',
    excerpt:
      'Coursework reflections, software engineering project development progression, and student engineering notes.',
    href: 'https://linkedin.com/in/aybc2001',
    cta: 'Read on LinkedIn',
  },
  {
    category: 'Georgia Institute of Technology',
    title: 'Georgia Tech Graduate Notes',
    excerpt:
      'Graduate-level systems and security learning logs, plus architecture and network-focused writeups.',
    href: 'https://linkedin.com/in/aybc2001',
    cta: 'Read on LinkedIn',
  },
  {
    category: 'Engineering',
    title: 'Code Deep Dives and Build Logs',
    excerpt:
      'Project-level technical notes, implementation details, and code experiments published alongside repositories.',
    href: 'https://github.com/Alexchen2001',
    cta: 'View on GitHub',
  },
];

const seattleCourseReflections = [
  { code: 'CPSC-2500', course: 'Computer Organization', reflection: 'I learned how processors, memory, and instruction pipelines work together, which changed how I think about performance at the hardware level.' },
  { code: 'CPSC-2430', course: 'Data Structures', reflection: 'I gained a practical foundation for choosing the right structure for time/space tradeoffs in real implementations.' },
  { code: 'CPSC-2600', course: 'Foundations of Computer Science', reflection: 'This course strengthened my formal reasoning and helped me write more rigorous, logically sound solutions.' },
  { code: 'CPSC-3300', course: 'Fundamentals of Databases', reflection: 'I learned relational modeling, normalization, and query design, which improved how I design backend data layers.' },
  { code: 'CPSC-3500', course: 'Computing Systems', reflection: 'I developed a systems mindset around concurrency, resource management, and low-level behavior across software layers.' },
  { code: 'CPSC-3200', course: 'Object-Oriented Development', reflection: 'I improved at designing maintainable class structures and using abstraction/encapsulation effectively.' },
  { code: 'CPSC-3400', course: 'Languages and Computation', reflection: 'This course deepened my understanding of automata, grammars, and the theory behind language design.' },
  { code: 'CPSC-4100', course: 'Design & Analysis of Algorithms', reflection: 'I became more disciplined at proving correctness and comparing algorithmic complexity before coding.' },
  { code: 'CPSC-4800', course: 'Technical Communication & Project Management', reflection: 'I learned to communicate technical work clearly and manage team delivery with better planning and stakeholder alignment.' },
  { code: 'CPSC-4870', course: 'Software Engineering & Project Development I', reflection: 'I built strong fundamentals in team workflows, requirements handling, and iterative software delivery.' },
  { code: 'CPSC-4880', course: 'Software Engineering & Project Development II', reflection: 'I improved at scaling team collaboration, code quality practices, and structured feature development.' },
  { code: 'CPSC-4710', course: 'Security in Computing', reflection: 'I gained a stronger security-first mindset around threat modeling, vulnerabilities, and defensive design.' },
  { code: 'CPSC-4240', course: 'Software as a Service', reflection: 'I learned full-stack SaaS architecture patterns, deployment concerns, and how product decisions affect system design.' },
  { code: 'CPSC-5250', course: 'Mobile Software Development', reflection: 'I developed mobile engineering skills around responsive UI, app lifecycle constraints, and platform-aware design.' },
  { code: 'CPSC-5220', course: 'User Experience Design', reflection: 'This course taught me to prioritize usability and user research, not just implementation speed.' },
  { code: 'CPSC-4330', course: 'Big Data Analytics', reflection: 'I learned how to work with large-scale data pipelines and extract insights using distributed processing concepts.' },
  { code: 'CPSC-4890', course: 'Software Engineering & Project Development III', reflection: 'I refined end-to-end engineering execution by balancing architecture, delivery speed, and production readiness.' },
] as const;

const georgiaTechCourses = [
  { code: 'CS 6035', course: 'Intro To Info Security' },
  { code: 'CS 6200', course: 'Graduate Intro to OS' },
  { code: 'CS 6250', course: 'Computer Networks' },
  { code: 'CS 6310', course: 'Software Arch & Design' },
] as const;

const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('Seattle University');
  const [selectedCourse, setSelectedCourse] = useState<string>(seattleCourseReflections[0].code);
  const [selectedGeorgiaCourse, setSelectedGeorgiaCourse] = useState<string>(georgiaTechCourses[0].code);
  const filteredPosts = posts.filter((post) => post.category === selectedCategory);
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
        {categories.map((category) => (
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
