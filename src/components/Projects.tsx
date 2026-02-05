import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import projectsData from "../data/projects.json";
import ProjectCard from "./Projects/ProjectCard";
interface ProjectsProps {
    isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
    const projects = projectsData;
    const { t } = useTranslation();

    return (
        <section id="projects" className="px-[6%] py-20 relative scroll-mt-[15px]">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`
                        text-4xl md:text-5xl font-bold mb-12 pb-2 text-center
                        ${isDarkMode
                            ? "bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"
                        }
                    `}
                >
                    {t("projects.title")}
                </motion.h2>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                isDarkMode={isDarkMode}
                                title={project.title}
                                description={project.description}
                                techStack={project.techStack}
                                liveLink={project.liveLink}
                                gradientDark={project.gradientDark}
                                gradientLight={project.gradientLight}
                                colorTop={project.colorTop}
                                status={project.status}
                                githubLink={project.githubLink}
                                description_en={project.description_en}
                                title_en={project.title_en}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
