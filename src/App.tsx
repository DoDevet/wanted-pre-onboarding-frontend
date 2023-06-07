import "./index.css";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = false;
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate replace to={"/signup"} />}
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
  );
}

export default App;
