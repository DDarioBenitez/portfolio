import { AppWindow, Handshake, Server, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import techData from "../data/technologies.json";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { techIcons } from "./ui/TechChip";

const CAPABILITIES = [
  { number: 1, icon: Server },
  { number: 2, icon: AppWindow },
  { number: 3, icon: Zap },
  { number: 4, icon: Handshake },
];

const STACK_LABELS: Record<string, string> = {
  Prisma: "Prisma ORM",
  Ably: "Ably Realtime",
};

const STACK_GRID = techData.stack.map((name) => ({ name, label: STACK_LABELS[name] ?? name }));

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="01" label={t("about.label")} title={t("about.title")} description={t("about.lead")} />

        <div className="mt-2 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="card flex flex-col gap-4 p-6">
              <h3 className="headline-sm">{t("about.subtitle")}</h3>
              <div className="body-md flex flex-col gap-4">
                <p>{t("about.text1")}</p>
                <p>{t("about.text2")}</p>
                <p>{t("about.text3")}</p>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded bg-surface-soft p-4">
                <ShieldCheck size={24} className="shrink-0 text-accent" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="label-md font-semibold text-ink">{t("about.philosophyTitle")}</span>
                  <span className="label-sm text-muted">{t("about.philosophyText")}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-1">
              <span className="meta-index text-[11px] text-muted">{t("about.pillarsLabel")}</span>
              <span className="meta-index text-[11px] text-accent-dark">{t("about.pillarsCount")}</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {CAPABILITIES.map(({ number, icon: Icon }) => (
                <div key={number} className="card card-hover flex flex-col gap-2 p-5">
                  <div className="flex items-center justify-between">
                    <span className="meta-index font-bold text-accent">0{number}</span>
                    <Icon size={20} className="text-muted" aria-hidden="true" />
                  </div>
                  <h4 className="headline-sm mt-1 text-[17px] font-semibold">{t(`about.cap${number}Title`)}</h4>
                  <p className="body-sm">{t(`about.cap${number}Text`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <div className="shell flex flex-wrap items-center justify-between gap-2">
            <span className="meta-index text-muted">{t("about.stackHeading")}</span>
            <span className="label-sm text-accent-dark">{t("about.stackNote")}</span>
          </div>
          <div className="shell mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {STACK_GRID.map(({ name, label }) => (
              <div key={name} className="card flex items-center gap-2 p-3 transition-colors hover:bg-surface-canvas">
                <span className="text-accent" aria-hidden="true">
                  {techIcons[name] ?? <span className="font-mono text-[10px]">•</span>}
                </span>
                <span className="label-md font-semibold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
