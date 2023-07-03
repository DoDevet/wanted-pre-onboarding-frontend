import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import { TodoForm } from "../pages/Todo";
import Button from "./Button";
import useMutation from "../libs/useMutation";
import { api_slash } from "../libs/utils";

export default function TodoInput({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TodoForm[] | undefined>>;
}) {
  const [inputTodoText, setInputTodoText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [createTodo, { data, loading, status }] = useMutation<TodoForm>({
    method: "POST",
    url: api_slash("todos"),
  });
  useEffect(() => {
    if (!loading && data && status === 201) {
      setTodos((prev) => [...prev!, data]);
    }
  }, [data, loading, status, setTodos]);

  useEffect(() => {
    if (inputTodoText.length !== 0) {
      setDisabled(false);
    } else setDisabled(true);
  }, [inputTodoText, setDisabled]);

  const onSubmitCreateTodo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    createTodo({ todo: inputTodoText });
    setInputTodoText("");
  };

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
          <Button
            btnText={loading ? "Adding....." : "추가"}
            disabled={disabled}
            testId="new-todo-add-button"
          />
        </div>
      </form>
    </div>
  );
}
