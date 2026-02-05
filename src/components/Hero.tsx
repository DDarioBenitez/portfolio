import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AnimatedContainer, AnimatedText } from "../Animated/AnimatedText";

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
    const { t } = useTranslation();
    return (
        <AnimatedContainer className="min-h-[calc(100vh-80px)]">
            <div className="flex flex-col items-center justify-center text-center px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-7xl font-bold mb-6 relative"
                >
                    {/* El degradado y bg-clip-text VAN EN EL SPAN */}
                    <motion.span
                        className={`inline-block bg-clip-text text-transparent ${
                            isDarkMode
                                ? "bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                                : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
                        }`}
                        style={{ textShadow: "0 6px 40px rgba(59,130,246,0.40)" }} // glow sutil
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Dario Benitez
                    </motion.span>
                </motion.h1>

                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300"
                >
                    <AnimatedText 
                        text={t("hero.title")}
                        delay={0.8}
                    />
                </motion.h3>

                <motion.a
                    href="#projects"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95, y: 0 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 border-0"
                >
                    {t("hero.subTitle")}
                </motion.a>
            </div>
        </AnimatedContainer>
    );
}
