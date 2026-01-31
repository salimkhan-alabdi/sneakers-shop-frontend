import { Link } from "react-router-dom";

export const BrandsDropdown = ({ isOpen, brands, language }) => (
  <div
    className={`absolute top-full left-0 mt-2 z-50 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
  >
    <div className="bg-white border shadow-xl min-w-[400px] max-h-96 overflow-y-auto p-4 grid grid-cols-3 gap-y-4">
      {brands.length === 0 ? (
        <p className="col-span-3 text-center text-gray-400">Загрузка...</p>
      ) : (
        brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/${language}/brand/${brand.slug}`}
            className="hover:text-gray-600 text-sm font-medium"
          >
            {brand.name}
          </Link>
        ))
      )}
    </div>
  </div>
);
