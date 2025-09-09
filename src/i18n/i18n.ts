import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Detecta idioma por el primer segmento del path: / (es) o /en
const seg = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";
const initialLng = seg === "en" ? "en" : "es"; // español por defecto

void i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
        lng: initialLng,
        fallbackLng: "es",
        supportedLngs: ["es", "en"],
        ns: ["common"],
        defaultNS: "common",
        detection: {
            order: ["path", "localStorage", "navigator"],
            caches: ["localStorage"],
        },
        interpolation: { escapeValue: false },
        returnEmptyString: false,
    });

export default i18n;
