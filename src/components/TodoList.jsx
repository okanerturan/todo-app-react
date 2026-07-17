import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "../useTodos";

function TodoList() {
  const { filteredTodos } = useTodos();

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
