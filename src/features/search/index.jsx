import { useEffect, useRef, useState, useMemo } from 'react'
import { debounce } from 'lodash'
import { api } from '@/api'
import { Link } from 'react-router-dom'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/i18n/translations'

export default function SearchProducts({ onClose }) {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery) => {
        if (!searchQuery.trim()) {
          setProducts([])
          setLoading(false)
          return
        }

        try {
          setLoading(true)
          const res = await api.get(
            `/products/?search=${encodeURIComponent(searchQuery.trim().toLowerCase())}`
          )
          setProducts(res.data)
        } catch (e) {
          console.error(e)
        } finally {
          setLoading(false)
        }
      }, 400),
    []
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  return (
    <div className="w-72 sm:w-96">
      <input
        ref={inputRef}
        type="text"
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border-2 bg-white p-2 outline-none"
      />

      {loading && <p className="p-2 text-sm">Загрузка...</p>}

      {!loading && products.length > 0 && (
        <div className="max-h-72 overflow-y-auto border-2 border-t-0 bg-white px-2">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => onClose && onClose()}
              className="block border-b p-3 hover:bg-gray-50"
            >
              <h3 className="text-start">{product.name}</h3>
            </Link>
          ))}
        </div>
      )}

      {!loading && query.trim() !== '' && products.length === 0 && (
        <p className="text-md flex h-72 items-center justify-center border-2 border-t-0 border-black bg-white text-gray-400">
          Ничего не найдено
        </p>
      )}
    </div>
  )
}
