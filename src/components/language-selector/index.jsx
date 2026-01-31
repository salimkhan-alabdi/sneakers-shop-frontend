const LANG_ICONS = {
  uz: "/icons/uz_lan.svg",
  ru: "/icons/ru_lan.svg",
  en: "/icons/en_lan.svg",
};

export const LanguageSelector = ({
  currentLang,
  isOpen,
  onToggle,
  onSelect,
  availableLangs = ["uz", "ru", "en"],
}) => (
  <div className="relative">
    <button
      className="flex items-center justify-center w-8 h-8 cursor-pointer"
      onClick={onToggle}
    >
      <img
        src={LANG_ICONS[currentLang]}
        alt={currentLang}
        className="w-5.5 h-5.5"
      />
    </button>

    {isOpen && (
      <div className="absolute left-0 top-full mt-2 bg-white border-2 w-32 z-50 flex flex-col shadow-lg">
        {availableLangs.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className="flex items-center gap-2 w-full px-3 py-2 text-left border-b last:border-b-0 hover:bg-gray-50 uppercase text-sm cursor-pointer"
          >
            {lang}
          </button>
        ))}
      </div>
    )}
  </div>
);
