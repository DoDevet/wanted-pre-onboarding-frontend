import React, { useEffect, useRef, useState } from "react";

import { TodoForm } from "../libs/todoMutation";
import Input from "./Input";

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
  useEffect(() => {
    if (editMode && inputRef) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const onChangeEditText = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditTodo(event.currentTarget.value);
  };

  const onEditToggle = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditMode((prev) => !prev);
    inputRef.current?.focus();
    setEditTodo(todo);
  };
  const onClickDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteFn(id);
  };

  const onClickEditSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateFn(id, editTodo, isCompleted);
    setEditMode((prev) => !prev);
  };
  const onChangeToggleBox = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateFn(id, todo, !isCompleted);
  };

  return (
    <li className="flex space-x-3">
      <label className="w-3/4 space-x-3">
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
          />
        ) : (
          <span>{todo}</span>
        )}
      </label>
      <div className="space-x-3">
        {editMode ? (
          <>
            <button onClick={onClickEditSubmit}>제출</button>
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
    </li>
  );
}
export default React.memo(TodoComponent);
