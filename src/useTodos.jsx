import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export function useTodos() {
  const value = useContext(TodoContext);
  if (value === undefined) throw new Error("useTodos must be used within TodoProvider");
  return value;
}
