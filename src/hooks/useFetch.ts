import { useEffect, useState } from "react";
import http from "common/http";

export function useFetch<T>(url: string, variables?: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);

  async function fetchData() {
    if (error) setError(null);
    setIsLoading(true);
    try {
      const response = await http.get(url, variables);
      if (response?.error?.code) {
        setError(response?.error?.message || "Error Occured");
      }
      if (response?.data) {
        setData(response?.data);
      }
    } catch (error: any) {
      setError(error?.message || "Error Occured");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
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
