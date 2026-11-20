import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import SiteShell from "../components/SiteShell";
import ProjectVisual from "../components/Projects/ProjectVisual";
import Reveal from "../components/ui/Reveal";
import TechChip from "../components/ui/TechChip";
import { updateProjectMeta } from "../lib/seo";
import { localizedPath, navigate, projectPath } from "../lib/routes";
import { localizedProject, type Lang, type Project } from "../types/project";

const projects = projectsData as Project[];

export default function ProjectDetail({ slug, lang }: { slug: string; lang: Lang }) {
  const { t, i18n } = useTranslation();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (!project) return;
    void i18n.changeLanguage(lang).then(() => updateProjectMeta(project, lang));
    const expectedPath = projectPath(project.slug, lang);
    if (window.location.pathname !== expectedPath) navigate(expectedPath, true);
  }, [project, lang, i18n]);

  if (!project) {
    const home = lang === "en" ? "/en#projects" : "/#projects";
    return (
      <SiteShell>
        <section className="shell py-32">
          <p className="meta-index text-accent">404</p>
          <h1 className="display mt-4">{t("project.notFound")}</h1>
          <a href={home} className="link-accent mt-8 inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft size={15} aria-hidden="true" />
            {t("project.back")}
          </a>
        </section>
      </SiteShell>
    );
  }

  const { title, category, summary, details, impact } = localizedProject(project, lang);
  const nextProject = projects[(index + 1) % projects.length];
  const nextTitle = localizedProject(nextProject, lang).title;
  const homeProjects = localizedPath("/", lang) + "#projects";
  const homeContact = localizedPath("/", lang) + "#contact";

  return (
    <SiteShell>
      <article className="py-10 md:py-14">
        <div className="shell">
          <a href={homeProjects} className="label-sm inline-flex items-center gap-2 text-accent-dark hover:text-accent">
            <ArrowLeft size={14} aria-hidden="true" />
            {t("project.back")}
          </a>

          <Reveal>
            <header className="mt-8 border-b border-line pb-8">
              <p className="meta-index flex flex-wrap items-center gap-2 text-accent-dark">
                {category.toUpperCase()}
                <span className="opacity-40">·</span>
                {project.year}
                {project.status === "dev" && (
                  <>
                    <span className="opacity-40">·</span>
                    <span className="text-muted">{t("projects.inProgress")}</span>
                  </>
                )}
              </p>
              <h1 className="display mt-4">{title}</h1>
              <p className="body-lg mt-4 max-w-3xl">{summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
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
              </div>
            </header>
          </Reveal>

          <div className="grid gap-10 py-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] md:gap-12">
            <Reveal>
              <p className="meta-index mb-4 text-muted">{t("project.overview")}</p>
              <div className="body-md flex flex-col gap-4 md:text-lg">
                {details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 rounded bg-accent-light p-5">
                <p className="meta-index mb-2 text-accent-dark">{t("project.impact")}</p>
                <p className="headline-sm font-medium">{impact}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="meta-index mb-4 text-muted">{t("project.stack")}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>
              <div className="mt-8 border-t border-line pt-5">
                <p className="meta-index mb-2 text-muted">{t("project.yearLabel")}</p>
                <p className="label-md text-ink">{project.year}</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-lg border border-line bg-surface-canvas p-6">
              <ProjectVisual project={project} title={title} />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 border-t border-line pt-8 md:grid-cols-2">
            <div>
              <p className="meta-index mb-3 text-muted">{t("project.next")}</p>
              <a
                href={projectPath(nextProject.slug, lang)}
                className="headline-sm inline-flex items-center gap-2 transition-colors hover:text-accent-dark"
              >
                {nextTitle}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div>
              <p className="meta-index mb-3 text-muted">{t("project.workTogether")}</p>
              <a href={homeContact} className="link-accent label-md inline-flex items-center gap-1.5 font-semibold">
                {t("project.workTogetherCta")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
