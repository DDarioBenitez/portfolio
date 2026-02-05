"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SimpleShaderBackground from "../components/ShaderBackground";

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
        <>
            <SimpleShaderBackground 
                quality="high" 
                intensity={0.15}
                speed={0.08}
                scale={1.2}
            />
            <div
                className={`home min-h-screen transition-all duration-500 isolate ${
                    isDarkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900" : "bg-gradient-to-br from-blue-50 via-white to-cyan-50"
                }`}
            >
                <Header />
                <Hero isDarkMode={isDarkMode} />
                <AboutMe isDarkMode={isDarkMode} />
                <Projects isDarkMode={isDarkMode} />
                <Contact isDarkMode={isDarkMode} />

                {/* Fondo decorativo claro */}

                <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
                    <span className={`h-[520px] w-[520px] rounded-full ${!isDarkMode ? "bg-blue-400/10" : "bg-purple-500/20"} blur-3xl`} />
                </div>

                <Footer isDarkMode={isDarkMode} />
            </div>
        </>
    );
}
