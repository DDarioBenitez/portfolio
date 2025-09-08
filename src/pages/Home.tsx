"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail, MapPin } from "lucide-react";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = document.documentElement.getAttribute("data-theme");
        setIsDarkMode(theme === "dark");

        const obs = new MutationObserver(() => {
            const t = document.documentElement.getAttribute("data-theme");
            setIsDarkMode(t === "dark");
        });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => obs.disconnect();
    }, []);

    return (
        <div
            className={`home min-h-screen transition-all duration-500 isolate ${
                isDarkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900" : "bg-gradient-to-br from-blue-50 via-white to-cyan-50"
            }`}
        >
            <Header />
            <Hero isDarkMode={isDarkMode} />
            <section id="about" className="px-[6%] py-20 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2
                        className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
                            isDarkMode
                                ? "bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        }`}
                    >
                        Sobre mi
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 ">
                        <h3 className="text-lg font-regular text-text-secondary leading-relaxed mb-8 mx-auto text-center md:mx-0 md:text-left">
                            I'm a passionate fullstack developer with over 5 years of experience building scalable web applications. I love creating
                            efficient, user-friendly solutions that solve real-world problems. My expertise spans both frontend and backend
                            development, with a focus on modern technologies and best practices.
                        </h3>
                        <article className="flex flex-col gap-8 md:gap-0  mx-auto text-center">
                            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                Tecnologias con las que trabajo principalmente
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg font-medium text-text-primary">
                                <div
                                    className={`px-4 py-3 rounded-2xl text-center bg-bg-tech-card transition-all duration-300 hover:scale-105 transform border group 
                                ${isDarkMode ? "border-border-primary" : "border-border-secondary"}  hover:bg-hover-tech-card`}
                                >
                                    <span
                                        className={`bg-gradient-to-r ${
                                            isDarkMode ? "from-blue-500 to-indigo-600" : "from-red-500 to-pink-500"
                                        } bg-clip-text text-transparent font-semibold group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        React
                                    </span>
                                </div>
                                <div
                                    className={`px-4 py-3 rounded-2xl text-center bg-bg-tech-card transition-all duration-300 hover:scale-105 transform border group 
                                ${isDarkMode ? "border-border-primary" : "border-border-secondary"}  hover:bg-hover-tech-card`}
                                >
                                    <span
                                        className={`bg-gradient-to-r ${
                                            isDarkMode ? "from-blue-500 to-indigo-600" : "from-red-500 to-pink-500"
                                        } bg-clip-text text-transparent font-semibold group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        React
                                    </span>
                                </div>
                                <div
                                    className={`px-4 py-3 rounded-2xl text-center bg-bg-tech-card transition-all duration-300 hover:scale-105 transform border group 
                                ${isDarkMode ? "border-border-primary" : "border-border-secondary"}  hover:bg-hover-tech-card`}
                                >
                                    <span
                                        className={`bg-gradient-to-r ${
                                            isDarkMode ? "from-blue-500 to-indigo-600" : "from-red-500 to-pink-500"
                                        } bg-clip-text text-transparent font-semibold group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        React
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="projects" className="px-[6%] py-20 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2
                        className={`text-4xl md:text-5xl font-bold mb-12 pb-2 text-center ${
                            isDarkMode
                                ? "bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"
                                : "bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"
                        }`}
                    >
                        Proyectos Desarrollados
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article className="transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl border group overflow-hidden bg-bg-tech-card border-border-proyect-card hover:border-hover-proyect-card-border">
                            <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-105"></div>
                            <div className="p-6">
                                <div className="group inline-block">
                                    <h3
                                        className={`text-text-proyect-card text-xl font-semibold transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                                            isDarkMode
                                                ? "group-hover:from-[#A855F7] group-hover:to-[#A855F7]"
                                                : "group-hover:from-[#A855F7] group-hover:to-[#ec4899]"
                                        }`}
                                    >
                                        E-Commerce Plataform
                                    </h3>
                                </div>

                                <p className="text-[16px] text-text-secondary leading-relaxed mt-2">
                                    A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 text-transparent bg-clip-text px-2 py-1 rounded-full text-[16px] font-semibold border border-current border-opacity-20">
                                        Next.js
                                    </p>
                                    <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 text-transparent bg-clip-text px-2 py-1 rounded-full text-[16px] font-semibold border border-current border-opacity-20">
                                        PostgreSQL
                                    </p>
                                    <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 text-transparent bg-clip-text px-2 py-1 rounded-full text-[16px] font-semibold border border-current border-opacity-20">
                                        Stripe
                                    </p>
                                    <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 text-transparent bg-clip-text px-2 py-1 rounded-full text-[16px] font-semibold border border-current border-opacity-20">
                                        Tailwind CSS
                                    </p>
                                </div>
                                <div className="flex gap-4 p-6 py-0 mt-2 justify-center">
                                    <button className="flex items-center gap-2 text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text hover:scale-105 transition-all duration-300 font-semibold cursor-pointer">
                                        Ir a la Web
                                    </button>
                                    <button
                                        className={`flex items-center gap-2 text-text-muted cursor-pointer hover:${
                                            isDarkMode ? "text-gray-300" : " text-gray-600 "
                                        } transition-colors duration-300 font-semibold`}
                                    >
                                        <SiGithub size={16} /> Ver Codigo
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section id="contact" className="px-[6%]  pb-10 md:py-20 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2
                        className={`text-4xl md:text-5xl font-bold mb-8 pb-2 text-center ${
                            isDarkMode
                                ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                                : "bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
                        }`}
                    >
                        Trabajemos juntos
                    </h2>

                    <p className="text-2xl text-text-secondary mb-12 max-w-2xl mx-auto text-center">
                        I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to say hello, feel
                        free to reach out!
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-bg-tech-card border-border-proyect-card p-6 rounded-2xl border backdrop-blur-sm">
                            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Enviame un mensaje
                            </h3>
                            <form onSubmit={() => {}} className="space-y-4 bg-bg-form">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[16px] text-text-label font-medium" htmlFor="name">
                                        Nombre
                                    </label>
                                    <input
                                        className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[16px] text-text-label font-medium" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm w-full placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Tu email"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[16px] text-text-label font-medium" htmlFor="subject">
                                        Asunto
                                    </label>
                                    <input
                                        className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm w-full placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        placeholder="Asunto del mensaje"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[16px] text-text-label font-medium" htmlFor="message">
                                        Mensaje
                                    </label>
                                    <textarea
                                        className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm w-full min-h-[120px] resize-none placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                        name="message"
                                        id="message"
                                        placeholder="Tu mensaje"
                                    ></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        className="w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0 cursor-pointer text-white text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 "
                                    >
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col justify-center space-y-4 ">
                            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                                Informacion de contacto
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 group">
                                    <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                        <Mail className="text-white" size={20} />
                                    </div>
                                    <a
                                        href="mailto:benitez_trabaja@hotmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 "
                                    >
                                        benitez_trabaja@hotmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                        <SiLinkedin className="text-white" size={20} />
                                    </div>
                                    <a
                                        href="https://linkedin.com/in/dariobenitez"
                                        className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:bg-clip-text transition-all duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        linkedin.com/in/dariobenitez
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <div className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                        <SiGithub className="text-white" size={20} />
                                    </div>
                                    <a
                                        href="https://github.com/dariobenitez"
                                        className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:bg-clip-text transition-all duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        github.com/dariobenitez
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                Ubicacion
                            </h3>
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <MapPin className="text-white" size={19} />{" "}
                                </div>{" "}
                                <a
                                    href="https://www.google.com/maps/place/Argentina"
                                    className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:bg-clip-text transition-transform duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Argentina
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fondo decorativo claro */}

            <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
                <span className={`h-[520px] w-[520px] rounded-full ${!isDarkMode ? "bg-blue-400/10" : "bg-purple-500/20"} blur-3xl`} />
            </div>

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
                            <p className="text-text-muted text-sm max-w-xs">Creating modern web experiences with cutting-edge technologies.</p>
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
                        <p className="text-text-muted text-sm">© {new Date().getFullYear()} Dario Benitez. All rights reserved.</p>
                        <div className="flex flex-col items-center gap-2 text-xs sm:flex-row sm:gap-4">
                            <span className="text-text-muted flex items-center gap-1 text-center sm:text-left">
                                Construido con
                                <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-medium">
                                    React, Vite, TypeScript
                                </span>
                                &
                                <span className="text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text font-medium">
                                    Tailwind CSS
                                </span>
                            </span>

                            <span className="hidden sm:inline text-text-muted">•</span>

                            <span className="text-text-muted">Argentina</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
