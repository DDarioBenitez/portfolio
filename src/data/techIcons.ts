// Este archivo exporta configuraciones de iconos para tecnologías
// Los componentes reales se renderizarán en TechIcon.tsx

export interface TechIconConfig {
  icon: string;
  color: string;
}

const techIcons: Record<string, TechIconConfig> = {
  // Frontend
  'React': { icon: 'FaReact', color: '#61DAFB' },
  'Next.js': { icon: 'TbBrandNextjs', color: '#000000' },
  'Vue.js': { icon: 'FaVuejs', color: '#4FC08D' },
  'Angular': { icon: 'FaAngular', color: '#DD0031' },
  'TypeScript': { icon: 'SiTypescript', color: '#3178C6' },
  'Tailwind CSS': { icon: 'SiTailwindcss', color: '#06B6D4' },
  'Vite': { icon: 'SiVite', color: '#646CFF' },
  
  // Backend
  'Node.js': { icon: 'FaNodeJs', color: '#339933' },
  'NestJS': { icon: 'SiNestjs', color: '#E0234E' },
  'Express.js': { icon: 'SiExpress', color: '#000000' },
  'Socket.IO': { icon: 'SiSocketdotio', color: '#010101' },
  
  // Database
  'PostgreSQL': { icon: 'SiPostgresql', color: '#4169E1' },
  'MongoDB': { icon: 'SiMongodb', color: '#47A248' },
  'Prisma': { icon: 'SiPrisma', color: '#2D3748' },
  'Redis': { icon: 'SiRedis', color: '#DC382D' },
  
  // DevOps & Cloud
  'Docker': { icon: 'FaDocker', color: '#2496ED' },
  'Firebase': { icon: 'SiFirebase', color: '#FFCA28' },
  'AWS': { icon: 'SiAmazonaws', color: '#FF9900' },
  'Google Cloud': { icon: 'SiGooglecloud', color: '#4285F4' },
  'Azure': { icon: 'SiMicrosoftazure', color: '#0078D4' },
  'Git': { icon: 'FaGitAlt', color: '#F05032' }
};

export default techIcons;