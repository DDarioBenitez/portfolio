import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import SiteShell from "../components/SiteShell";
import ProjectPreview from "../components/Projects/ProjectPreview";
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
          <p className="eyebrow text-accent">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">{t("project.notFound")}</h1>
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
      <article className="py-16 md:py-24">
        <div className="shell">
          <a href={homeProjects} className="link-accent eyebrow inline-flex items-center gap-2">
            <ArrowLeft size={14} aria-hidden="true" />
            {t("project.back")}
          </a>

          <Reveal>
            <header className="mt-10 border-b border-line pb-12">
              <p className="eyebrow flex flex-wrap items-center gap-2">
                <span className="text-accent">{category}</span>
                <span className="opacity-40">·</span>
                {project.year}
                {project.status === "dev" && (
                  <>
                    <span className="opacity-40">·</span>
                    <span>{t("projects.inProgress")}</span>
                  </>
                )}
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
              </div>
            </header>
          </Reveal>

          <div className="grid gap-12 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] md:gap-16">
            <Reveal>
              <p className="eyebrow mb-5">{t("project.overview")}</p>
              <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
                {details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 border-l-2 border-accent pl-5">
                <p className="eyebrow mb-2">{t("project.impact")}</p>
                <p className="font-display text-xl font-medium tracking-tight">{impact}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-5">{t("project.stack")}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow mb-2">{t("project.yearLabel")}</p>
                <p className="font-mono text-sm text-ink">{project.year}</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <ProjectPreview variant={project.previewVariant} title={title} />
          </Reveal>

          <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">{t("project.next")}</p>
              <a
                href={projectPath(nextProject.slug, lang)}
                className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
              >
                {nextTitle}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">{t("project.workTogether")}</p>
              <a href={homeContact} className="link-accent inline-flex items-center gap-1.5 text-base font-semibold">
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
