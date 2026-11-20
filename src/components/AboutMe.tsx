import { useTranslation } from "react-i18next";
import techData from "../data/technologies.json";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TechChip from "./ui/TechChip";

const CAPABILITIES = [1, 2, 3, 4];

export default function AboutMe() {
  const { t } = useTranslation();
  const stack = techData.stack;

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeading index="01" label={t("about.label")} title={t("about.title")} description={t("about.lead")} />

        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <Reveal>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{t("about.subtitle")}</h3>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">{t("about.capabilitiesLabel")}</p>
            <ul className="space-y-0">
              {CAPABILITIES.map((number) => (
                <li key={number} className="flex gap-5 border-t border-line py-5 first:border-0 first:pt-0">
                  <span className="pt-0.5 font-mono text-xs text-accent">0{number}</span>
                  <div>
                    <h4 className="font-display text-base font-semibold tracking-tight">{t(`about.cap${number}Title`)}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`about.cap${number}Text`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 md:mt-20">
          <p className="shell eyebrow mb-5">{t("about.stackLabel")}</p>
          <div
            className="marquee overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
          >
            <div className="marquee-track gap-3">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1 ? "true" : undefined}>
                  {stack.map((name) => (
                    <TechChip key={`${copy}-${name}`} name={name} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
