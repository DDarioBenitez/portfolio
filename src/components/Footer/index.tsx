import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "../ui/Reveal";

const EMAIL = "benitez_trabaja@hotmail.com";
const NAV = ["home", "about", "projects", "contact"] as const;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">
                <span className="text-accent">04</span>
                <span className="px-2 opacity-40">/</span>
                {t("footer.label")}
              </p>
              <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{t("footer.title")}</h2>
              <a href={`mailto:${EMAIL}`} className="link-accent mt-6 inline-flex items-center gap-1.5 text-base font-semibold">
                {EMAIL}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <nav aria-label={t("footer.navigation")}>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-1">
                {NAV.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-accent">
                      {t(`header.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>

        <div className="my-10 h-px bg-line" />

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} Dario Benitez. {t("footer.rights")}
          </p>
          <p className="font-mono">
            {t("footer.stack")} · React · TypeScript · Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
