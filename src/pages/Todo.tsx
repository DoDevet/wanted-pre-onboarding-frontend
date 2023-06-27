import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import isLoggedInFN from "../libs/isLoggedIn";
import TodoInput from "../components/TodoInput";

import TodoComponent from "../components/TodoComponent";
import useQuery from "../libs/useQuery";
export interface TodoForm {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default function Todo() {
  const [token, setToken] = useState<string | null>(isLoggedInFN());
  const [todos, setTodos] = useState<TodoForm[]>();
  const { data, loading, status } = useQuery<TodoForm[]>({
    type: "todos",
  });

  useEffect(() => {
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

  useEffect(() => {
    if (!loading && data && status === 200) {
      setTodos(data);
    }
  }, [loading, status, data]);

  return token ? (
    <Layout>
      <TodoInput setTodos={setTodos} />
      <div className="space-y-3">
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
      </div>
    </Layout>
  ) : (
    <Navigate replace to="/signin" />
  );
}
