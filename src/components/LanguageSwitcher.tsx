import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "pt";

  const toggle = (lng: "pt" | "en") => {
    if (lng !== current) i18n.changeLanguage(lng);
  };

  return (
    <div
      role="group"
      aria-label="Idioma"
      className="hidden md:inline-flex items-center text-xs font-semibold border border-border rounded-full overflow-hidden"
    >
      <button
        type="button"
        onClick={() => toggle("pt")}
        aria-pressed={current === "pt"}
        className={`px-2.5 py-1 transition-colors ${current === "pt" ? "bg-forest text-primary-foreground" : "text-muted-foreground hover:text-forest"}`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => toggle("en")}
        aria-pressed={current === "en"}
        className={`px-2.5 py-1 transition-colors ${current === "en" ? "bg-forest text-primary-foreground" : "text-muted-foreground hover:text-forest"}`}
      >
        EN
      </button>
    </div>
  );
}
