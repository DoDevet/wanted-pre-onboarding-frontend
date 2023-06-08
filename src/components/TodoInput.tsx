import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import TodoMutation, { TodoForm } from "../libs/todoMutation";
import TodoComponent from "./TodoComponent";

export default function TodoInput() {
  const [inputTodoText, setInputTodoText] = useState("");
  const [todos, setTodos] = useState<TodoForm[]>();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    (async () => {
      const data = await TodoMutation({ method: "GET" });
      setTodos(data);
    })();
  }, [todo]);

  const onSubmitCreateTodo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = await TodoMutation({
      method: "POST",
      data: { todo: inputTodoText },
    });
    setTodo(data);
    setInputTodoText("");
  };
  const onClickDeleteTodo = async (id: number) => {
    const data = await TodoMutation({
      method: "DELETE",
      id,
    });
    if (data && data.status === 204) {
      setTodos((prev) => prev?.filter((item) => item?.id !== +id));
    }
  };
  const onChangeUpdateTodo = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    const data = await TodoMutation({
      method: "PUT",
      id,
      data: { todo, isCompleted },
    });
    if (data) {
      setTodos((prev) =>
        prev?.map((todo) => (todo.id === data.id ? data : todo))
      );
    }
  };
  const deleteFn = useCallback(onClickDeleteTodo, []);
  const updateFn = useCallback(onChangeUpdateTodo, []);
  const onChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setInputTodoText(event.currentTarget.value);
  }, []);
  return (
    <div className="w-full">
      <form onSubmit={onSubmitCreateTodo} className="space-y-3">
        <Input
          type="text"
          testId="new-todo-input"
          fn={onChange}
          value={inputTodoText}
          inputText="Input Todo"
        />
        <div className="flex items-center justify-center w-full">
          <button
            className="w-2/3 py-1 text-lg font-bold text-center text-white rounded-md bg-sky-500"
            data-testid="new-todo-add-button"
          >
            추가
          </button>
        </div>
      </form>
      <div className="mt-5 space-y-5">
        {todos?.map((todo) => (
          <TodoComponent
            key={todo.id}
            {...todo}
            deleteFn={deleteFn}
            updateFn={updateFn}
          />
        ))}
      </div>
    </div>
  );
}
