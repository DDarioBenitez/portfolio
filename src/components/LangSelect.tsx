export default function LangSelect({
    value,
    className = "",
    id = "lang-select",
}: {
    value: "es" | "en";
    className?: string;
    id?: string;
}) {
    return (
        <div className={`inline-flex shrink-0 ${className}`}>
            <select
                id={id}
                aria-label="Language"
                value={value}
                className="cursor-pointer border border-border-primary text-text-secondary bg-bg-nav rounded-md px-3 py-2 focus:outline-none focus:ring-0 w-auto whitespace-nowrap"
            >
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}
