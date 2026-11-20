import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const SITE = "https://dario-benitez-dev.vercel.app";
const LANGS = ["es", "en"];

const OG_LOCALES = {
  es: { current: "es_AR", alternate: "en_US" },
  en: { current: "en_US", alternate: "es_AR" },
};

const locales = Object.fromEntries(
  LANGS.map((lng) => {
    const file = join(root, "public", "locales", lng, "common.json");
    return [lng, JSON.parse(readFileSync(file, "utf8")).meta];
  }),
);

const projects = JSON.parse(readFileSync(join(root, "src", "data", "projects.json"), "utf8"));

function replace(html, regex, replacer, label) {
  if (!regex.test(html)) throw new Error(`No se pudo actualizar: ${label}`);
  return html.replace(regex, replacer);
}

function setMetaContent(html, attribute, name, value) {
  const regex = new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(")`);
  return replace(html, regex, (_match, open, close) => `${open}${value}${close}`, `meta ${name}`);
}

function setLinkHref(html, rel, hreflang, value) {
  const regex = hreflang
    ? new RegExp(`(<link\\s+rel="${rel}"\\s+hreflang="${hreflang}"\\s+href=")[^"]*(")`)
    : new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`);
  return replace(html, regex, (_match, open, close) => `${open}${value}${close}`, `link ${rel}:${hreflang ?? ""}`);
}

function setTitle(html, value) {
  return replace(html, /<title>[\s\S]*?<\/title>/, () => `<title>${value}</title>`, "title");
}

function setHtmlLang(html, lang) {
  return replace(html, /<html lang="[^"]*"/, () => `<html lang="${lang}"`, "html lang");
}

function setSchema(html, schema) {
  return replace(
    html,
    /(<script type="application\/ld\+json" id="seo-schema">)[\s\S]*?(<\/script>)/,
    (_match, open, close) => `${open}\n${JSON.stringify(schema, null, 2)}\n    ${close}`,
    "JSON-LD",
  );
}

function personNode() {
  return {
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
  };
}

function webSiteNode(lang) {
  return {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: `${SITE}/`,
    name: "Dario Benitez — Fullstack Developer",
    inLanguage: lang,
    publisher: { "@id": `${SITE}/#person` },
  };
}

function buildPage(baseHtml, page) {
  const ogLocale = OG_LOCALES[page.lang];
  let output = baseHtml;
  output = setHtmlLang(output, page.lang);
  output = setTitle(output, page.title);
  output = setMetaContent(output, "name", "description", page.description);
  output = setMetaContent(output, "property", "og:title", page.ogTitle);
  output = setMetaContent(output, "property", "og:description", page.ogDescription);
  output = setMetaContent(output, "property", "og:image:alt", page.ogImageAlt);
  output = setMetaContent(output, "property", "og:url", page.url);
  output = setMetaContent(output, "property", "og:locale", ogLocale.current);
  output = setMetaContent(output, "property", "og:locale:alternate", ogLocale.alternate);
  output = setMetaContent(output, "name", "twitter:title", page.ogTitle);
  output = setMetaContent(output, "name", "twitter:description", page.ogDescription);
  output = setLinkHref(output, "canonical", null, page.url);
  output = setLinkHref(output, "alternate", "es", page.alternates.es);
  output = setLinkHref(output, "alternate", "en", page.alternates.en);
  output = setLinkHref(output, "alternate", "x-default", page.alternates.xDefault);
  return setSchema(output, page.schema);
}

function localizedProject(project, lang) {
  const isEn = lang === "en";
  return {
    title: isEn ? project.title_en || project.title : project.title,
    category: isEn ? project.category_en : project.category_es,
    summary: isEn ? project.summary_en : project.summary_es,
  };
}

function homePage(baseHtml, lang) {
  const meta = locales[lang];
  return buildPage(baseHtml, {
    lang,
    url: lang === "en" ? `${SITE}/en` : `${SITE}/`,
    alternates: { es: `${SITE}/`, en: `${SITE}/en`, xDefault: `${SITE}/` },
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
    ogImageAlt: meta.ogImageAlt,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        { ...personNode(), knowsAbout: ["React", "Next.js", "Node.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO", "Tailwind CSS"], description: meta.description },
        webSiteNode(lang),
      ],
    },
  });
}

function projectUrls(project) {
  return {
    es: `${SITE}/proyectos/${project.slug}`,
    en: `${SITE}/en/projects/${project.slug}`,
  };
}

function projectPage(baseHtml, project, lang) {
  const { title, category, summary } = localizedProject(project, lang);
  const urls = projectUrls(project);
  const url = lang === "en" ? urls.en : urls.es;
  const pageTitle = `${title} — ${category} | Dario Benitez`;

  return buildPage(baseHtml, {
    lang,
    url,
    alternates: { es: urls.es, en: urls.en, xDefault: urls.es },
    title: pageTitle,
    description: summary,
    ogTitle: pageTitle,
    ogDescription: summary,
    ogImageAlt: `${title} — ${category}`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        personNode(),
        webSiteNode(lang),
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
    },
  });
}

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sitemapUrl(loc, alternates, priority, lastmod) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(alternates.es)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(alternates.en)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates.xDefault)}" />`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap(lastmod) {
  const homeAlternates = { es: `${SITE}/`, en: `${SITE}/en`, xDefault: `${SITE}/` };
  const entries = [
    sitemapUrl(homeAlternates.es, homeAlternates, "1.0", lastmod),
    sitemapUrl(homeAlternates.en, homeAlternates, "0.8", lastmod),
  ];

  for (const project of projects) {
    const alternates = { ...projectUrls(project), xDefault: projectUrls(project).es };
    entries.push(sitemapUrl(alternates.es, alternates, "0.7", lastmod));
    entries.push(sitemapUrl(alternates.en, alternates, "0.6", lastmod));
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.join("\n"),
    "</urlset>",
    "",
  ].join("\n");
}

const baseHtml = readFileSync(join(dist, "index.html"), "utf8");

writeFileSync(join(dist, "index.html"), homePage(baseHtml, "es"));
mkdirSync(join(dist, "en"), { recursive: true });
writeFileSync(join(dist, "en", "index.html"), homePage(baseHtml, "en"));

for (const project of projects) {
  const esDir = join(dist, "proyectos", project.slug);
  const enDir = join(dist, "en", "projects", project.slug);
  mkdirSync(esDir, { recursive: true });
  mkdirSync(enDir, { recursive: true });
  writeFileSync(join(esDir, "index.html"), projectPage(baseHtml, project, "es"));
  writeFileSync(join(enDir, "index.html"), projectPage(baseHtml, project, "en"));
}

const lastmod = new Date().toISOString().slice(0, 10);
writeFileSync(join(dist, "sitemap.xml"), buildSitemap(lastmod));

console.log(`SEO prerender: 2 home + ${projects.length * 2} casos + sitemap generados.`);
