import projectsData from "../data/projects.json";
import ProjectCard from "./Projects/ProjectCard";
interface ProjectsProps {
    isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
    const projects = projectsData;
    console.log(projects);

    return (
        <section id="projects" className="px-[6%] py-20 relative scroll-mt-[15px]">
            <div className="max-w-6xl mx-auto relative z-10">
                <h2
                    className={`text-4xl md:text-5xl font-bold mb-12 pb-2 text-center ${
                        isDarkMode
                            ? "bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"
                    }`}
                >
                    Proyectos Destacados
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
