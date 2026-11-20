export type Lang = "es" | "en";

export interface Project {
  slug: string;
  title: string;
  title_en?: string;
  category_es: string;
  category_en: string;
  year: string;
  featured: boolean;
  previewVariant: string;
  summary_es: string;
  summary_en: string;
  details_es: string[];
  details_en: string[];
  impact_es: string;
  impact_en: string;
  techStack: string[];
  liveLink: string;
  status: "prod" | "dev";
}

export interface LocalizedProject {
  title: string;
  category: string;
  summary: string;
  details: string[];
  impact: string;
}

export function localizedProject(project: Project, lang: Lang): LocalizedProject {
  const isEn = lang === "en";
  return {
    title: isEn ? project.title_en ?? project.title : project.title,
    category: isEn ? project.category_en : project.category_es,
    summary: isEn ? project.summary_en : project.summary_es,
    details: isEn ? project.details_en : project.details_es,
    impact: isEn ? project.impact_en : project.impact_es,
  };
}
