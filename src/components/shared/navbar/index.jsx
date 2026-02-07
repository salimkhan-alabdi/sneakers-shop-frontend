import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchProducts from "@/features/search/index.jsx";
import { translations } from "@/i18n/translations";
import { useLanguageStore } from "@/store/languageStore";
import { instance } from "@/api/axios.js";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore.js";
import { api } from "@/api/index.js";
import { IconButton } from "@/components/icon-button";
import { LanguageSelector } from "@/components/language-selector";
import { BrandsDropdown } from "@/components/brands-dropdown";
import { CartDropdown } from "@/components/cart-dropdown";
import { CartButton } from "@/components/cart-button";

const AVAILABLE_LANGS = ["uz", "ru", "en"];

export default function Navbar() {
  const { items, fetchCart } = useCartStore();
  const { language, setLanguage } = useLanguageStore();
  const { favorites, loadFavorites } = useFavoritesStore();
  const languages = useLanguageStore((state) => state.language);
  const t = translations[languages];
  const [openMenu, setOpenMenu] = useState(null);
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const token = localStorage.getItem("access_token");
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );
  const favoritesCount = favorites.length;

  // Load start data
  useEffect(() => {
    if (token) {
      fetchCart();
      loadFavorites();
    }
  }, [token, fetchCart, loadFavorites]);

  // Load brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get("brands/");
        setBrands(res.data);
      } catch (err) {
        console.error("Ошибка загрузки брендов:", err);
      }
    };
    fetchBrands();
  }, []);

  // Menu close event when clicked out of box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = useCallback((type) => {
    setOpenMenu((prev) => (prev === type ? null : type));
  }, []);

  const handleChangeLanguage = async (lang) => {
    if (lang === language) return;
    try {
      await instance.post("/shared/language/set/", { language: lang });
      setLanguage(lang);
      localStorage.setItem("site_lang", lang);
      setOpenMenu(null);

      const segments = location.pathname.split("/").filter(Boolean);
      if (AVAILABLE_LANGS.includes(segments[0])) segments[0] = lang;
      else segments.unshift(lang);

      navigate(`/${segments.join("/")}`, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = useMemo(
    () => [
      { label: translations[language].new, href: "/new-arrival" },
      { label: translations[language].men, href: "/mens" },
      { label: translations[language].women, href: "/womens" },
      { label: translations[language].brands, href: null },
    ],
    [language],
  );

  return (
    <nav className="container flex justify-between items-center py-6 mx-auto px-4 flex-1">
      <Link to={`/${language}/`}>
        <img className="w-28" src="/logo.svg" alt="KINK" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden gap-10 font-bold text-md tracking-wider md:flex">
        {navLinks.map((link) => (
          <li
            key={link.label}
            className="relative"
            onMouseEnter={() => !link.href && setOpenMenu("brands")}
            onMouseLeave={() => !link.href && setOpenMenu(null)}
          >
            {link.href ? (
              <Link
                to={`/${language}${link.href}`}
                className="hover:text-gray-500 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <>
                <span
                  className={`cursor-pointer transition-colors ${openMenu === "brands" ? "text-gray-400" : ""}`}
                >
                  {link.label}
                </span>
                <BrandsDropdown
                  isOpen={openMenu === "brands"}
                  brands={brands}
                  language={language}
                />
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-2 relative" ref={menuRef}>
        <LanguageSelector
          currentLang={language}
          isOpen={openMenu === "lang"}
          onToggle={() => handleToggle("lang")}
          onSelect={handleChangeLanguage}
        />

        <div className="flex items-center gap-3">
          <IconButton
            src="/icons/search.svg"
            alt="search"
            onClick={() => handleToggle("search")}
          />
          <CartButton count={totalItems} onClick={() => handleToggle("cart")} />
          <IconButton
            src="/icons/user.svg"
            alt="user"
            isLink
            to={token ? `/${language}/profile` : `/${language}/login`}
            onClick={() => setOpenMenu(null)}
          />
        </div>

        {openMenu === "search" && (
          <div className="absolute right-0 top-full mt-2 z-50">
            <SearchProducts onClose={() => setOpenMenu(null)} />
          </div>
        )}

        {openMenu === "cart" && (
          <CartDropdown
            items={items}
            language={language}
            cartEmpty={t.cartEmpty}
            saved={t.saved}
            orders={t.orders}
            favoritesCount={favoritesCount}
            navigate={navigate}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </div>
    </nav>
  );
}
