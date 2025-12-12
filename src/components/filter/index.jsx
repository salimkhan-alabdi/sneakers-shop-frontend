import { useEffect, useState } from 'react'
import Button from '@/components/button'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function Filters({ onFilter, options }) {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]?.filters

  const { brands = [], sizes = [], materials = [], colors = [] } = options

  const [filters, setFilters] = useState({
    gender: [],
    brand: [],
    size: [],
    material: [],
    color_hex: [],
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    onFilter(filters)
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
    <div className='bg-white p-5 space-y-6'>
      {/* --- PRICE --- */}
      <div>
        <h3 className='font-bold text-gray-900 mb-3'>{t.price}</h3>

        <div className='flex gap-2 items-center'>
          <input
            type='number'
            name='minPrice'
            placeholder={t.minPrice}
            className='w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-black outline-none'
            value={filters.minPrice}
            onChange={handlePriceChange}
          />
          <span className='text-gray-400'>-</span>
          <input
            type='number'
            name='maxPrice'
            placeholder={t.maxPrice}
            className='w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-black outline-none'
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <hr className='border-gray-100' />

      {/* --- GENDER --- */}
      <div>
        <h3 className='font-bold text-gray-900 mb-3'>{t.gender}</h3>
        <div className='space-y-2'>
          <label className='flex items-center gap-2 cursor-pointer hover:text-gray-600'>
            <input
              type='checkbox'
              checked={filters.gender.includes('male')}
              onChange={() => toggleFilter('gender', 'male')}
              className='accent-black'
            />
            <span className='text-sm'>{t.men}</span>
          </label>

          <label className='flex items-center gap-2 cursor-pointer hover:text-gray-600'>
            <input
              type='checkbox'
              checked={filters.gender.includes('female')}
              onChange={() => toggleFilter('gender', 'female')}
              className='accent-black'
            />
            <span className='text-sm'>{t.women}</span>
          </label>
        </div>
      </div>

      <hr className='border-gray-100' />

      {/* --- BRAND --- */}
      {brands.length > 0 && (
        <div>
          <h3 className='font-bold text-gray-900 mb-3'>{t.brand}</h3>
          <div className='max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar'>
            {brands.map((brand) => (
              <label
                key={brand.id}
                className='flex items-center gap-2 cursor-pointer hover:text-gray-600'
              >
                <input
                  type='checkbox'
                  checked={filters.brand.includes(brand.id)}
                  onChange={() => toggleFilter('brand', brand.id)}
                  className='accent-black'
                />
                <span className='text-sm'>{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* --- SIZE --- */}
      {sizes.length > 0 && (
        <div>
          <h3 className='font-bold text-gray-900 mb-3'>{t.size}</h3>

          <div className='flex flex-wrap gap-2'>
            {sizes.map((size) => {
              const active = filters.size.includes(size)
              return (
                <div
                  key={size}
                  onClick={() => toggleFilter('size', size)}
                  className={`size-8 flex justify-center items-center text-xs cursor-pointer 
                    ${active ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'}
                  `}
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
          <hr className='border-gray-100' />
          <div>
            <h3 className='font-bold text-gray-900 mb-3'>{t.material}</h3>

            <div className='max-h-40 overflow-y-auto space-y-2 custom-scrollbar'>
              {materials.map((m) => (
                <label
                  key={m}
                  className='flex items-center gap-2 cursor-pointer hover:text-gray-600'
                >
                  <input
                    type='checkbox'
                    checked={filters.material.includes(m)}
                    onChange={() => toggleFilter('material', m)}
                    className='accent-black'
                  />
                  <span className='text-sm capitalize'>
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
          <hr className='border-gray-100' />
          <div>
            <h3 className='font-bold text-gray-900 mb-3'>{t.color}</h3>
            <div className='flex flex-wrap gap-2'>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleFilter('color_hex', c)}
                  className={`w-6 h-6 border transition 
                    ${
                      filters.color_hex.includes(c)
                        ? 'ring-1 ring-black scale-110'
                        : 'border-gray-300 hover:scale-110'
                    }
                  `}
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
        className='w-full bg-gray-200 hover:bg-gray-300 text-black mt-4'
      >
        {t.reset}
      </Button>
    </div>
  )
}
