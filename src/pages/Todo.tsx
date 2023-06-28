import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import isLoggedInFN from "../libs/isLoggedIn";
import useQuery from "../libs/useQuery";
import { api_slash } from "../libs/utils";
import Layout from "../components/Layout";
import TodoInput from "../components/TodoInput";
import TodoComponent from "../components/TodoComponent";
export interface TodoForm {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default function Todo() {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(isLoggedInFN());
  const [todos, setTodos] = useState<TodoForm[]>();
  const { data, loading, status } = useQuery<TodoForm[]>(api_slash("todos"));

  const onClickLogoutBtn = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

  useEffect(() => {
    if (!loading && data && status === 200) {
      setTodos(data);
    }
    if (!loading && status === 401) {
      onClickLogoutBtn();
    }
  }, [loading, status, data, onClickLogoutBtn]);

  return token ? (
    <Layout>
      <section className="relative">
        <TodoInput setTodos={setTodos} />
        <ul className="space-y-3 ">
          {todos?.map((todo) => (
            <TodoComponent
              setTodos={setTodos}
              key={todo.id}
              id={todo.id}
              isCompleted={todo.isCompleted}
              todo={todo.todo}
              userId={todo.userId}
            />
          ))}
        </ul>
        <button onClick={onClickLogoutBtn} className="absolute right-0 -top-10">
          Logout
        </button>
      </section>
    </Layout>
  ) : (
    <Navigate replace to="/signin" />
  );
}
