interface LanguageToggleProps {
  currentLang: "es" | "en";
  onToggle: (value: "es" | "en") => void;
  label: string;
}

export default function LanguageToggle({ currentLang, onToggle, label }: LanguageToggleProps) {
  return (
    <div className="flex items-center rounded border border-line bg-surface p-0.5" role="group" aria-label={label}>
      {(["es", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onToggle(lang)}
          aria-pressed={currentLang === lang}
          className={`grid min-h-11 min-w-11 place-items-center rounded px-2.5 font-mono text-xs font-medium uppercase transition-colors md:min-h-8 md:min-w-8 ${
            currentLang === lang ? "bg-accent-light text-accent-dark" : "text-muted hover:text-ink"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
