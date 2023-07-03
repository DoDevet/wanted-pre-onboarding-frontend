import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import isLoggedInFN from "./libs/isLoggedIn";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <Navigate replace to={isLoggedInFN() ? "/todo" : "/signin"} />
          }
        ></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
