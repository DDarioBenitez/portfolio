interface TechBadgeProps {
    isDarkMode: boolean;
    name: string;
    icon: string;
    color: string;
}

export default function AboutMeTechBadge({ isDarkMode, name, icon, color }: TechBadgeProps) {
    return (
        <div
            className={`px-4 py-3 flex items-center justify-center rounded-2xl text-center bg-bg-tech-card transition-all duration-300 hover:scale-105 transform border group 
                ${isDarkMode ? "border-border-primary" : "border-border-secondary"} hover:bg-hover-tech-card`}
        >
            <div className="flex flex-col items-center gap-2">
                {/* Ícono */}
                <img src={icon} alt={`${name} icon`} className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                {/* Texto */}
                <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent font-semibold`}>{name}</span>
            </div>
        </div>
    );
}
