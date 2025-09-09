import { useTranslation } from "react-i18next";
import { SiGithub } from "react-icons/si";

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
    const currentLang = i18n.language;

    const text = currentLang.startsWith("en") ? description_en : description;
    const textWithLang = currentLang.startsWith("en") && title_en ? title_en : title;

    return (
        <article className="transition-all flex flex-col justify-between items-center duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl border group overflow-hidden bg-bg-tech-card border-border-proyect-card hover:border-hover-proyect-card-border">
            <div className={`h-2 w-full bg-gradient-to-r ${colorTop} transition-all duration-300 group-hover:scale-105`}></div>
            <div className="p-6 flex-grow flex flex-col justify-around ">
                <div className="group inline-block">
                    <h3
                        className={`text-text-proyect-card text-xl font-semibold transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                            isDarkMode ? gradientDark : gradientLight
                        }`}
                    >
                        {textWithLang}
                    </h3>
                </div>

                <p className="text-[16px] text-text-secondary leading-relaxed mt-2">{text}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                    {techStack.map((tech, index) => (
                        <p
                            key={index}
                            className={`bg-gradient-to-r ${colorTop} bg-opacity-20 text-transparent bg-clip-text px-2 py-1 rounded-full text-[16px] font-semibold border border-current border-opacity-20`}
                        >
                            {tech}
                        </p>
                    ))}
                </div>

                <div className="flex gap-4 p-6 py-0 mt-2 justify-center">
                    {status === "prod" ? (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-transparent bg-gradient-to-r ${colorTop} bg-clip-text hover:scale-105 transition-all duration-300 font-semibold cursor-pointer`}
                        >
                            Ir a la Web
                        </a>
                    ) : (
                        <span className="text-text-muted font-semibold italic">En desarrollo</span>
                    )}

                    {githubLink && githubLink.trim() !== "" ? (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-text-muted cursor-pointer hover:${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            } transition-colors duration-300 font-semibold`}
                        >
                            <SiGithub size={16} /> Ver Código
                        </a>
                    ) : (
                        <span className="flex items-center gap-2 text-text-muted italic">
                            <SiGithub size={16} /> Código privado
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
