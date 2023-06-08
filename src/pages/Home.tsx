import { Navigate } from "react-router-dom";
import isLoggedInFN from "../libs/isLoggedIn";

export default function Home() {
  return isLoggedInFN() ? (
    <Navigate replace to={"/todo"} />
  ) : (
    <Navigate replace to={"/signin"} />
  );
}
