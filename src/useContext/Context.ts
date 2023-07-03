import React, { createContext } from "react";
import { TodoForm } from "../pages/Todo";
export const SetTodoContext = createContext<
  React.Dispatch<React.SetStateAction<TodoForm[] | undefined>>
>(() => undefined);
