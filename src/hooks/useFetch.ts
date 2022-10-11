import { useEffect, useState } from "react";
import http from "common/http";

export function useFetch<T>(url: string, variables?: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await http.get(url, variables);
      if (response?.error?.code) {
        setError(response?.error?.message);
      }
      if (response?.data) {
        setData(response?.data);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) setError(null);

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
}
