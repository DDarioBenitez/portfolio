import { useTranslation } from "react-i18next";

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
    const { t } = useTranslation();
    return (
        <div id="home" className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-4">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 relative">
                {/* El degradado y bg-clip-text VAN EN EL SPAN */}
                <span
                    className={`inline-block bg-clip-text text-transparent ${
                        isDarkMode
                            ? "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                            : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
                    }`}
                    style={{ textShadow: "0 6px 40px rgba(59,130,246,0.40)" }} // glow sutil
                >
                    Dario Benitez
                </span>
            </h1>

            <h3 className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">{t("hero.title")}</h3>

            <a
                href="#projects"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border-0"
            >
                {t("hero.subTitle")}
            </a>
        </div>
    );
}
