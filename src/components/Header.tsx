"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import i18n from "../i18n/i18n";
import { Menu as MenuIcon, X } from "lucide-react";
import LanguageToggle from "./Header/LanguageToggle";
import { useTranslation } from "react-i18next";

type Lang = "es" | "en";
const STORAGE_KEY = "i18nextLng";

// Mantiene el hash (para la sincronización inicial)
const getPathWithLangPreserveHash = (lng: Lang) => {
    const hash = window.location.hash;
    const newPath = lng === "es" ? "/" : "/en";
    return newPath + hash;
};

// Quita el hash (para cuando el usuario cambia de idioma)
const getPathWithLangNoHash = (lng: Lang) => {
    const newPath = lng === "es" ? "/" : "/en";
    return newPath; // sin hash
};

const getInitialLang = (): Lang => {
    const seg = window.location.pathname.split("/")[1];
    if (seg === "en") return "en";
    // Si no hay /en en el path, probamos localStorage
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "es") return stored as Lang;
    } catch {
        /* ignore error accessing localStorage */
    }
    return "es"; // por defecto
};

export default function Header() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState<Lang>(getInitialLang);

    // Init: tema + i18n + sincronizar URL con preferencia guardada
    useEffect(() => {
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(preferredTheme);
        document.documentElement.setAttribute("data-theme", preferredTheme);

        // fija idioma en i18n
        void i18n.changeLanguage(lang);

        // asegura que la URL coincide con el idioma elegido
        const seg = window.location.pathname.split("/")[1];
        const urlIsEn = seg === "en";
        const shouldBeEn = lang === "en";
        if (urlIsEn !== shouldBeEn) {
            const newUrl = getPathWithLangPreserveHash(lang); // 👈 conserva hash
            window.history.replaceState({}, "", newUrl);
        }
    }, []); // solo una vez

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
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleLang = (l: Lang) => {
        setLang(l);
        // guarda preferencia
        try {
            localStorage.setItem(STORAGE_KEY, l);
        } catch {
            /* ignore error setting localStorage */
        }
        // cambia idioma en i18n
        void i18n.changeLanguage(l);

        // reescribe URL manteniendo hash y, si existía, scrollea suave
        const newUrl = getPathWithLangNoHash(l);
        window.history.pushState({}, "", newUrl);
    };

    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 bg-bg-nav/70 border-b border-border-primary backdrop-blur-md transition-all duration-300">
            <div className="px-6 py-4 flex justify-between items-center lg:grid lg:grid-cols-[auto_1fr_auto] overflow-x-clip">
                {/* Logo */}
                {theme === "dark" ? (
                    <img src="/logo_dario_negro_resized.png" alt="Dario Benitez" className="h-10 w-auto transition-opacity duration-300" />
                ) : (
                    <img src="/logo_dario_transparente_resized.png" alt="Dario Benitez" className="h-10 w-auto transition-opacity duration-300" />
                )}

                {/* Controles */}
                <div className="flex justify-end lg:mx-6 gap-4">
                    <button
                        onClick={toggleTheme}
                        className="bg-border-secondary rounded-full p-2 h-12 w-12 hover:bg-hover-theme-btn-accent transition-all duration-300 cursor-pointer hover:scale-110"
                    >
                        {theme === "dark" ? (
                            <img src="/sun_icon.svg" alt="Cambiar a modo claro" className="h-8 w-8" />
                        ) : (
                            <img src="/moon_icon.svg" alt="Cambiar a modo oscuro" className="h-8 w-8" />
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
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
                <nav className="hidden lg:flex gap-6 items-center lg:justify-self-end max-w-full">
                    <a
                        href="#home"
                        className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-accent-secondary"
                    >
                        {t("header.home")}
                    </a>
                    <a href="#about" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-cyan-500">
                        {t("header.about")}
                    </a>
                    <a href="#projects" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-pink-500">
                        {t("header.projects")}
                    </a>
                    <a href="#contact" className="text-lg font-semibold cursor-pointer text-text-secondary transition-colors hover:text-emerald-500">
                        {t("header.contact")}
                    </a>
                    <LanguageToggle 
                        currentLang={lang} 
                        onToggle={handleLang} 
                        isDarkMode={theme === "dark"} 
                    />
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
                            {t("header.home")}
                        </a>
                        <a
                            href="#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-cyan-500"
                        >
                            {t("header.about")}
                        </a>
                        <a
                            href="#projects"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-pink-500"
                        >
                            {t("header.projects")}
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-base font-medium text-text-secondary hover:text-emerald-500"
                        >
                            {t("header.contact")}
                        </a>
                         <LanguageToggle 
                            currentLang={lang} 
                            onToggle={handleLang} 
                            isDarkMode={theme === "dark"}
                            id="lang-select-mobile" 
                            className="mt-3 mx-auto lg:hidden" 
                         />
                    </nav>
                </div>
            )}
        </header>
    );
}
