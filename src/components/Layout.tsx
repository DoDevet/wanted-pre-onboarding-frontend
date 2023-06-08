import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedInFN from "../libs/isLoggedIn";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedInFN()) {
      navigate("/todo");
    }
  }, []);
  return (
    <div className="flex items-center justify-center w-full mt-60">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
