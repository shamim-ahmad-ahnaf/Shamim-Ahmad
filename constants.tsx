
import { Project, Skill } from './types';

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, category: 'Frameworks' },
  { name: 'Next.js', level: 92, category: 'Frameworks' },
  { name: 'JavaScript', level: 95, category: 'Languages' },
  { name: 'TypeScript', level: 88, category: 'Languages' },
  { name: 'Tailwind CSS', level: 98, category: 'Frameworks' },
  { name: 'HTML5/CSS3', level: 100, category: 'Languages' },
  { name: 'Bootstrap', level: 85, category: 'Frameworks' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'GitHub', level: 94, category: 'Tools' },
  { name: 'Figma', level: 90, category: 'Tools' },
  { name: 'PostgreSQL', level: 82, category: 'Backend' },
  { name: 'Gemini AI', level: 85, category: 'Tools' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern E-Commerce Engine',
    description: 'A full-featured e-commerce platform where users can browse products, add to cart, and perform secure payments via Stripe integration. Fully responsive and optimized for speed.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'Fullstack'
  },
  {
    id: '2',
    title: 'AI Smart Task Manager',
    description: 'A task management application powered by the Gemini AI that analyzes your daily to-do list and suggests priorities. Features voice command support and smart scheduling.',
    techStack: ['Next.js', 'Gemini API', 'TypeScript', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=1000',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'Fullstack'
  },
  {
    id: '3',
    title: 'PixelPerfect Portfolio Template',
    description: 'A high-end portfolio template designed for developers, featuring glassmorphism elements, dark mode, and smooth scroll animations.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    category: 'Frontend'
  }
];
