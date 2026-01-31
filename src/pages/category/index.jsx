import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/product-card";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Filters from "@/components/filter";
import { instance } from "@/api/axios.js";

import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/i18n/translations";

export default function CategoryPage() {
  const { slug } = useParams();
  const language = useLanguageStore((state) => state.language);

  const t = translations[language]?.categoryPage;
  const tCategories = translations[language]?.categories;

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [baseProducts, setBaseProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const localizedCategoryName = category
    ? tCategories?.[category.slug] || category.name
    : "";

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesRes, brandRes] = await Promise.all([
        instance.get("categories/"),
        instance.get("brands/"),
      ]);

      setAllBrands(brandRes.data);

      const currentCategory = categoriesRes.data.find(
        (c) => c.slug?.toLowerCase() === slug.toLowerCase(),
      );

      if (!currentCategory) {
        setCategory(null);
        setLoading(false);
        return;
      }

      setCategory(currentCategory);

      const productsRes = await instance.get(
        `products/?category__slug=${slug}`,
      );
      const allProductsData = Array.isArray(productsRes.data)
        ? productsRes.data
        : productsRes.data.results || [];

      setBaseProducts(allProductsData);
      setFilteredProducts(allProductsData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) loadData();
  }, [loadData, slug]);

  const filterOptions = useMemo(() => {
    const brandsSet = new Set(),
      sizesSet = new Set(),
      materialsSet = new Set(),
      colorsSet = new Set();

    baseProducts.forEach((p) => {
      if (p.brand?.id) brandsSet.add(p.brand.id);
      p.sizes?.forEach((s) => {
        if (s.stock > 0) sizesSet.add(s.size);
      });
      if (p.material) materialsSet.add(p.material);
      if (p.color_hex) colorsSet.add(p.color_hex);
    });

    const availableBrands = allBrands.filter((b) => brandsSet.has(b.id));

    return {
      brands: availableBrands,
      sizes: Array.from(sizesSet).sort((a, b) => a - b),
      materials: Array.from(materialsSet),
      colors: Array.from(colorsSet),
    };
  }, [baseProducts, allBrands]);

  const handleFilter = useCallback(
    (filters) => {
      const result = baseProducts.filter((p) => {
        if (filters.gender?.length > 0 && !filters.gender.includes(p.gender))
          return false;
        if (
          filters.brand?.length > 0 &&
          (!p.brand || !filters.brand.includes(p.brand.id))
        )
          return false;
        if (
          filters.material?.length > 0 &&
          !filters.material.includes(p.material)
        )
          return false;
        if (filters.size?.length > 0) {
          const hasSize = p.sizes?.some(
            (s) => s.stock > 0 && filters.size.includes(s.size),
          );
          if (!hasSize) return false;
        }
        if (
          filters.color_hex?.length > 0 &&
          !filters.color_hex.includes(p.color_hex)
        )
          return false;
        const price = Number(p.price);
        if (filters.minPrice && price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && price > Number(filters.maxPrice)) return false;
        return true;
      });
      setFilteredProducts(result);
    },
    [baseProducts],
  );

  // Состояние "Ничего не найдено" показываем только если загрузка завершена и категории нет
  if (!loading && !category)
    return <div className="p-10 text-center">{t.notFound}</div>;

  return (
    <main className="container mx-auto max-w-7xl px-2 md:px-4 py-8 flex flex-col md:flex-row gap-8 items-start">
      {/* Сайдбар с фильтрами */}
      <div className="w-full md:w-64 shrink-0 md:sticky md:top-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-100 rounded w-1/2"></div>
            <div className="h-64 bg-gray-50 rounded"></div>
          </div>
        ) : (
          <Filters onFilter={handleFilter} options={filterOptions} />
        )}
      </div>

      <div className="flex-1 w-full">
        {/* Заголовок категории */}
        <div className="mb-6">
          {loading ? (
            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <h1 className="text-2xl font-bold uppercase tracking-tight">
              {localizedCategoryName}{" "}
              <span className="text-gray-400 text-sm font-normal normal-case">
                ({filteredProducts.length} {t.foundItems})
              </span>
            </h1>
          )}
        </div>

        {/* Сетка товаров / Скелетоны */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {loading ? (
            // Показываем 8 скелетонов во время загрузки бэкенда
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
              {t.nothingFound}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
