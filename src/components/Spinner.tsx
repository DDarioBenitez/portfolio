import { useState, useEffect } from "react";

const Spinner = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const theme = document.documentElement.getAttribute("data-theme");
        setIsDarkMode(theme === "dark");

        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            setIsDarkMode(currentTheme === "dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`w-screen h-screen flex items-center justify-center ${
                isDarkMode
                    ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
                    : "bg-gradient-to-br from-gray-50 via-purple-50 to-violet-50"
            }`}
        >
            <div className="flex items-center justify-center">
                <div
                    className={`
                        h-14 w-14
                        animate-spin
                        rounded-full
                        border-4
                        ${
                            isDarkMode
                                ? "border-purple-500 border-t-violet-400 border-r-indigo-400 shadow-lg shadow-purple-500/50"
                                : "border-purple-300 border-t-violet-300 border-r-indigo-300 shadow-lg shadow-purple-300/50"
                        }`}
                ></div>
            </div>
        </div>
    );
};

export default Spinner;
