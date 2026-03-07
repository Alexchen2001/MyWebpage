import { BlogCategory, BlogPost, CourseReflection } from '../types';

export const blogCategories: BlogCategory[] = [
  'Seattle University',
  'Georgia Institute of Technology',
  'Engineering',
];

export const blogPosts: BlogPost[] = [
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

export const seattleCourseReflections: CourseReflection[] = [
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
];

export const georgiaTechCourses: Array<Pick<CourseReflection, 'code' | 'course'>> = [
  { code: 'CS 6035', course: 'Intro To Info Security' },
  { code: 'CS 6200', course: 'Graduate Intro to OS' },
  { code: 'CS 6250', course: 'Computer Networks' },
  { code: 'CS 6310', course: 'Software Arch & Design' },
];
