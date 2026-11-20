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
    <section id="projects" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="02" label={t("projects.label")} title={t("projects.title")} description={t("projects.lead")} />

        <div className="flex flex-col gap-8 md:gap-12">
          {featured.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2">
            <span className="meta-index text-muted">{t("projects.archiveLabel")}</span>
            <span className="meta-index text-muted">{t("projects.archiveYears")}</span>
          </div>
          <ul className="card divide-y divide-line">
            {others.map((project) => {
              const { title, category, summary } = localizedProject(project, lang);
              return (
                <Reveal key={project.slug}>
                  <li className="flex flex-col gap-5 p-4 transition-colors hover:bg-surface-paper sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {project.image && (
                        <div className="h-24 w-full shrink-0 overflow-hidden rounded border border-line bg-surface-canvas sm:w-36">
                          <img
                            src={project.image}
                            alt=""
                            width={1440}
                            height={900}
                            loading="lazy"
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      )}
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="meta-index rounded bg-accent-light px-1.5 py-0.5 text-[11px] text-accent-dark">
                            {project.year}
                          </span>
                          <span className="meta-index text-[11px] text-muted">{category.toUpperCase()}</span>
                        </div>
                        <h4 className="headline-sm font-bold">
                          <a href={projectPath(project.slug, lang)} className="transition-colors hover:text-accent-dark">
                            {title}
                          </a>
                        </h4>
                        <p className="body-sm mt-0.5 max-w-xl">{summary}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 lg:ml-auto">
                      <a
                        href={projectPath(project.slug, lang)}
                        className="label-sm inline-flex items-center gap-1 font-medium text-accent-dark hover:underline"
                      >
                        {t("projects.caseStudy")}
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label-sm inline-flex items-center gap-1.5 rounded border border-line bg-surface px-3 py-1.5 text-ink transition-colors hover:border-line-strong hover:bg-surface-canvas"
                        >
                          {t("projects.visit")}
                          <ArrowUpRight size={14} className="text-accent" aria-hidden="true" />
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
