import { ArrowRight, ArrowUpRight, Network, PenTool, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "../ui/Reveal";
import TechChip from "../ui/TechChip";
import { projectPath } from "../../lib/routes";
import { localizedProject, type Lang, type Project } from "../../types/project";
import ProjectVisual from "./ProjectVisual";

const impactIcons = [Network, PenTool, Workflow];

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith("en") ? "en" : "es";
  const { title, category, summary, impact } = localizedProject(project, lang);
  const ImpactIcon = impactIcons[index % impactIcons.length];

  return (
    <Reveal>
      <article className="card card-hover grid overflow-hidden lg:grid-cols-2">
        <div className={`flex flex-col justify-between gap-6 p-6 sm:p-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <div className="flex flex-col gap-3">
            <p className="meta-index text-muted">
              {String(index + 1).padStart(2, "0")} / {category.toUpperCase()} · {project.year}
            </p>
            <h3 className="headline-lg">
              <a href={projectPath(project.slug, lang)} className="transition-colors hover:text-accent-dark">
                {title}
              </a>
            </h3>
            <p className="body-md max-w-xl">{summary}</p>

            <div className="flex items-start gap-2 rounded bg-accent-light p-3">
              <ImpactIcon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="body-sm font-medium text-accent-dark">{impact}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.slice(0, 7).map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
              {project.techStack.length > 7 && (
                <span className="meta-index rounded bg-surface-soft px-2 py-1 text-[11px] text-muted">
                  +{project.techStack.length - 7}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
            <a
              href={projectPath(project.slug, lang)}
              className="label-md inline-flex items-center gap-1.5 font-semibold text-accent-dark transition-colors hover:text-accent"
            >
              {t("projects.caseStudy")}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="label-md inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
              >
                {t("projects.visit")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="label-md inline-flex items-center gap-1.5 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t("projects.onRequest")}
              </span>
            )}
            {project.status === "dev" && <span className="meta-index text-muted">{t("projects.inProgress")}</span>}
          </div>
        </div>

        <div className={`flex items-center justify-center bg-surface-canvas p-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <div className="w-full">
            <ProjectVisual project={project} title={title} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
