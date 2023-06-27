import { useState } from "react";
import isLoggedInFN from "./isLoggedIn";

type Method = "POST" | "DELETE" | "PUT" | "GET";
interface UseMuataionForm<T> {
  data?: T;
  status: number;
  errorMessage?: string;
  loading: boolean;
}

type UseMutationReturnType<T> = [(data: any) => void, UseMuataionForm<T>];

export default function useMutation<T>(
  method: Method,
  type: "todos" | "signin" | "signup",
  id?: number
): UseMutationReturnType<T> {
  const [state, setState] = useState<UseMuataionForm<T>>({
    data: undefined,
    loading: false,
    status: 0,
    errorMessage: "",
  });

  function handler(data: any) {
    const body = JSON.stringify({ ...data });
    setState((prev) => ({ ...prev, loading: true }));
    fetch(
      `https://www.pre-onboarding-selection-task.shop/${
        type !== "todos" ? "auth/" + type : "todos" + (id ? `/${id}` : "")
      }`,
      {
        method,
        headers: {
          Authorization: type === "todos" ? `Bearer ${isLoggedInFN()}` : "",
          "Content-Type": "application/json",
        },
        body: method === "GET" ? null : body,
      }
    )
      .then((res) => {
        setState((prev) => ({ ...prev, status: res.status }));
        return res.json();
      })
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
      })
      .catch((error) => setState((prev) => ({ ...prev, errorMessage: error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [handler, state];
}
