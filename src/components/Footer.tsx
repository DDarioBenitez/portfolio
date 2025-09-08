import { Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

interface FooterProps {
    isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
    return (
        <footer className={`bg-bg-nav/70 backdrop-blur-md border-t ${isDarkMode ? "border-gray-700" : "border-[#E5E7EB]"} px-[6%] py-8 relative`}>
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    {/* Logo */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                        <img
                            src={isDarkMode ? "/logo_dario_negro_resized.png" : "/logo_dario_transparente_resized.png"}
                            alt="Dario Benitez Logo"
                            className="h-10 w-auto transition-opacity duration-300 mb-3"
                        />
                        <p className="text-text-muted text-sm max-w-xs">Creando experiencias web modernas con tecnologías de vanguardia.</p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Links
                        </h4>
                        <div className="flex gap-6">
                            <a
                                className="text-text-muted hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 text-sm font-semibold"
                                href="#home"
                            >
                                Home
                            </a>
                            <a
                                className="text-text-muted hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:bg-clip-text transition-all duration-300 text-sm font-semibold"
                                href="#about"
                            >
                                About
                            </a>
                            <a
                                className="text-text-muted hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:bg-clip-text transition-all duration-300 text-sm font-semibold"
                                href="#projects"
                            >
                                Proyectos
                            </a>
                            <a
                                className="text-text-muted hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:bg-clip-text transition-all duration-300 text-sm font-semibold"
                                href="#contact"
                            >
                                Contacto
                            </a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            Contactame
                        </h4>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/dariobenitez"
                                className="p-2.5 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-110 group"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <SiGithub size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                            </a>
                            <a
                                href="https://linkedin.com/in/dariobenitez"
                                className="p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110 group"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <SiLinkedin size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                            </a>
                            <a
                                href="mailto:benitez_trabaja@hotmail.com"
                                className="p-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 group"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Email"
                            >
                                <Mail size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divisor */}
                <div className={`w-full h-px ${isDarkMode ? "bg-gray-700" : "bg-[#E5E7EB]"} mb-3`}></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                    {/* Copyright */}
                    <p className="text-text-muted text-sm">© {new Date().getFullYear()} Dario Benitez. Todos los derechos reservados.</p>
                    <div className="flex flex-col items-center gap-2 text-xs sm:flex-row sm:gap-4">
                        <span className="text-text-muted flex items-center gap-1 text-center sm:text-left">
                            Construido con
                            <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-medium">
                                React, Vite, TypeScript
                            </span>
                            &
                            <span className="text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text font-medium">Tailwind CSS</span>
                        </span>

                        <span className="hidden sm:inline text-text-muted">•</span>

                        <span className="text-text-muted">Argentina</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
