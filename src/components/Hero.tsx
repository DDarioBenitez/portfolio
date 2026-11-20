import { ArrowDownRight, Mail, Timer } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./ui/Reveal";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="scroll-mt-20 py-10 md:py-14">
      <div className="shell flex flex-col gap-10">
        <div className="h-0.5 w-full overflow-hidden bg-surface-soft" aria-hidden="true">
          <div className="h-full w-2/3 bg-accent" />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded bg-accent-light px-3 py-1 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span className="meta-index text-[11px] font-semibold text-accent-dark">{t("hero.availability")}</span>
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="meta-index text-muted">{t("hero.eyebrow")}</p>
              <h1 className="hero-title mt-2">
                {t("hero.titleLine1")}
                <br />
                <span className="text-accent">{t("hero.titleAccent")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body-lg max-w-xl">{t("hero.description")}</p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn btn-primary">
                  {t("hero.ctaProjects")}
                  <ArrowDownRight size={18} aria-hidden="true" />
                </a>
                <a href="#contact" className="btn btn-outline">
                  <Mail size={18} className="text-accent" aria-hidden="true" />
                  {t("hero.ctaContact")}
                </a>
                <span className="label-sm inline-flex items-center gap-2 pl-2 text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {t("hero.roleLabel")}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="card relative overflow-hidden p-5">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent-light blur-2xl" aria-hidden="true" />

              <div className="-mx-5 -mt-5 mb-4 flex items-center justify-between border-b border-line bg-surface-paper px-5 pb-3 pt-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="meta-index text-[11px] text-muted">status.txt</span>
                <span className="meta-index rounded bg-accent-light px-1.5 py-0.5 text-[11px] font-semibold text-accent-dark">
                  {t("hero.version")}
                </span>
              </div>

              <dl className="divide-y divide-line">
                <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <dt className="meta-index text-[11px] text-muted">{t("hero.panelAvailability")}</dt>
                  <dd className="label-md inline-flex items-center gap-2 font-medium text-ink">
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    {t("hero.panelAvailabilityValue")}
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <dt className="meta-index text-[11px] text-muted">{t("hero.panelStack")}</dt>
                  <dd className="meta-index flex items-center gap-1 text-[11px] text-ink">
                    <span className="rounded bg-surface-soft px-1.5 py-0.5 font-semibold">TS</span>
                    <span className="text-muted">/</span>
                    <span className="rounded bg-surface-soft px-1.5 py-0.5 font-semibold">Node</span>
                    <span className="text-muted">/</span>
                    <span className="rounded bg-accent-light px-1.5 py-0.5 font-semibold text-accent-dark">React</span>
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <dt className="meta-index text-[11px] text-muted">{t("hero.panelLocation")}</dt>
                  <dd className="label-md font-medium text-ink">{t("hero.panelLocationValue")}</dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <dt className="meta-index text-[11px] text-muted">{t("hero.panelExperience")}</dt>
                  <dd className="label-md font-medium text-ink">{t("hero.panelExperienceValue")}</dd>
                </div>
              </dl>

              <div className="pt-2">
                <div className="label-sm flex w-full flex-wrap items-center justify-between gap-2 rounded bg-accent-light px-2.5 py-1.5 font-semibold text-accent-dark">
                  <span className="inline-flex items-center gap-1">
                    <Timer size={15} aria-hidden="true" />
                    {t("hero.panelNote")}
                  </span>
                  <span className="meta-index opacity-80">{t("hero.noteTime")}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 rounded bg-surface-canvas p-3 font-mono text-xs leading-relaxed text-muted">
                <div className="flex items-center gap-2 text-accent-dark">
                  <span className="font-bold text-accent" aria-hidden="true">&gt;</span>
                  <span className="font-semibold text-ink">{t("hero.terminalCommand")}</span>
                  <span className="ml-auto text-[11px] text-muted">0ms</span>
                </div>
                <p className="pl-3 text-ink-secondary">{t("hero.terminalOutput")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
