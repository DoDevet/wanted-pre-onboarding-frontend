import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import TodoMutation, { TodoForm } from "../libs/todoHandler";
import Button from "./Button";

export default function TodoInput({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<TodoForm[] | undefined>>;
}) {
  const [inputTodoText, setInputTodoText] = useState("");
  const [todo, setTodo] = useState<TodoForm>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (todo) {
      setTodos((prev) => {
        if (prev) {
          return [...prev, todo];
        } else return [todo];
      });
    }
  }, [todo, setTodos]);
  useEffect(() => {
    if (inputTodoText.length !== 0) {
      setDisabled(false);
    } else setDisabled(true);
  }, [inputTodoText, setDisabled]);
  const onSubmitCreateTodo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data: TodoForm = await TodoMutation({
      method: "POST",
      data: { todo: inputTodoText },
    });
    setTodo(data);
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
            btnText="추가"
            disabled={disabled}
            testId="new-todo-add-button"
          />
        </div>
      </form>
    </div>
  );
}
