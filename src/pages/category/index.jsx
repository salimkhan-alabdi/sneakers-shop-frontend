import { useState, useMemo, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/product-card'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import Filters from '@/components/filter'
import { instance } from '@/api/axios.js'

import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function CategoryPage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const language = useLanguageStore((state) => state.language)

  const t = translations[language]?.categoryPage
  const tCategories = translations[language]?.categories

  // Initialize filters from URL params
  const [activeFilters, setActiveFilters] = useState(() => {
    const filters = {
      gender: searchParams.getAll('gender'),
      brand: searchParams.getAll('brand').map(Number),
      size: searchParams.getAll('size').map(Number),
      material: searchParams.getAll('material'),
      color_hex: searchParams.getAll('color'),
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    }
    return filters
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await instance.get('categories/')
      return data
    },
  })

  // We need brands for the filter sidebar
  const { data: allBrands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await instance.get('brands/')
      return data
    },
  })

  // Build query string from filters
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.append('category__slug', slug)

    if (activeFilters.gender?.length > 0) {
      activeFilters.gender.forEach(g => params.append('gender', g))
    }
    if (activeFilters.brand?.length > 0) {
      activeFilters.brand.forEach(b => params.append('brand', b))
    }
    if (activeFilters.size?.length > 0) {
      activeFilters.size.forEach(s => params.append('size', s))
    }
    if (activeFilters.material?.length > 0) {
      activeFilters.material.forEach(m => params.append('material', m))
    }
    if (activeFilters.color_hex?.length > 0) {
      activeFilters.color_hex.forEach(c => params.append('color', c))
    }
    if (activeFilters.minPrice) {
      params.append('price_min', activeFilters.minPrice)
    }
    if (activeFilters.maxPrice) {
      params.append('price_max', activeFilters.maxPrice)
    }

    return params.toString()
  }, [slug, activeFilters])

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'category', slug, queryString],
    queryFn: async () => {
      const { data } = await instance.get(`products/?${queryString}`)
      return Array.isArray(data) ? data : data.results || []
    },
    enabled: !!slug,
  })

  const category = useMemo(() =>
    categories.find((c) => c.slug?.toLowerCase() === slug?.toLowerCase()),
    [categories, slug]
  )

  const localizedCategoryName = category
    ? tCategories?.[category.slug] || category.name
    : ''

  const filterOptions = useMemo(() => {
    const brandsSet = new Set(),
      sizesSet = new Set(),
      materialsSet = new Set(),
      colorsSet = new Set()

    products.forEach((p) => {
      if (p.brand?.id) brandsSet.add(p.brand.id)
      p.sizes?.forEach((s) => {
        if (s.stock > 0) sizesSet.add(s.size)
      })
      if (p.material) materialsSet.add(p.material)
      if (p.color_hex) colorsSet.add(p.color_hex)
    })

    const availableBrands = allBrands.filter((b) => brandsSet.has(b.id))

    return {
      brands: availableBrands,
      sizes: Array.from(sizesSet).sort((a, b) => a - b),
      materials: Array.from(materialsSet),
      colors: Array.from(colorsSet),
    }
  }, [products, allBrands])

  const handleFilter = useCallback((filters) => {
    setActiveFilters(filters)

    // Update URL params
    const params = new URLSearchParams()
    if (filters.gender?.length > 0) {
      filters.gender.forEach(g => params.append('gender', g))
    }
    if (filters.brand?.length > 0) {
      filters.brand.forEach(b => params.append('brand', b))
    }
    if (filters.size?.length > 0) {
      filters.size.forEach(s => params.append('size', s))
    }
    if (filters.material?.length > 0) {
      filters.material.forEach(m => params.append('material', m))
    }
    if (filters.color_hex?.length > 0) {
      filters.color_hex.forEach(c => params.append('color', c))
    }
    if (filters.minPrice) {
      params.append('minPrice', filters.minPrice)
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice)
    }

    setSearchParams(params, { replace: true })
  }, [setSearchParams])

  const loading = loadingProducts || !categories.length

  // If categories loaded and no category found:
  if (categories.length > 0 && !category)
    return <div className="p-10 text-center">{t?.notFound || 'Категория не найдена'}</div>

  return (
    <main className="container mx-auto flex max-w-7xl flex-col items-start gap-8 px-2 py-8 md:flex-row md:px-4">
      {/* Сайдбар с фильтрами */}
      <div className="w-full shrink-0 md:sticky md:top-4 md:w-64">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/2 rounded bg-gray-100"></div>
            <div className="h-64 rounded bg-gray-50"></div>
          </div>
        ) : (
          <Filters onFilter={handleFilter} options={filterOptions} initialFilters={activeFilters} />
        )}
      </div>

      <div className="w-full flex-1">
        {/* Заголовок категории */}
        <div className="mb-6">
          {loading ? (
            <div className="h-9 w-48 animate-pulse rounded bg-gray-200"></div>
          ) : (
            <h1 className="text-2xl font-bold tracking-tight uppercase">
              {localizedCategoryName}{' '}
              <span className="text-sm font-normal text-gray-400 normal-case">
                ({products.length} {t.foundItems})
              </span>
            </h1>
          )}
        </div>

        {/* Сетка товаров / Скелетоны */}
        <div className="grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            // Показываем 8 скелетонов во время загрузки бэкенда
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-gray-50 py-20 text-center text-gray-500">
              {t.nothingFound}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
