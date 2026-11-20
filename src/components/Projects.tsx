import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import { projectPath } from "../lib/routes";
import { localizedProject, type Lang, type Project } from "../types/project";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import ProjectRow from "./Projects/ProjectRow";

const projects = projectsData as Project[];

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith("en") ? "en" : "es";
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeading index="02" label={t("projects.label")} title={t("projects.title")} description={t("projects.lead")} />

        <p className="eyebrow mb-2 border-b border-line pb-4">{t("projects.featured")}</p>
        <div>
          {featured.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-14 md:mt-20">
          <p className="eyebrow mb-4 border-b border-line pb-4">{t("projects.others")}</p>
          <ul className="divide-y divide-line">
            {others.map((project) => {
              const { title, category } = localizedProject(project, lang);
              return (
                <Reveal key={project.slug}>
                  <li className="flex flex-wrap items-center gap-x-5 gap-y-2 py-5 sm:flex-nowrap sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="font-mono text-xs text-accent">{project.year}</span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold tracking-tight">
                          <a href={projectPath(project.slug, lang)} className="transition-colors hover:text-accent">
                            {title}
                          </a>
                        </h3>
                        <p className="text-sm text-muted">{category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <a
                        href={projectPath(project.slug, lang)}
                        className="link-accent inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        {t("projects.caseStudy")}
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                        >
                          {t("projects.visit")}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
