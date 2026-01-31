import ProductCard from "@/components/product-card";
import ProductCardSkeleton from "@/components/PproductCardSkeleton";
import { useProducts } from "@/hooks/useProducts"; // Импорт хука
import { useLanguageStore } from "@/store/languageStore.js";
import { translations } from "@/i18n/translations";

export default function PopularList() {
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];

  const { data: products, isLoading } = useProducts("products/");

  const popularProducts = products.filter((p) => p.is_popular).slice(0, 10);

  return (
    <main className="mt-24 container mx-auto max-w-7xl px-1 md:px-4">
      <h2 className="mb-6">{t.popular}</h2>

      <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </main>
  );
}
