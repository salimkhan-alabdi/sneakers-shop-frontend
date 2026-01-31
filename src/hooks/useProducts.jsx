import { useState, useEffect } from "react";
import { api } from "@/api";

export const useProducts = (endpoint = "products/") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error(`Ошибка при загрузке ${endpoint}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};
