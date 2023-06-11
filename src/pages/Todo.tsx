import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import isLoggedInFN from "../libs/isLoggedIn";
import TodoInput from "../components/TodoInput";
import TodoHandler, { TodoForm } from "../libs/todoHandler";
import TodoComponent from "../components/TodoComponent";

export default function Todo() {
  const [token, setToken] = useState<string | null>(isLoggedInFN());
  const [todos, setTodos] = useState<TodoForm[]>();

  useEffect(() => {
    (async () => {
      const data = await TodoHandler({ method: "GET" });
      setTodos(data);
    })();
    const handleSetToken = () => setToken(isLoggedInFN());
    window.addEventListener("storage", handleSetToken);
    return () => window.removeEventListener("storage", handleSetToken);
  }, []);

  const deleteFn = useCallback(async (id: number) => {
    const data = await TodoHandler({
      method: "DELETE",
      id,
    });
    if (data && data.status === 204) {
      setTodos((prev) => prev?.filter((item) => item?.id !== +id));
    }
  }, []);
  const updateFn = useCallback(
    async (id: number, todo: string, isCompleted: boolean) => {
      const data = await TodoHandler({
        method: "PUT",
        id,
        data: { todo, isCompleted },
      });
      if (data) {
        setTodos((prev) =>
          prev?.map((todo) => (todo.id === data.id ? data : todo))
        );
      }
    },
    []
  );

  return token ? (
    <Layout>
      <TodoInput setTodos={setTodos} />
      <div className="space-y-3">
        {todos?.map((todo) => (
          <TodoComponent
            key={todo.id}
            id={todo.id}
            isCompleted={todo.isCompleted}
            todo={todo.todo}
            userId={todo.userId}
            deleteFn={deleteFn}
            updateFn={updateFn}
          />
        ))}
      </div>
    </Layout>
  ) : (
    <Navigate replace to="/signin" />
  );
}
