import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import isLoggedInFN from "../libs/isLoggedIn";

export default function Todo() {
  const [token, setToken] = useState<string | null>(isLoggedInFN());

  useEffect(() => {
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

  return token ? <Layout>Home</Layout> : <Navigate replace to="/signin" />;
}
