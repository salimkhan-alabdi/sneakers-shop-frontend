import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '@/components/product-card'
import Filters from '@/components/filter'
import { instance } from '@/api/axios.js'

import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function BrandPage() {
  const { slug } = useParams()

  const language = useLanguageStore((state) => state.language)

  const t = translations[language]?.brandPage
  const tCategories = translations[language]?.categories

  const [loading, setLoading] = useState(true)
  const [brand, setBrand] = useState(null)
  const [allProductsFromServer, setAllProductsFromServer] = useState([])
  const [baseProducts, setBaseProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [allBrands, setAllBrands] = useState([])
  const [currentFilters, setCurrentFilters] = useState({})

  const localizedBrandName = brand ? brand.name : ''

  const loadData = useCallback(async () => {
    setLoading(true)
    setCurrentFilters({})

    try {
      const [brandsRes] = await Promise.all([instance.get('brands/')])

      const currentBrand = brandsRes.data.find(
        (b) => b.slug?.toLowerCase() === slug.toLowerCase()
      )

      if (!currentBrand) {
        setBrand(null)
        setBaseProducts([])
        setFilteredProducts([])
        setLoading(false)
        return
      }

      setBrand(currentBrand)

      const productsRes = await instance.get(`products/?brand__slug=${slug}`)

      const allProductsData = Array.isArray(productsRes.data)
        ? productsRes.data
        : productsRes.data.results || []

      setAllProductsFromServer(allProductsData)
      setBaseProducts(allProductsData)
      setFilteredProducts(allProductsData)

      setAllBrands(brandsRes.data)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
      setBaseProducts([])
      setFilteredProducts([])
      setAllProductsFromServer([])
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) loadData()
  }, [loadData, slug])

  const filterOptions = useMemo(() => {
    const sizesSet = new Set()
    const materialsSet = new Set()
    const colorsSet = new Set()

    baseProducts.forEach((p) => {
      p.sizes?.forEach((s) => {
        if (s.stock > 0) sizesSet.add(s.size)
      })
      if (p.material) materialsSet.add(p.material)
      if (p.color_hex) colorsSet.add(p.color_hex)
    })

    return {
      sizes: Array.from(sizesSet).sort((a, b) => a - b),
      materials: Array.from(materialsSet),
      colors: Array.from(colorsSet),
    }
  }, [baseProducts])

  const handleFilter = useCallback(
    (filters) => {
      setCurrentFilters(filters)

      const result = baseProducts.filter((p) => {
        if (filters.gender?.length > 0 && !filters.gender.includes(p.gender))
          return false

        if (
          filters.material?.length > 0 &&
          !filters.material.includes(p.material)
        )
          return false

        if (filters.size?.length > 0) {
          const hasSize = p.sizes?.some(
            (s) => s.stock > 0 && filters.size.includes(s.size)
          )
          if (!hasSize) return false
        }

        if (
          filters.color_hex?.length > 0 &&
          !filters.color_hex.includes(p.color_hex)
        )
          return false

        const price = Number(p.price)
        if (filters.minPrice && price < Number(filters.minPrice)) return false
        if (filters.maxPrice && price > Number(filters.maxPrice)) return false

        return true
      })

      setFilteredProducts(result)
    },
    [baseProducts]
  )

  if (loading)
    return <div className='p-10 text-center'>{t?.loading || 'Загрузка...'}</div>

  if (!brand)
    return (
      <div className='p-10 text-center'>{t?.notFound || 'Бренд не найден'}</div>
    )

  return (
    <main className='container mx-auto max-w-7xl px-2 md:px-4 py-8 flex flex-col md:flex-row gap-8 items-start'>
      <div className='w-full md:w-64 shrink-0 md:sticky md:top-4'>
        <Filters onFilter={handleFilter} options={filterOptions} />
      </div>

      <div className='flex-1 w-full'>
        <h1 className='text-2xl font-bold mb-6'>
          {localizedBrandName}{' '}
          <span className='text-gray-400 text-sm font-normal'>
            ({filteredProducts.length} {t?.foundItems || 'товаров'})
          </span>
        </h1>

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 text-gray-500 bg-gray-50 rounded-lg'>
            {t?.nothingFound || 'Ничего не найдено'}
          </div>
        )}
      </div>
    </main>
  )
}
