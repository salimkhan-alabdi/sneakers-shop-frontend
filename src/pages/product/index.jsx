import { useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import Button from '@/components/button'
import ProductCard from '@/components/product-card'
import ProductGallery from '@/features/gallery'
import { useLanguageStore } from '@/store/languageStore.js'
import { translations } from '@/i18n/translations'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'

export default function ProductPage() {
  const { slug } = useParams()

  const { data: product, isLoading: loadingProduct } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await api.get(`products/${slug}/`)
      return res.data
    },
    enabled: !!slug,
  })

  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)

  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const fav = product ? isFavorite(product.id) : false
  const language = useLanguageStore((state) => state.language)

  // Pre-fetch all products for "related" logic (keeping existing logic of client-side filtering)
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products/')
      return Array.isArray(res.data) ? res.data : res.data.results || []
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  })

  const related = useMemo(() => {
    if (!product || !product.category || allProducts.length === 0) return []

    const filtered = allProducts.filter(
      (item) =>
        item.id !== product.id &&
        item.category?.id !== product.category.id
    )

    const byCategory = filtered.reduce((acc, item) => {
      const catId = item.category?.id || 'unknown'
      if (!acc[catId]) acc[catId] = []
      acc[catId].push(item)
      return acc
    }, {})

    const newRelated = []
    for (const catItems of Object.values(byCategory)) {
      const randomItem = catItems[Math.floor(Math.random() * catItems.length)]
      newRelated.push(randomItem)
      if (newRelated.length >= 4) break
    }
    return newRelated
  }, [product, allProducts])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер!')
      return
    }

    addItem({ productId: product.id, sizeId: selectedSize, quantity: 1 })
  }

  if (loadingProduct) return <p className="p-10 text-center">Загрузка...</p>
  if (!product) return <p className="p-10 text-center">Продукт не найден</p>

  return (
    <div className="container mx-auto space-y-10 px-4 md:space-y-20">
      <div className="grid grid-cols-1 items-start justify-center gap-10 pt-10 lg:grid-cols-2">
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center">
          {product.images?.[0]?.image && (
            <img
              onClick={() => setGalleryOpen(true)}
              src={product.images[0].image}
              alt={product.name}
              className="h-64 w-full max-w-xl cursor-pointer object-contain md:h-96"
            />
          )}

          <button
            onClick={() => setGalleryOpen(true)}
            className="mt-2 cursor-pointer text-sm underline"
            disabled={!product.images || product.images.length === 0}
          >
            {translations[language]?.album} ({product.images?.length || 0})
          </button>

          {isGalleryOpen && (
            <ProductGallery
              images={product.images}
              onClose={() => setGalleryOpen(false)}
            />
          )}

          <div className="mt-6 flex w-full max-w-[500px] items-start justify-between text-sm">
            <span>
              <p className="font-semibold">{translations[language]?.choose}</p>
              <p>{translations[language]?.save}</p>
            </span>
            <img
              className="size-8 cursor-pointer transition active:scale-95"
              src={fav ? '/icons/saved.svg' : '/icons/save.svg'}
              alt="save"
              onClick={() => toggleFavorite(product)}
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[500px] space-y-5">
          <div>
            <p className="text-2xl text-gray-500">
              {product.brand?.name || 'Не указан'}
            </p>
            <h1 className="break-word text-3xl leading-12 font-medium">
              {product.name}
            </h1>
          </div>

          <p className="text-2xl font-bold">
            {Math.floor(Number(product.price)).toLocaleString()}{' '}
            {translations[language]?.currency}
          </p>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                className="size-6"
                key={i}
                src="/star.svg"
                alt="star"
                style={{
                  opacity: i < Math.round(product.rating || 0) ? 1 : 0.3,
                }}
              />
            ))}
            <span className="ml-1 text-xs text-gray-400">
              ({product.rating || 0})
            </span>
          </div>

          {product.sizes?.length > 0 && (
            <>
              <p className="pt-4 text-lg font-semibold">
                {translations[language]?.size}{' '}
                {selectedSize && (
                  <span className="text-gray-600">
                    ({product.sizes.find((s) => s.id === selectedSize)?.size})
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isOut = s.stock === 0
                  const isSelected = s.id === selectedSize

                  return (
                    <div
                      key={s.id}
                      onClick={() => !isOut && setSelectedSize(s.id)}
                      className={`flex size-14 items-center justify-center border ${isOut
                        ? 'cursor-not-allowed bg-gray-50 text-gray-300 line-through'
                        : isSelected
                          ? 'cursor-pointer border-gray-800 bg-gray-800 text-white'
                          : 'cursor-pointer border-gray-300 bg-gray-100 hover:bg-gray-200'
                        } `}
                    >
                      {s.size}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {product.type === 'sneakers' && (
            <p className="cursor-pointer text-xs underline">
              {translations[language]?.foot}
            </p>
          )}

          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full ${!selectedSize ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            {translations[language]?.cart}
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container mx-auto mt-24 max-w-7xl px-1 md:px-4">
          <h2 className="mb-6 text-xl font-bold">
            {translations[language].boughtBy}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
