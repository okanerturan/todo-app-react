import { useCallback, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";

const initialData = [
  { done: true, text: "Experience JavaScript" },
  { done: true, text: "Code responsibly" },
  { done: false, text: "Promote Patika" },
  { done: false, text: "Listen to talks" },
  { done: true, text: "Watch tutorials" },
  { done: false, text: "Have a life!" },
];

let fallbackId = 0;

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `todo-${Date.now()}-${fallbackId++}`;
}

function withId(todo) {
  return { ...todo, id: typeof todo.id === "string" ? todo.id : createId() };
}

function loadTodos() {
  try {
    const saved = localStorage.getItem("todos");
    if (saved === null) return initialData.map(withId);

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every((todo) => todo && typeof todo.text === "string" && typeof todo.done === "boolean")) {
      return initialData.map(withId);
    }

    return parsed.map(withId);
  } catch {
    return initialData.map(withId);
  }
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text) => {
    setTodos((previous) => [...previous, { id: createId(), text, done: false }]);
  }, []);

  const updateTodo = useCallback((id, newText) => {
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((previous) => previous.filter((todo) => !todo.done));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }, []);

  const toggleAll = useCallback(() => {
    setTodos((previous) => {
      const nextDone = !previous.every((todo) => todo.done);
      return previous.map((todo) => ({ ...todo, done: nextDone }));
    });
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        itemsLeft,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
        setFilter,
      }}>
      {children}
    </TodoContext.Provider>
  );
}
