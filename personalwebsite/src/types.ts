export interface CardData{
    jobname: string;
    exptype: string;
    employmentlocation: string;
    employmentdate: string;
    buttonText: string;
    highlights?: string[];
    track?: ExperienceTrack;
  }

export type ExperienceTrack = 'Software Engineering' | 'Marketing Operations' | 'Education Teaching';

export interface EducationItem {
  school: string;
  degree: string;
  gpa: string;
  date: string;
  location: string;
  coursework: string;
}

export interface StatItem {
  title: string;
  value: string;
  level: number;
}

export interface ProjectItem {
  name: string;
  category: 'Full-Stack' | 'Back-End' | 'Front-End';
  summary: string;
  stack: string;
}

export type BlogCategory = 'Seattle University' | 'Georgia Institute of Technology' | 'Engineering';

export interface BlogPost {
  category: BlogCategory;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
}

export interface CourseReflection {
  code: string;
  course: string;
  reflection: string;
}


  export {};
  
