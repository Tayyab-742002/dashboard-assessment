import { useEffect, useState } from "react";
import type { ApiError } from "../types/api.types";

interface UseFetchResult {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<unknown>;
}

export function useFetch(
  fetchFn: () => Promise<unknown>,
  dependencies: unknown[]
): UseFetchResult {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}
