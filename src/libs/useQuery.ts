import { useEffect, useState } from "react";
import isLoggedInFN from "./isLoggedIn";

interface UseQueryState<T> {
  data?: T;
  loading: boolean;
  error?: object;
  status?: number;
}

export default function useQuery<T>(url: string) {
  const [state, setState] = useState<UseQueryState<T>>({
    error: undefined,
    data: undefined,
    loading: false,
    status: undefined,
  });
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${isLoggedInFN()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setState((prev) => ({ ...prev, status: res.status }));
        return res.json();
      })
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [url]);

  return {
    ...state,
  };
}
