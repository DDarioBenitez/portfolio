import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "../ui/Reveal";

const EMAIL = "benitez_trabaja@hotmail.com";
const NAV = ["home", "about", "projects", "contact"] as const;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang: "es" | "en" = i18n.language.startsWith("en") ? "en" : "es";
  const homeBase = lang === "en" ? "/en" : "/";
  const isHome = typeof window !== "undefined" && ["/", "/en"].includes(window.location.pathname);

  return (
    <>
      <section className="shell pb-12 md:pb-16">
        <Reveal>
          <div className="card flex flex-col gap-8 bg-surface-paper p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-xl flex-col gap-2">
              <p className="meta-index text-accent-dark">
                04<span className="px-2 opacity-40">/</span>
                {t("footer.label")}
              </p>
              <h2 className="headline-lg font-bold">{t("footer.title")}</h2>
              <a
                href={`mailto:${EMAIL}`}
                className="label-md inline-flex items-center gap-1.5 self-start font-semibold text-accent-dark underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
              >
                {EMAIL}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>

            <nav aria-label={t("footer.navigation")} className="flex flex-wrap gap-3 md:flex-col md:gap-3">
              {NAV.map((id) => (
                <a key={id} href={`${isHome ? "" : homeBase}#${id}`} className="label-md text-muted transition-colors hover:text-ink">
                  {t(`header.${id}`)}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line bg-surface-paper py-8">
        <div className="shell flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-0.5">
            <span className="label-md font-semibold text-ink">Dario Benitez — Fullstack Architecture</span>
            <span className="label-sm text-muted">
              © {new Date().getFullYear()} Dario Benitez. {t("footer.rights")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${EMAIL}`} className="label-sm text-accent-dark underline decoration-line-strong underline-offset-4">
              {EMAIL}
            </a>
            <span className="hidden text-muted sm:inline">•</span>
            <span className="label-sm hidden text-muted sm:inline">{t("footer.crafted")}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
