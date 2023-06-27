import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import isLoggedInFN from "../libs/isLoggedIn";
import TodoInput from "../components/TodoInput";

import TodoComponent from "../components/TodoComponent";
import useMutation from "../libs/useMutation";
export interface TodoForm {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default function Todo() {
  const [token, setToken] = useState<string | null>(isLoggedInFN());
  const [getTodos, { data, loading, status }] = useMutation<TodoForm[]>(
    "GET",
    "todos"
  );
  const [todos, setTodos] = useState<TodoForm[]>();
  useEffect(() => {
    if (status === 0) {
      getTodos({});
    }
  }, [status, getTodos]);
  useEffect(() => {
    if (!loading && data && status === 200) {
      setTodos(data);
    }
  }, [loading, status, data]);
  useEffect(() => {
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

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
