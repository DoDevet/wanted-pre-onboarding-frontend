import React, { useEffect, useRef, useState } from "react";

import { TodoForm } from "../libs/todoMutation";

interface TodoComponentProps extends TodoForm {
  deleteFn: (id: number) => void;
  updateFn: (id: number, todo: string, isCompleted: boolean) => void;
}

function TodoComponent({
  id,
  todo,
  isCompleted,
  userId,
  deleteFn,
  updateFn,
}: TodoComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (editMode && inputRef) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  useEffect(() => {
    setDisabled(editTodo.length !== 0 ? false : true);
  }, [editTodo]);

  const onChangeEditText = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditTodo(event.currentTarget.value);
  };

  const onEditToggle = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!editMode) {
      inputRef.current?.focus();
      setEditTodo(todo);
    }
    setEditMode((prev) => !prev);
  };
  const onClickDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteFn(id);
  };

  const onClickEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editTodo !== todo) updateFn(id, editTodo, isCompleted);
    setEditMode((prev) => !prev);
  };
  const onChangeToggleBox = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateFn(id, todo, !isCompleted);
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
          {editMode ? (
            <>
              <button disabled={disabled}>제출</button>
              <button onClick={onEditToggle}>취소</button>
            </>
          ) : (
            <>
              <button onClick={onEditToggle} data-testid="modify-button">
                수정
              </button>
              <button onClick={onClickDelete} data-testid="delete-button">
                삭제
              </button>
            </>
          )}
        </div>
      </form>
    </li>
  );
}
export default React.memo(TodoComponent);
