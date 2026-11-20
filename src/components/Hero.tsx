import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./ui/Reveal";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4rem)] items-center py-20 md:min-h-[calc(100svh-4.5rem)] md:py-24">
      <div className="shell grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.7fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1.5 text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {t("hero.availability")}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted md:text-sm">{t("hero.eyebrow")}</p>
            <h1 className="hero-title mt-4">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleAccent")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{t("hero.description")}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                {t("hero.ctaProjects")}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-outline">
                <Mail size={16} aria-hidden="true" />
                {t("hero.ctaContact")}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-xs text-muted">status.txt</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-line-strong" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
            </div>
            <dl className="divide-y divide-line">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="eyebrow">{t("hero.panelAvailability")}</dt>
                <dd className="text-right text-sm font-medium text-ink">{t("hero.panelAvailabilityValue")}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="eyebrow">{t("hero.panelStack")}</dt>
                <dd className="text-right font-mono text-sm text-accent">TS / Node / React</dd>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="eyebrow">{t("hero.panelLocation")}</dt>
                <dd className="text-right text-sm font-medium text-ink">{t("hero.panelLocationValue")}</dd>
              </div>
            </dl>
            <div className="border-t border-line bg-accent-soft px-5 py-4">
              <p className="flex items-center gap-2 text-sm text-accent">
                <ArrowUpRight size={16} aria-hidden="true" />
                {t("hero.panelNote")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
