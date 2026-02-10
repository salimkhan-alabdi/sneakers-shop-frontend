import { useEffect, useState } from 'react'
import Button from '@/components/button'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function Filters({ onFilter, options, initialFilters = {} }) {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]?.filters

  const { brands = [], sizes = [], materials = [], colors = [] } = options

  const [filters, setFilters] = useState({
    gender: initialFilters.gender || [],
    brand: initialFilters.brand || [],
    size: initialFilters.size || [],
    material: initialFilters.material || [],
    color_hex: initialFilters.color_hex || [],
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
  })

  useEffect(() => {
    onFilter(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const toggleFilter = (field, value) => {
    setFilters((prev) => {
      const list = prev[field]
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      }
    })
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const resetFilters = () => {
    setFilters({
      gender: [],
      brand: [],
      size: [],
      material: [],
      color_hex: [],
      minPrice: '',
      maxPrice: '',
    })
  }

  return (
    <div className="space-y-6 bg-white p-5">
      {/* --- PRICE --- */}
      <div>
        <h3 className="mb-3 font-bold text-gray-900">{t.price}</h3>

        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder={t.minPrice}
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-black"
            value={filters.minPrice}
            onChange={handlePriceChange}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder={t.maxPrice}
            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-black"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* --- GENDER --- */}
      <div>
        <h3 className="mb-3 font-bold text-gray-900">{t.gender}</h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 hover:text-gray-600">
            <input
              type="checkbox"
              checked={filters.gender.includes('male')}
              onChange={() => toggleFilter('gender', 'male')}
              className="accent-black"
            />
            <span className="text-sm">{t.men}</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 hover:text-gray-600">
            <input
              type="checkbox"
              checked={filters.gender.includes('female')}
              onChange={() => toggleFilter('gender', 'female')}
              className="accent-black"
            />
            <span className="text-sm">{t.women}</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* --- BRAND --- */}
      {brands.length > 0 && (
        <div>
          <h3 className="mb-3 font-bold text-gray-900">{t.brand}</h3>
          <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-2">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex cursor-pointer items-center gap-2 hover:text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand.id)}
                  onChange={() => toggleFilter('brand', brand.id)}
                  className="accent-black"
                />
                <span className="text-sm">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* --- SIZE --- */}
      {sizes.length > 0 && (
        <div>
          <h3 className="mb-3 font-bold text-gray-900">{t.size}</h3>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const active = filters.size.includes(size)
              return (
                <div
                  key={size}
                  onClick={() => toggleFilter('size', size)}
                  className={`flex size-8 cursor-pointer items-center justify-center text-xs ${active ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'} `}
                >
                  {size}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* --- MATERIAL --- */}
      {materials.length > 0 && (
        <>
          <hr className="border-gray-100" />
          <div>
            <h3 className="mb-3 font-bold text-gray-900">{t.material}</h3>

            <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto">
              {materials.map((m) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-2 hover:text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={filters.material.includes(m)}
                    onChange={() => toggleFilter('material', m)}
                    className="accent-black"
                  />
                  <span className="text-sm capitalize">
                    {translations[language]?.filters?.materialsList?.[m] || m}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- COLOR --- */}
      {colors.length > 0 && (
        <>
          <hr className="border-gray-100" />
          <div>
            <h3 className="mb-3 font-bold text-gray-900">{t.color}</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleFilter('color_hex', c)}
                  className={`h-6 w-6 border transition ${filters.color_hex.includes(c)
                    ? 'scale-110 ring-1 ring-black'
                    : 'border-gray-300 hover:scale-110'
                    } `}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* RESET */}
      <Button
        onClick={resetFilters}
        className="mt-4 w-full bg-gray-200 text-black hover:bg-gray-300"
      >
        {t.reset}
      </Button>
    </div>
  )
}
