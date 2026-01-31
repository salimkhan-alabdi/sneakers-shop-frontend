import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { api } from "@/api";
import Button from "@/components/button";
import ProductCard from "@/components/product-card";
import ProductGallery from "@/features/gallery";
import { useLanguageStore } from "@/store/languageStore.js";
import { translations } from "@/i18n/translations";
import { useCartStore } from "@/store/cartStore.js";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addItem } = useCartStore();
  const { favorites, loadFavorites, toggleFavorite, isFavorite } =
    useFavoritesStore();
  const [loadingFavs, setLoadingFavs] = useState(true);
  const fav = !loadingFavs && product ? isFavorite(product.id) : false;
  useEffect(() => {
    const fetchFavs = async () => {
      await loadFavorites();
      setLoadingFavs(false);
    };
    fetchFavs();
  }, [loadFavorites]);

  const language = useLanguageStore((state) => state.language);

  const loadProduct = useCallback(async () => {
    if (!slug) return;

    try {
      const res = await api.get(`products/${slug}/`);
      setProduct(res.data);
    } catch (err) {
      console.error("Ошибка загрузки продукта:", err);
      setProduct(null);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const loadRelated = useCallback(async (currentProduct) => {
    if (!currentProduct || !currentProduct.category) return;

    try {
      const res = await api.get("/products/");
      const allProducts = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      const filtered = allProducts.filter(
        (item) =>
          item.id !== currentProduct.id &&
          item.category?.id !== currentProduct.category.id,
      );

      const byCategory = filtered.reduce((acc, item) => {
        const catId = item.category?.id || "unknown";
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(item);
        return acc;
      }, {});

      const related = [];
      for (const catItems of Object.values(byCategory)) {
        const randomItem =
          catItems[Math.floor(Math.random() * catItems.length)];
        related.push(randomItem);
        if (related.length >= 4) break;
      }

      setRelated(related);
    } catch (err) {
      console.error("Ошибка загрузки связанных товаров:", err);
      setRelated([]);
    }
  }, []);

  useEffect(() => {
    if (product) {
      loadRelated(product);
    }
  }, [product, loadRelated]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер!");
      return;
    }

    addItem(product.id, selectedSize, 1);
  };

  if (!product) return <p className="p-10 text-center">Загрузка...</p>;

  return (
    <div className="container mx-auto px-4 space-y-10 md:space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-start gap-10 pt-10">
        <div className="flex flex-col w-full max-w-[600px] items-center mx-auto">
          {product.images?.[0]?.image && (
            <img
              onClick={() => setGalleryOpen(true)}
              src={product.images[0].image}
              alt={product.name}
              className="w-full max-w-xl h-64 md:h-96 object-contain cursor-pointer"
            />
          )}

          <button
            onClick={() => setGalleryOpen(true)}
            className="underline text-sm cursor-pointer mt-2"
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

          <div className="flex mt-6 text-sm justify-between w-full max-w-[500px] items-start">
            <span>
              <p className="font-semibold">{translations[language]?.choose}</p>
              <p>{translations[language]?.save}</p>
            </span>
            <img
              className="size-8 cursor-pointer active:scale-95 transition"
              src={fav ? "/icons/saved.svg" : "/icons/save.svg"}
              alt="save"
              onClick={() => toggleFavorite(product)}
            />
          </div>
        </div>

        <div className="w-full max-w-[500px] space-y-5 mx-auto">
          <div>
            <p className="text-2xl text-gray-500">
              {product.brand?.name || "Не указан"}
            </p>
            <h1 className="text-3xl font-medium break-word leading-12">
              {product.name}
            </h1>
          </div>

          <p className="text-2xl font-bold">
            {Math.floor(Number(product.price)).toLocaleString()}{" "}
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
            <span className="text-xs text-gray-400 ml-1">
              ({product.rating || 0})
            </span>
          </div>

          {product.sizes?.length > 0 && (
            <>
              <p className="text-lg font-semibold pt-4">
                {translations[language]?.size}{" "}
                {selectedSize && (
                  <span className="text-gray-600">
                    ({product.sizes.find((s) => s.id === selectedSize)?.size})
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isOut = s.stock === 0;
                  const isSelected = s.id === selectedSize;

                  return (
                    <div
                      key={s.id}
                      onClick={() => !isOut && setSelectedSize(s.id)}
                      className={`
                        size-14 flex items-center justify-center border
                        ${
                          isOut
                            ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-gray-800 text-white border-gray-800 cursor-pointer"
                              : "bg-gray-100 hover:bg-gray-200 cursor-pointer border-gray-300"
                        }
                      `}
                    >
                      {s.size}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {product.type === "sneakers" && (
            <p className="text-xs underline cursor-pointer">
              {translations[language]?.foot}
            </p>
          )}

          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full ${
              !selectedSize ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {translations[language]?.cart}
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 container mx-auto max-w-7xl px-1 md:px-4">
          <h2 className="mb-6 text-xl font-bold">
            {translations[language].boughtBy}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
