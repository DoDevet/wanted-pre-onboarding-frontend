import "./index.css";
import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
  );
}

export default App;
