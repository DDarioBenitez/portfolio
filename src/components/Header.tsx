import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Moon, Sun, X } from "lucide-react";
import i18n from "../i18n/i18n";
import { useTheme } from "../hooks/useTheme";
import { usePathname } from "../hooks/usePathname";
import { langFromPath, localizedPath, navigate, parseProjectPath } from "../lib/routes";
import { updateDocumentMeta } from "../lib/seo";
import LanguageToggle from "./Header/LanguageToggle";

type Lang = "es" | "en";
const STORAGE_KEY = "i18nextLng";
const SECTIONS = ["home", "about", "projects", "contact"] as const;

export default function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>(() => langFromPath(pathname));
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const pathLang = langFromPath(window.location.pathname);
    setLang(pathLang);
    void i18n.changeLanguage(pathLang).then(() => {
      if (parseProjectPath(window.location.pathname)) return;
      updateDocumentMeta(pathLang);
    });
    const expectedPath = localizedPath(window.location.pathname, pathLang);
    if (window.location.pathname !== expectedPath) {
      navigate(expectedPath, true);
    }
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleLang = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    const nextPath = localizedPath(window.location.pathname, next);
    if (nextPath !== window.location.pathname) navigate(nextPath);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage puede no estar disponible */
    }
    setMenuOpen(false);
  };

  const homeHref = lang === "en" ? "/en" : "/";
  const navLinks = SECTIONS.map((id) => ({ id, label: t(`header.${id}`) }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <a href={`${homeHref}#home`} className="flex items-center gap-3" aria-label="Dario Benitez — inicio">
          <span className="grid h-11 w-11 place-items-center border border-line-strong font-mono text-xs font-semibold text-accent md:h-9 md:w-9">
            DB
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight sm:inline">
            Dario Benitez<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t("header.navigation")}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`${homeHref}#${link.id}`}
              aria-current={activeSection === link.id ? "true" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors ${
                activeSection === link.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              {activeSection === link.id && <span className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle currentLang={lang} onToggle={handleLang} label={t("header.language")} />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("header.lightMode") : t("header.darkMode")}
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent md:h-9 md:w-9"
          >
            {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="border-t border-line bg-bg px-[clamp(1rem,5vw,3rem)] py-4 md:hidden" aria-label={t("header.navigation")}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`${homeHref}#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className={`block border-b border-line/60 py-3 text-base font-medium last:border-0 ${
                activeSection === link.id ? "text-accent" : "text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
