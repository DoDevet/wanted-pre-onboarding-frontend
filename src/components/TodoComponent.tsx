import React, { useState } from "react";

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
  const [editMode, setEditMode] = useState(false);

  const onClickDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteFn(id);
  };
  const onChangeToggleBox = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    updateFn(id, todo, !isCompleted);
  };

  return (
    <li className="flex justify-between">
      <div className="flex-1">
        <label className="space-x-10 space-y-4">
          <>
            <input
              type="checkbox"
              onChange={onChangeToggleBox}
              checked={isCompleted}
            />
            <span>{todo}</span>
          </>
        </label>
      </div>
      <div className="flex-1 space-x-4">
        <button data-testid="modify-button">Update</button>
        <button onClick={onClickDelete} data-testid="delete-button">
          Delete
        </button>
      </div>
    </li>
  );
}
export default React.memo(TodoComponent);
