import { useEffect, useState } from "react";
import { api } from "@/api";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/store/languageStore.js";
import { translations } from "@/i18n/translations";

const colors = ["#75C973", "#D4B45F", "#B86868", "#77589D", "#87BBDF"];

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const language = useLanguageStore((state) => state.language);
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get("categories/");

        setCategories(response.data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);
  return (
    <section className="container mt-24 mx-auto max-w-7xl">
      <h2 className="mb-6">{translations[language].category}</h2>
      <div className="grid grid-cols-5 gap-3">
        {categories.map((category, i) => (
          <Link key={category.id} to={`/category/${category.slug}`}>
            <div
              className="h-45 flex items-center justify-center"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <div className="w-40">
                <img
                  className="object-contain"
                  src={`${import.meta.env.VITE_API_URL}/${category.image}`}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
