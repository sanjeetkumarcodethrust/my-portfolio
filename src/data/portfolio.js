import {
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTool,
} from 'react-icons/fi';
import { SiGeeksforgeeks } from 'react-icons/si';

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const heroRoles = ['Full Stack Developer', 'MERN Stack Developer', 'DSA Enthusiast'];

export const heroStats = [
  { label: 'Problems Solved', value: '800+' },
  { label: 'Core Stack', value: 'MERN' },
  { label: 'Location', value: 'Pune, India' },
];

export const highlights = [
  {
    icon: FiMapPin,
    title: 'Based in Pune',
    description: 'Building polished experiences from Pune, Maharashtra, with a focus on scalable web products.',
  },
  {
    icon: FiBriefcase,
    title: 'Problem Solver',
    description: 'Strong DSA foundation with 800+ coding problems solved and a mindset shaped by continuous iteration.',
  },
  {
    icon: FiCode,
    title: 'Modern Builder',
    description: 'Comfortable across frontend craft, backend APIs, and clean developer workflows that keep shipping smooth.',
  },
];

export const skillGroups = [
  {
    title: 'Languages',
    icon: FiCode,
    items: [
      { name: 'C++', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    title: 'Frontend',
    icon: FiLayers,
    items: [
      { name: 'HTML', level: 94 },
      { name: 'CSS', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'Redux', level: 80 },
    ],
  },
  {
    title: 'Backend',
    icon: FiDatabase,
    items: [
      { name: 'Node.js', level: 86 },
      { name: 'Express.js', level: 84 },
    ],
  },
  {
    title: 'Database & Tools',
    icon: FiTool,
    items: [
      { name: 'MongoDB', level: 86 },
      { name: 'MySQL', level: 80 },
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 84 },
      { name: 'Postman', level: 79 },
      { name: 'VS Code', level: 92 },
    ],
  },
];

export const fallbackProjects = [
  {
    id: 1,
    title: 'Myzon - E-commerce App',
    description:
      'A MERN commerce platform with JWT authentication, seamless cart and checkout flows, and responsive storefront design.',
    tech_stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github_url: 'https://github.com/sanjeetkumarcodethrust',
    live_url: 'https://example.com/myzon',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Job Portal',
    description:
      'A role-based hiring platform for recruiters and candidates with secure APIs, posting workflows, and application tracking.',
    tech_stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    github_url: 'https://github.com/sanjeetkumarcodethrust',
    live_url: 'https://example.com/job-portal',
    category: 'Recruitment',
  },
  {
    id: 3,
    title: 'URL Shortener',
    description:
      'A backend-focused short-link service with optimized queries, reliable redirects, and a clean API surface for link management.',
    tech_stack: ['Node.js', 'Express', 'SQL', 'Redis'],
    github_url: 'https://github.com/sanjeetkumarcodethrust',
    live_url: 'https://example.com/url-shortener',
    category: 'Backend',
  },
];

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sanjeetkumarcodethrust',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sanjeet-kumar-b2292a249/',
    icon: FiLinkedin,
  },
  {
    label: 'GeeksforGeeks',
    href: 'https://www.geeksforgeeks.org/user/sanjeetcs8t/',
    icon: SiGeeksforgeeks,
  },
  {
    label: 'Email',
    href: 'mailto:sanjeetkum960@gmail.com',
    icon: FiMail,
  },
];

export const contactDetails = [
  'Pune, Maharashtra, India',
  'sanjeetkum960@gmail.com',
  'Open to internships, freelance work, and impactful product teams',
  'Focused on high-performance web apps with thoughtful UI details',
];

export const education = {
  degree: 'B.E. Electronics & Telecommunication',
  duration: '2023 - 2027',
  summary:
    'Passionate Full Stack Developer (MERN) with strong DSA skills and 800+ problems solved.',
};

export const seo = {
  title: 'Sanjeet Kumar | Full Stack Developer Portfolio',
  description:
    'Premium developer portfolio for Sanjeet Kumar, featuring MERN projects, skills, resume, and Supabase-powered contact flow.',
  url: 'https://example.com',
};
