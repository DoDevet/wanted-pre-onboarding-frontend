import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoForm } from "../pages/Todo";
import useMutation from "../libs/useMutation";
import { api_slash } from "../libs/utils";
import { SetTodoContext } from "../useContext/Context";

function TodoComponent({ id, todo, isCompleted, userId }: TodoForm) {
  const setTodos = useContext(SetTodoContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [
    editTodoHandler,
    { loading: editLoading, data: editData, status: editStatus },
  ] = useMutation<TodoForm>({
    method: "PUT",
    url: api_slash<string | number>("todos", id),
  });

  const [deleteTodoHandler, { loading: deleteLoading, status: deleteStatus }] =
    useMutation({
      method: "DELETE",
      url: api_slash<string | number>("todos", id),
    });

  useEffect(() => {
    if (!editLoading && editData && editStatus === 200) {
      setTodos((prev) =>
        prev?.map((todo) => (todo.id === id ? editData : todo))
      );
    }
  }, [editStatus, editLoading, setTodos, id, editData]);
  useEffect(() => {
    if (!deleteLoading && deleteStatus === 204) {
      setTodos((prev) => prev?.filter((todo) => todo.id !== id));
    }
  }, [deleteLoading, deleteStatus, setTodos, id]);

  useEffect(() => {
    if (editMode && inputRef) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  useEffect(() => {
    setDisabled(editTodo.length !== 0 ? false : true);
  }, [editTodo]);

  const onClickDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodoHandler(id);
  };

  const onClickEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editTodo !== todo) editTodoHandler({ id, todo: editTodo, isCompleted });
    setEditMode((prev) => !prev);
  };
  const onChangeToggleBox = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    editTodoHandler({ id, todo, isCompleted: !isCompleted });
  };
  const onEditToggle = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!editMode) {
      inputRef.current?.focus();
      setEditTodo(todo);
    }
    setEditMode((prev) => !prev);
  };
  const onChangeEditText = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditTodo(event.currentTarget.value);
  };
  return (
    <li className="flex w-full px-1 py-1">
      <form
        className="flex items-center justify-between w-full px-2"
        onSubmit={onClickEditSubmit}
      >
        <label className="flex w-3/4 space-x-3">
          <input
            type="checkbox"
            onChange={onChangeToggleBox}
            checked={isCompleted}
          />
          {editMode ? (
            <input
              ref={inputRef}
              type="text"
              onChange={onChangeEditText}
              value={editTodo}
              data-testid="modify-input"
              className="w-full px-1 py-1 border border-gray-500 rounded-md"
            />
          ) : (
            <span>{todo}</span>
          )}
        </label>
        <div className="space-x-3">
          <button
            data-testid={editMode ? "submit-button" : "modify-button"}
            disabled={editMode && disabled}
            onClick={editMode ? undefined : onEditToggle}
          >
            {editMode ? "제출" : "수정"}
          </button>
          <button
            data-testid={editMode ? "cancel-button" : "delete-button"}
            onClick={editMode ? onEditToggle : onClickDelete}
          >
            {editMode ? "취소" : "삭제"}
          </button>
        </div>
      </form>
    </li>
  );
}
export default React.memo(TodoComponent);
