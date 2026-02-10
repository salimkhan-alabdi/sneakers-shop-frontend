const LANG_ICONS = {
  uz: '/icons/uz_lan.svg',
  ru: '/icons/ru_lan.svg',
  en: '/icons/en_lan.svg',
}

export const LanguageSelector = ({
  currentLang,
  isOpen,
  onToggle,
  onSelect,
  availableLangs = ['uz', 'ru', 'en'],
}) => (
  <div className="relative">
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center"
      onClick={onToggle}
    >
      <img
        src={LANG_ICONS[currentLang]}
        alt={currentLang}
        className="h-5.5 w-5.5"
      />
    </button>

    {isOpen && (
      <div className="absolute top-full left-0 z-50 mt-2 flex w-32 flex-col border-2 bg-white shadow-lg">
        {availableLangs.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className="flex w-full cursor-pointer items-center gap-2 border-b px-3 py-2 text-left text-sm font-bold uppercase last:border-b-0 hover:bg-gray-50"
          >
            {lang}
          </button>
        ))}
      </div>
    )}
  </div>
)
