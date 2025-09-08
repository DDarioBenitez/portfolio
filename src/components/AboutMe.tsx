import techData from "../data/technologies.json";
import AboutMeTechBadge from "./AboutMe/AboutMeTechBadge";
interface AboutMeProps {
    isDarkMode: boolean;
}
export default function AboutMe({ isDarkMode }: AboutMeProps) {
    const data = techData;

    return (
        <section id="about" className="px-[6%] py-20 relative scroll-mt-[15px]">
            <div className="max-w-6xl mx-auto relative z-10">
                <p
                    className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
                        isDarkMode
                            ? "bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    }`}
                >
                    Sobre mi
                </p>
                <div className="grid md:grid-cols-2 gap-12 ">
                    <div>
                        <h3
                            className={`text-2xl font-semibold mb-6 bg-gradient-to-r ${
                                isDarkMode ? "from-cyan-500 to-blue-500" : "from-blue-600 to-indigo-600"
                            } bg-clip-text text-transparent`}
                        >
                            Hola Soy Dario mucho gusto
                        </h3>
                        <p className="text-lg mt-2 font-regular text-text-secondary leading-relaxed mb-8 mx-auto text-center md:mx-0 md:text-left">
                            Soy desarrollador fullstack con experiencia en proyectos reales, tanto en el ecosistema JavaScript/TypeScript (Node.js,
                            React, Next.js, NestJS) como en Java con SpringBoot. Me especializo en diseñar arquitecturas robustas, optimizar lógica de
                            negocio y crear interfaces modernas y funcionales.
                            <br />
                            Me caracterizo por la proactividad, la comunicación clara y la capacidad de resolver problemas de forma autónoma o en
                            equipo. Disfruto enfrentar desafíos técnicos con una mentalidad analítica y orientada a resultados.
                            <br />
                            Siempre estoy en busca de nuevos proyectos y oportunidades donde pueda aportar soluciones escalables y eficientes que
                            generen impacto en el mundo real.
                        </p>
                    </div>
                    <article className="flex flex-col gap-8 md:gap-0  mx-auto text-center">
                        <h3
                            className={`text-2xl font-semibold mb-6 bg-gradient-to-r ${
                                isDarkMode ? "from-emerald-500 to-teal-500" : "from-emerald-600 to-green-700"
                            } bg-clip-text text-transparent`}
                        >
                            Tecnologias con las que trabajo principalmente
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-lg font-medium text-text-primary">
                            {data.languages.map((tech) => {
                                return (
                                    <AboutMeTechBadge key={tech.name} isDarkMode={isDarkMode} name={tech.name} icon={tech.icon} color={tech.color} />
                                );
                            })}
                            {data.technologies.map((tech) => {
                                return (
                                    <AboutMeTechBadge key={tech.name} isDarkMode={isDarkMode} name={tech.name} icon={tech.icon} color={tech.color} />
                                );
                            })}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
