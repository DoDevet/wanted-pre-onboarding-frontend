import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import isLoggedInFN from "../libs/isLoggedIn";
import TodoInput from "../components/TodoInput";

export default function Todo() {
  const [token, setToken] = useState<string | null>(isLoggedInFN());

  useEffect(() => {
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

  return token ? (
    <Layout>
      <div className="items-center justify-center w-full">
        <TodoInput />
      </div>
    </Layout>
  ) : (
    <Navigate replace to="/signin" />
  );
}
