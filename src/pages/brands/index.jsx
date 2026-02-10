import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/product-card'
import Filters from '@/components/filter'
import { instance } from '@/api/axios.js'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'

export default function BrandPage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const language = useLanguageStore((state) => state.language)

  // Initialize filters from URL params
  const [activeFilters, setActiveFilters] = useState(() => {
    const filters = {
      gender: searchParams.getAll('gender'),
      size: searchParams.getAll('size').map(Number),
      material: searchParams.getAll('material'),
      color_hex: searchParams.getAll('color'),
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    }
    return filters
  })

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await instance.get('brands/')
      return data
    },
  })

  // Build query string from filters
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.append('brand__slug', slug)

    if (activeFilters.gender?.length > 0) {
      activeFilters.gender.forEach(g => params.append('gender', g))
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
    queryKey: ['products', 'brand', slug, queryString],
    queryFn: async () => {
      const { data } = await instance.get(`products/?${queryString}`)
      return Array.isArray(data) ? data : data.results || []
    },
    enabled: !!slug,
  })

  const brand = useMemo(() =>
    brands.find((b) => b.slug?.toLowerCase() === slug?.toLowerCase()),
    [brands, slug]
  )

  const t = translations[language]?.brandPage
  const localizedBrandName = brand ? brand.name : ''

  const filterOptions = useMemo(() => {
    const sizesSet = new Set()
    const materialsSet = new Set()
    const colorsSet = new Set()

    products.forEach((p) => {
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
  }, [products])

  const handleFilter = useCallback((filters) => {
    setActiveFilters(filters)

    // Update URL params
    const params = new URLSearchParams()
    if (filters.gender?.length > 0) {
      filters.gender.forEach(g => params.append('gender', g))
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

  // Show loading skeleton if products are loading.
  // We can show "Brand not found" only if brands are loaded and brand is missing,
  // OR if products are loaded and we decide that means something.
  // Actually, if brand is missing from 'brands' list, it is a 404 case effectively.
  // But strictly, we might show products even if brand info is missing (depending on API).
  // Consistent with valid logic: check brand existence.

  const loading = loadingProducts || !brands.length // minimalistic check, brands usually fast

  // If brands loaded and no brand found:
  if (brands.length > 0 && !brand) {
    return (
      <div className="p-10 text-center">{t?.notFound || 'Бренд не найден'}</div>
    )
  }

  return (
    <main className="container mx-auto flex max-w-7xl flex-col items-start gap-8 px-2 py-8 md:flex-row md:px-4">
      <div className="w-full shrink-0 md:sticky md:top-4 md:w-64">
        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-3/4 rounded bg-gray-100"></div>
            <div className="h-40 rounded bg-gray-50"></div>
            <div className="h-40 rounded bg-gray-50"></div>
          </div>
        ) : (
          <Filters onFilter={handleFilter} options={filterOptions} initialFilters={activeFilters} />
        )}
      </div>

      <div className="w-full flex-1">
        <div className="mb-6">
          {loading ? (
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>
          ) : (
            <h1 className="text-2xl font-bold">
              {localizedBrandName}{' '}
              <span className="text-sm font-normal text-gray-400">
                ({products.length} {t?.foundItems || 'товаров'})
              </span>
            </h1>
          )}
        </div>

        <div className="grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-gray-50 py-20 text-center text-gray-500">
              {t?.nothingFound || 'Ничего не найдено'}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
