"use client";

import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

type Lang = "es" | "en";

function LangSelect({
    value,
    onChange,
    className = "",
    id = "lang-select",
}: {
    value: "es" | "en";
    onChange: (l: "es" | "en") => void;
    className?: string;
    id?: string;
}) {
    return (
        <div className={`inline-flex ${className}`}>
            <select
                id={id}
                aria-label="Language"
                value={value}
                onChange={(e) => onChange(e.target.value as "es" | "en")}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="cursor-pointer border border-border-primary text-text-secondary bg-bg-nav rounded-md px-3 py-2 focus:outline-none focus:ring-0"
            >
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}

export default function Header() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState<Lang>("es");

    // Detecta tema preferido
    useEffect(() => {
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        console.log("🎨 Theme initialization:", {
            preferredTheme,
            systemPreference: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
            timestamp: new Date().toISOString(),
        });
        setTheme(preferredTheme);
        document.documentElement.setAttribute("data-theme", preferredTheme);
    }, []);

    // Bloquea scroll al abrir menú
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    // Cierra con ESC o clic fuera del header/menú
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            // Si el click NO ocurrió dentro del header, cerrar
            if (!document.querySelector("header")?.contains(target)) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKey);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("click", handleClick);
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        console.log("🔄 Theme toggle:", {
            from: theme,
            to: newTheme,
            timestamp: new Date().toISOString(),
            trigger: "user_click",
        });
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleLang = (l: Lang) => {
        setLang(l);
        console.log("🌐 Idioma seleccionado:", l);
    };

    return (
        <header className="sticky top-0 z-50 bg-bg-nav/70 border-b border-border-primary backdrop-blur-md transition-all duration-300">
            <div className="px-6 py-4 flex items-center justify-between lg:grid lg:grid-cols-3">
                {/* Logo */}
                {theme === "dark" ? (
                    <img src="/logo_dario_negro_resized.png" alt="Dario Benitez" className="h-10 w-auto transition-opacity duration-300" />
                ) : (
                    <img src="/logo_dario_transparente_resized.png" alt="Dario Benitez" className="h-10 w-auto transition-opacity duration-300" />
                )}

                {/* Controles */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="bg-border-secondary mx-auto rounded-full p-2 h-12 w-12 hover:bg-hover-theme-btn-accent transition-all duration-300 cursor-pointer hover:scale-110"
                    >
                        {theme === "dark" ? (
                            <img src="/sun_icon.svg" alt="Cambiar a modo claro" className="h-8 w-8" />
                        ) : (
                            <img src="/moon_icon.svg" alt="Cambiar a modo oscuro" className="h-8 w-8" />
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // evita que el listener global cierre inmediatamente
                            setIsMenuOpen((v) => !v);
                        }}
                        className="lg:hidden p-2 rounded-md"
                        aria-label="Abrir menú"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-8 w-8 text-text-secondary transition-colors hover:text-hover-menu-btn-accent" />
                        ) : (
                            <MenuIcon className="h-8 w-8 text-text-secondary transition-colors hover:text-hover-menu-btn-accent" />
                        )}
                    </button>
                </div>

                {/* Nav desktop */}
                <nav className="hidden lg:flex gap-6 items-center">
                    <a
                        href="#home"
                        className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-accent-secondary"
                    >
                        Home
                    </a>
                    <a href="#about" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-cyan-500">
                        About
                    </a>
                    <a href="#projects" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-pink-500">
                        Projects
                    </a>
                    <a href="#contact" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-emerald-500">
                        Contact
                    </a>
                    <LangSelect value={lang} onChange={handleLang} className="ml-4 hidden lg:inline-flex" />
                </nav>
            </div>

            {/* Overlay (cierra al tocar) */}
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="lg:hidden fixed inset-0 top-[80px] bg-bg-nav/70 opacity-100 transition-opacity duration-300 z-[55] backdrop-blur-3xl"
                    aria-hidden="true"
                />
            )}

            {/* Menú móvil */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="lg:hidden fixed top-[80px] inset-x-0 rounded-b-2xl border border-border-primary bg-bg-nav/70 backdrop-blur-md shadow-xl z-[60] translate-y-0 opacity-100 transition-transform duration-300"
                    role="dialog"
                    aria-modal="true"
                >
                    <nav className="flex flex-col items-center gap-2 p-4 ">
                        <a
                            href="#home"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-accent-secondary"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-cyan-500"
                        >
                            About
                        </a>
                        <a
                            href="#projects"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-pink-500"
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-emerald-500"
                        >
                            Contact
                        </a>
                        <LangSelect value={lang} onChange={handleLang} id="lang-select-mobile" className="mt-3 mx-auto inline-flex lg:hidden" />
                    </nav>
                </div>
            )}
        </header>
    );
}
