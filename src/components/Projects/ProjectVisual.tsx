import { useTranslation } from "react-i18next";
import type { Project } from "../../types/project";
import NexiafyFlowPreview from "./NexiafyFlowPreview";
import ProjectPreview from "./ProjectPreview";

function domainFrom(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ProjectVisual({ project, title }: { project: Project; title: string }) {
  const { t } = useTranslation();

  if (project.previewVariant === "flow") return <NexiafyFlowPreview />;

  if (project.image) {
    const statusLabel = project.slug === "helloflatmate" ? t("projects.activePlatform") : t("projects.production");
    return (
      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-line bg-surface-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-muted">{domainFrom(project.liveLink)}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded bg-accent-light px-2 py-0.5 font-mono text-[11px] font-semibold text-accent-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {statusLabel}
          </span>
        </div>
        <img
          src={project.image}
          alt={`${title} — vista del proyecto`}
          width={1440}
          height={900}
          loading="lazy"
          className="aspect-[16/10] w-full bg-surface-canvas object-cover object-top"
        />
      </div>
    );
  }

  return <ProjectPreview variant={project.previewVariant} title={title} />;
}
