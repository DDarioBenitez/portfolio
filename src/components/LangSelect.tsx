export default function LangSelect({
    value,
    onChange,
    className = "",
    id = "lang-select",
}: {
    value: "es" | "en";
    onChange: (l: "es" | "en") => void;
    className?: string;
    id?: string;
}) {
    return (
        <div className={`inline-flex shrink-0 ${className}`}>
            <select
                id={id}
                aria-label="Language"
                value={value}
                onChange={(e) => onChange(e.target.value as "es" | "en")}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="cursor-pointer border border-border-primary text-text-secondary bg-bg-nav rounded-md px-3 py-2 focus:outline-none focus:ring-0 w-auto whitespace-nowrap"
            >
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}
