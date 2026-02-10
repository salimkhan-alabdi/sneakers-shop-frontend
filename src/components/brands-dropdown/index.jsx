import { Link } from 'react-router-dom'

export const BrandsDropdown = ({ isOpen, brands, language }) => (
  <div
    className={`absolute top-full left-0 z-50 mt-2 transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
  >
    <div className="grid max-h-96 min-w-[400px] grid-cols-3 gap-y-4 overflow-y-auto border bg-white p-4 shadow-xl">
      {brands.length === 0 ? (
        <p className="col-span-3 text-center text-gray-400">Загрузка...</p>
      ) : (
        brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/${language}/brand/${brand.slug}`}
            className="text-sm font-semibold hover:text-gray-600"
          >
            {brand.name}
          </Link>
        ))
      )}
    </div>
  </div>
)
