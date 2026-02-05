import { useTranslation } from "react-i18next";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import TechIcon from "./TechIcon";
import { useOptimizedAnimations } from "../../hooks/useOptimizedAnimations";

interface ProjectCardProps {
    isDarkMode: boolean;
    title: string;
    description: string;
    techStack: string[];
    liveLink: string;
    gradientDark: string;
    gradientLight: string;
    colorTop: string;
    status?: string;
    githubLink?: string;
    description_en: string;
    title_en?: string;
}

export default function ProjectCard({
    isDarkMode,
    title,
    description,
    techStack,
    liveLink,
    gradientDark,
    gradientLight,
    colorTop,
    status,
    githubLink,
    description_en,
    title_en,
}: ProjectCardProps) {
    const { i18n } = useTranslation();
    const { getScrollAnimationProps, getHoverProps, shouldAnimate } = useOptimizedAnimations();
    const currentLang = i18n.language;

    const text = currentLang.startsWith("en") ? description_en : description;
    const textWithLang = currentLang.startsWith("en") && title_en ? title_en : title;

    return (
        <motion.article
            {...getScrollAnimationProps}
            {...(shouldAnimate ? getHoverProps : {})}
            whileHover={
                shouldAnimate
                    ? {
                          scale: 1.02,
                          y: -8,
                          transition: { duration: 0.1 },
                      }
                    : {}
            }
            className={`
                glass-card relative overflow-hidden rounded-2xl
                bg-bg-proyect-card border-border-proyect-card
                transition-all duration-300 h-full flex flex-col
            `}
        >
            {/* Barra de color superior */}
            <div className={`h-2 w-full bg-gradient-to-r ${colorTop}`} />

            <div className="p-6 flex-grow flex flex-col justify-between">
                {/* Título */}
                <motion.div className="group inline-block" {...(shouldAnimate ? { whileHover: { scale: 1.05 } } : {})}>
                    <h3
                        className={`
                            text-text-proyect-card text-xl font-semibold transition-all duration-300
                            ${
                                isDarkMode
                                    ? "text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                                    : "text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                            }
                            ${isDarkMode ? gradientDark : gradientLight}
                        `}
                    >
                        {textWithLang}
                    </h3>
                </motion.div>

                {/* Descripción */}
                <p className="text-[16px] text-text-secondary leading-relaxed mt-3 mb-4">{text}</p>

                {/* Stack de tecnologías */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TechIcon tech={tech} isDarkMode={isDarkMode} className="scale-100" />
                        </motion.div>
                    ))}
                </div>

                {/* Enlaces de acción */}
                <div className="flex gap-4 justify-center">
                    {status === "prod" && liveLink ? (
                        <motion.a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg
                                bg-gradient-to-r ${colorTop} text-white
                                font-semibold shadow-lg hover:shadow-xl
                                transition-all duration-300
                            `}
                        >
                            <span>Visitar Sitio</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </motion.a>
                    ) : (
                        <motion.div
                            className={`
                                px-4 py-2 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap
                                ${status === "prod" ? `bg-gradient-to-r ${colorTop} text-white shadow-md` : "text-text-muted italic"}
                            `}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {status === "prod" ? (
                                <>
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-sm">Producción</span>
                                </>
                            ) : (
                                <span>En desarrollo</span>
                            )}
                        </motion.div>
                    )}

                    {githubLink && githubLink.trim() !== "" ? (
                        <motion.a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                 flex items-center gap-2 px-4 py-2 rounded-lg
                                 ${isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}
                                 font-semibold transition-all duration-300
                             `}
                        >
                            <SiGithub size={16} />
                            <span>Ver Código</span>
                        </motion.a>
                    ) : (
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-text-muted italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <SiGithub size={16} />
                            <span>Repo Privado</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
