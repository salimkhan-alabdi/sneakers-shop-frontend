import React from "react";
import ProductCard from "@/components/product-card";
import { useLanguageStore } from "@/store/languageStore.js";
import { translations } from "@/i18n/translations";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useProducts } from "@/hooks/useProducts";

export default function MensPage() {
  const { data: products, isLoading } = useProducts("products/");
  const language = useLanguageStore((state) => state.language);

  const t = translations[language];

  return (
    <main className="container mx-auto max-w-7xl px-1 md:px-4">
      <h2 className="mb-6 text-2xl font-bold">
        <h2 className="mb-6">{t.men}</h2>
      </h2>

      <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products
              .filter((p) => p.gender === "male")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>
    </main>
  );
}
