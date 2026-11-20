import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "../ui/Reveal";
import TechChip from "../ui/TechChip";
import { projectPath } from "../../lib/routes";
import { localizedProject, type Lang, type Project } from "../../types/project";
import ProjectPreview from "./ProjectPreview";

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith("en") ? "en" : "es";
  const { title, category, summary, impact } = localizedProject(project, lang);

  return (
    <Reveal>
      <article className="grid gap-8 border-t border-line py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-14">
        <div className={index % 2 === 1 ? "md:order-2" : ""}>
          <p className="eyebrow mb-4 flex flex-wrap items-center gap-2">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="opacity-40">/</span>
            {category}
            <span className="opacity-40">·</span>
            {project.year}
          </p>

          <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            <a href={projectPath(project.slug, lang)} className="transition-colors hover:text-accent">
              {title}
            </a>
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{summary}</p>

          <p className="mt-5 flex gap-2 text-sm text-ink">
            <span className="text-accent" aria-hidden="true">
              ↗
            </span>
            {impact}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.slice(0, 7).map((tech) => (
              <TechChip key={tech} name={tech} />
            ))}
            {project.techStack.length > 7 && (
              <span className="px-1 py-1.5 font-mono text-xs text-muted">+{project.techStack.length - 7}</span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={projectPath(project.slug, lang)}
              className="link-accent inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              {t("projects.caseStudy")}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t("projects.visit")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="text-sm text-muted">{t("projects.onRequest")}</span>
            )}
            {project.status === "dev" && <span className="eyebrow">{t("projects.inProgress")}</span>}
          </div>
        </div>

        <div className={index % 2 === 1 ? "md:order-1" : ""}>
          <ProjectPreview variant={project.previewVariant} title={title} />
        </div>
      </article>
    </Reveal>
  );
}
