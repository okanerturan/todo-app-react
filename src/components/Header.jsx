import React, { useState } from "react";
import { useTodos } from "../useTodos";

function Header() {
  const { addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = newTodo.trim();
    if (trimmedText) {
      addTodo(trimmedText);
      setNewTodo("");
    }
  };

  return (
    <header className="header">
      <p className="eyebrow">Task ledger</p>
      <h2 id="ledger-title">What needs your attention?</h2>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="new-todo">New task</label>
        <input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          autoFocus
        />
        <button type="submit">Add task</button>
      </form>
    </header>
  );
}

export default Header;
