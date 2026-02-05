import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaAngular, 
  FaVuejs,
  FaGitAlt,
  FaDocker
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiPostgresql,
  SiMongodb,
  SiNestjs,
  SiPrisma,
  SiSocketdotio,
  SiVite,
  SiExpress,
  SiFirebase,
  SiRedis,
  SiAmazon,
  SiGooglecloud
} from 'react-icons/si';
import { 
  TbBrandNextjs 
} from 'react-icons/tb';

const techIcons: Record<string, React.ReactNode> = {
  // Frontend
  'React': <FaReact className="text-[#61DAFB]" />,
  'Next.js': <TbBrandNextjs className="text-[#000000]" />,
  'Vue.js': <FaVuejs className="text-[#4FC08D]" />,
  'Angular': <FaAngular className="text-[#DD0031]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'Vite': <SiVite className="text-[#646CFF]" />,
  
  // Backend
  'Node.js': <FaNodeJs className="text-[#339933]" />,
  'NestJS': <SiNestjs className="text-[#E0234E]" />,
  'Express.js': <SiExpress className="text-[#000000]" />,
  'Socket.IO': <SiSocketdotio className="text-[#010101]" />,
  
  // Database
  'PostgreSQL': <SiPostgresql className="text-[#4169E1]" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Prisma': <SiPrisma className="text-[#2D3748]" />,
  'Redis': <SiRedis className="text-[#DC382D]" />,
  
  // DevOps & Cloud
  'Docker': <FaDocker className="text-[#2496ED]" />,
  'Firebase': <SiFirebase className="text-[#FFCA28]" />,
  'AWS': <SiAmazon className="text-[#FF9900]" />,
  'Google Cloud': <SiGooglecloud className="text-[#4285F4]" />,
  'Azure': <span className="text-[#0078D4]">Azure</span>,
  'Git': <FaGitAlt className="text-[#F05032]" />,
  
  // Default para tecnologías desconocidas
  'default': <span className="text-slate-500">?</span>
};

interface TechIconProps {
  tech: string;
  isDarkMode: boolean;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, isDarkMode, className = "" }) => {
  const icon = techIcons[tech] || techIcons['default'];

  return (
    <motion.div
      whileHover={{ 
        scale: 1.15, 
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        p-2 rounded-lg
        ${isDarkMode 
          ? 'bg-slate-800 border-slate-700 shadow-lg' 
          : 'bg-slate-100 border-slate-200 shadow-sm'
        }
        flex items-center justify-center
        ${className}
      `}
      title={tech}
    >
      {icon}
    </motion.div>
  );
};

export default TechIcon;