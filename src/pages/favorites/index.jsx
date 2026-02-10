import { useNavigate } from 'react-router-dom'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'
import Button from '@/components/button'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const language = useLanguageStore((state) => state.language)
  const { favorites, isLoading: loadingFavorites, toggleFavorite } = useFavorites()

  if (loadingFavorites) return <p className="p-10 text-center">Загрузка...</p>
  if (!favorites || favorites.length === 0)
    return (
      <p className="p-10 text-center text-gray-500">
        {translations[language]?.noFavorites || 'У вас нет избранных товаров'}
      </p>
    )

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">
        {translations[language]?.favorites || 'Избранное'}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((fav) => {
          const product = fav.product
          if (!product) return null

          const mainImage =
            product.images?.find((i) => i.is_main) || product.images?.[0]
          const displayImage = mainImage ? `${mainImage.image}` : '/placeholder.png'

          return (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded border p-3"
            >
              <img
                src={displayImage}
                alt={product.name}
                className="h-48 w-full cursor-pointer object-contain"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <div className="flex flex-1 flex-col justify-between">
                <h2 className="text-lg font-medium">{product.name}</h2>
                <p className="text-gray-500">
                  {Math.floor(product.price).toLocaleString()}{' '}
                  {translations[language]?.currency}
                </p>
              </div>

              <Button
                onClick={() => toggleFavorite(product)} // передаём объект, а не id
                className="bg-red-500 text-white"
              >
                {translations[language]?.remove || 'Удалить'}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
