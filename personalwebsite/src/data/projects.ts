import { ProjectItem } from '../types';

export type ProjectCategory = 'All' | 'Full-Stack' | 'Back-End' | 'Front-End';

export const projectCategories: ProjectCategory[] = ['All', 'Full-Stack', 'Back-End', 'Front-End'];

export const projects: ProjectItem[] = [
  {
    name: 'Panda-S E-Commerce Web Application',
    category: 'Full-Stack',
    summary:
      'Built a full-stack e-commerce platform with REST APIs, product/user management, and NoSQL persistence deployed on Azure. Implemented authentication, catalog search/filtering, and admin workflows.',
    stack: 'TypeScript, Angular, Node.js, Express, MongoDB, Azure',
  },
  {
    name: 'Eco-Panda Mobile App',
    category: 'Full-Stack',
    summary:
      'Advanced development and testing of a mobile app focused on carbon footprint awareness. Built with Flutter for Android/iOS with intuitive cross-platform UI/UX, seamless backend integration, efficient data management, and Firebase-backed deployment for performance optimization.',
    stack: 'Flutter, Dart, SQL, JavaScript',
  },
];
