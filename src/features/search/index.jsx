import { useEffect, useRef, useState } from "react";
import { api } from "@/api";
import { Link } from "react-router-dom";

export default function SearchProducts({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/products/?search=${encodeURIComponent(query.trim().toLowerCase())}`,
        );
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="max-w-96 w-96">
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 p-2 w-full outline-none bg-white"
      />

      {loading && <p className="text-sm p-2">Загрузка...</p>}

      {!loading && products.length > 0 && (
        <div className="border-2 border-t-0 bg-white max-h-72 overflow-y-auto px-2">
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

      {!loading && query.trim() !== "" && products.length === 0 && (
        <p className="text-md text-gray-400 border-black border-2 border-t-0 h-72 bg-white flex justify-center items-center">
          Ничего не найдено
        </p>
      )}
    </div>
  );
}
