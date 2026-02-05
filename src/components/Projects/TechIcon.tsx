import React from "react";
import { motion } from "framer-motion";
import { useOptimizedAnimations } from "../../hooks/useOptimizedAnimations";
import { FaReact, FaNodeJs, FaAngular, FaVuejs, FaGitAlt, FaDocker } from "react-icons/fa";
import {
    SiTypescript,
    SiTailwindcss,
    SiPostgresql,
    SiMongodb,
    SiNestjs,
    SiPrisma,
    SiSocketdotio,
    SiExpress,
    SiFirebase,
    SiRedis,
    SiAmazon,
    SiGooglecloud,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const techIcons: Record<string, React.ReactNode> = {
    // Frontend
    React: <FaReact className="text-[#61DAFB]" />,
    "Next.js": <TbBrandNextjs className="text-[#000000]" />,
    "Vue.js": <FaVuejs className="text-[#4FC08D]" />,
    Angular: <FaAngular className="text-[#DD0031]" />,
    TypeScript: <SiTypescript className="text-[#3178C6]" />,
    "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
    Vite: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vite.svg" alt="Vite" className="w-5 h-5" />,

    // Backend
    "Node.js": <FaNodeJs className="text-[#339933]" />,
    NestJS: <SiNestjs className="text-[#E0234E]" />,
    "Express.js": <SiExpress className="text-[#000000]" />,
    "Socket.IO": <SiSocketdotio className="text-[#010101]" />,

    // Database
    PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
    MongoDB: <SiMongodb className="text-[#47A248]" />,
    Prisma: <SiPrisma className="text-[#2D3748]" />,
    Redis: <SiRedis className="text-[#DC382D]" />,

    // DevOps & Cloud
    Docker: <FaDocker className="text-[#2496ED]" />,
    Firebase: <SiFirebase className="text-[#FFCA28]" />,
    "Firebase Auth": (
        <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg"
            alt="Firebase Auth"
            className="w-5 h-5"
        />
    ),
    "Firebase Storage": (
        <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg"
            alt="Firebase Storage"
            className="w-5 h-5"
        />
    ),
    AWS: <SiAmazon className="text-[#FF9900]" />,
    "Google Cloud": <SiGooglecloud className="text-[#4285F4]" />,
    Azure: <span className="text-[#0078D4]">Azure</span>,
    Git: <FaGitAlt className="text-[#F05032]" />,

    // AI & Telephony
    "React Flow": (
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M35 3H25C23.8954 3 23 3.89543 23 5V15C23 16.1046 23.8954 17 25 17H35C36.1046 17 37 16.1046 37 15V5C37 3.89543 36.1046 3 35 3Z"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
            ></path>
            <path
                d="M35 23H25C23.8954 23 23 23.8954 23 25V35C23 36.1046 23.8954 37 25 37H35C36.1046 37 37 36.1046 37 35V25C37 23.8954 36.1046 23 35 23Z"
                stroke="#1A192B"
                strokeWidth="2"
            ></path>
            <path
                d="M15 23H5C3.89543 23 3 23.8954 3 25V35C3 36.1046 3.89543 37 5 37H15C16.1046 37 17 36.1046 17 35V25C17 23.8954 16.1046 23 15 23Z"
                stroke="#1A192B"
                strokeWidth="2"
            ></path>
            <path
                d="M15 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V5C17 3.89543 16.1046 3 15 3Z"
                stroke="#1A192B"
                strokeWidth="2"
            ></path>
            <path
                d="M23 12C24.1046 12 25 11.1046 25 10C25 8.89543 24.1046 8 23 8C21.8954 8 21 8.89543 21 10C21 11.1046 21.8954 12 23 12Z"
                fill="currentColor"
            ></path>
            <path
                d="M30 19C31.1046 19 32 18.1046 32 17C32 15.8954 31.1046 15 30 15C28.8954 15 28 15.8954 28 17C28 18.1046 28.8954 19 30 19Z"
                fill="currentColor"
            ></path>
        </svg>
    ),
    Zadarma: (
        <img
            src="https://cdn.brandfetch.io/idA4ufTn29/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1764227028117"
            alt="Zadarma"
            className="w-5 h-5 rounded"
        />
    ),

    // Payment & ORM
    Stripe: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#635BFF]" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.7 7.7 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.3 7.3 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703" />
        </svg>
    ),
    Sequelize: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" alt="Sequelize" className="w-5 h-5" />
    ),

    // Default para tecnologías desconocidas
    default: <span className="text-slate-500">?</span>,
};

interface TechIconProps {
    tech: string;
    isDarkMode: boolean;
    className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, isDarkMode, className = "" }) => {
    const { getHoverProps, shouldAnimate } = useOptimizedAnimations();

    // Manejo especial para Retell AI según tema
    const getIcon = () => {
        if (tech === "Retell AI") {
            return <img src={isDarkMode ? "/src/assets/mark white.svg" : "/src/assets/mark black.svg"} alt="Retell AI" className="w-5 h-5" />;
        }
        return techIcons[tech] || techIcons["default"];
    };

    const icon = getIcon();

    if (!shouldAnimate) {
        return (
            <div
                className={`
          p-3 rounded-lg text-xl
          ${isDarkMode ? "bg-slate-800 border-slate-700 shadow-lg" : "bg-slate-100 border-slate-200 shadow-sm"}
          flex items-center justify-center
          ${className}
        `}
                title={tech}
            >
                {icon}
            </div>
        );
    }

    return (
        <motion.div
            {...getHoverProps}
            whileHover={
                shouldAnimate
                    ? {
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2, ease: "easeOut" },
                      }
                    : {}
            }
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
            animate={
                shouldAnimate
                    ? {
                          rotate: 0,
                          scale: 1,
                          transition: { duration: 0.1 },
                      }
                    : {}
            }
            className={`
        p-3 rounded-lg text-xl
        ${isDarkMode ? "bg-slate-800 border-slate-700 shadow-lg" : "bg-slate-100 border-slate-200 shadow-sm"}
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
