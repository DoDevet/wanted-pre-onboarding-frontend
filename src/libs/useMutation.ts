import { useState } from "react";
import isLoggedInFN from "./isLoggedIn";

type Method = "POST" | "DELETE" | "PUT";
interface UseMuataionForm<T> {
  data?: T;
  status: number;
  error?: string;
  loading: boolean;
}
interface UseMutationProps {
  method: Method;
  url: string;
}

type UseMutationReturnType<T> = [(data: any) => void, UseMuataionForm<T>];

export default function useMutation<T>({
  method,
  url,
}: UseMutationProps): UseMutationReturnType<T> {
  const [state, setState] = useState<UseMuataionForm<T>>({
    data: undefined,
    loading: false,
    status: 0,
    error: "",
  });

  function handler(data: any) {
    const body = JSON.stringify({ ...data });
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        Authorization: isLoggedInFN() ? `Bearer ${isLoggedInFN()}` : "",
        "Content-Type": "application/json",
      },
      body,
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
  }

  return [handler, state];
}
