import type { Lang } from "../types/project";

const PROJECT_SEGMENTS: Record<Lang, string> = {
  es: "proyectos",
  en: "projects",
};

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function projectPath(slug: string, lang: Lang): string {
  return lang === "en" ? `/en/projects/${slug}` : `/proyectos/${slug}`;
}

export function localizedPath(pathname: string, lang: Lang): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isEn = clean === "/en" || clean.startsWith("/en/");
  const withoutLang = isEn ? clean.slice(3) || "/" : clean;
  const segments = withoutLang.split("/").filter(Boolean);

  if (segments.length >= 2 && (segments[0] === PROJECT_SEGMENTS.es || segments[0] === PROJECT_SEGMENTS.en)) {
    return projectPath(segments[1], lang);
  }

  if (lang === "en") return `/en${withoutLang === "/" ? "" : withoutLang}`;
  return withoutLang;
}

export function parseProjectPath(pathname: string): { lang: Lang; slug: string } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const match = clean.match(/^\/(?:en\/)?(?:proyectos|projects)\/([^/]+)$/);
  if (!match) return null;
  return { lang: langFromPath(clean), slug: decodeURIComponent(match[1]) };
}

export function navigate(path: string, replace = false) {
  if (replace) window.history.replaceState({}, "", path);
  else window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("app:navigate"));
}
