import i18n from "../i18n/i18n";
import { localizedProject, type Lang, type Project } from "../types/project";
import { projectPath } from "./routes";

const SITE = "https://dario-benitez-dev.vercel.app";
const URLS: Record<Lang, string> = {
  es: `${SITE}/`,
  en: `${SITE}/en`,
};
const OG_LOCALES: Record<Lang, { current: string; alternate: string }> = {
  es: { current: "es_AR", alternate: "en_US" },
  en: { current: "en_US", alternate: "es_AR" },
};

function setContent(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

function setHref(selector: string, value: string) {
  const element = document.querySelector<HTMLLinkElement>(selector);
  if (element) element.href = value;
}

function setSchema(schema: unknown) {
  const element = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (element) element.textContent = JSON.stringify(schema, null, 2);
}

function setAlternates(esUrl: string, enUrl: string, defaultUrl: string) {
  setHref('link[rel="alternate"][hreflang="es"]', esUrl);
  setHref('link[rel="alternate"][hreflang="en"]', enUrl);
  setHref('link[rel="alternate"][hreflang="x-default"]', defaultUrl);
}

function setOgCommon(url: string, lang: Lang, title: string, description: string, imageAlt: string) {
  const ogLocale = OG_LOCALES[lang];
  setContent('meta[property="og:url"]', url);
  setContent('meta[property="og:title"]', title);
  setContent('meta[property="og:description"]', description);
  setContent('meta[property="og:image:alt"]', imageAlt);
  setContent('meta[property="og:locale"]', ogLocale.current);
  setContent('meta[property="og:locale:alternate"]', ogLocale.alternate);
  setContent('meta[name="twitter:title"]', title);
  setContent('meta[name="twitter:description"]', description);
}

/**
 * Mantiene los metadatos alineados con el idioma activo cuando el usuario
 * cambia de ES a EN sin recargar. El HTML prerenderizado ya trae los valores
 * correctos para cada ruta, así que esto solo cubre la navegación client-side.
 */
export function updateDocumentMeta(lang: Lang) {
  if (!i18n.exists("meta.title", { lng: lang })) return;

  const t = (key: string) => i18n.t(key, { lng: lang });
  const url = URLS[lang];

  document.documentElement.lang = lang;
  document.title = t("meta.title");

  setContent('meta[name="description"]', t("meta.description"));
  setOgCommon(url, lang, t("meta.ogTitle"), t("meta.ogDescription"), t("meta.ogImageAlt"));
  setHref('link[rel="canonical"]', url);
  setAlternates(URLS.es, URLS.en, URLS.es);
}

export function updateProjectMeta(project: Project, lang: Lang) {
  const { title, category, summary } = localizedProject(project, lang);
  const esUrl = `${SITE}${projectPath(project.slug, "es")}`;
  const enUrl = `${SITE}${projectPath(project.slug, "en")}`;
  const url = lang === "en" ? enUrl : esUrl;
  const pageTitle = `${title} — ${category} | Dario Benitez`;

  document.documentElement.lang = lang;
  document.title = pageTitle;
  setContent('meta[name="description"]', summary);
  setOgCommon(url, lang, pageTitle, summary, `${title} — ${category}`);
  setHref('link[rel="canonical"]', url);
  setAlternates(esUrl, enUrl, esUrl);

  setSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Dario Benitez",
        url: `${SITE}/`,
        jobTitle: "Fullstack Developer",
        email: "mailto:benitez_trabaja@hotmail.com",
        sameAs: [
          "https://github.com/DDarioBenitez",
          "https://www.linkedin.com/in/dar%C3%ADo-dami%C3%A1n-ben%C3%ADtez/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "Dario Benitez — Fullstack Developer",
        inLanguage: lang,
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageTitle,
        description: summary,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: title,
        description: summary,
        applicationCategory: category,
        operatingSystem: "Web",
        url,
        author: { "@id": `${SITE}/#person` },
        programmingLanguage: project.techStack.slice(0, 8),
      },
    ],
  });
}
