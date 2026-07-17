import React from "react";
import classNames from "classnames";
import { useTodos } from "../useTodos";

function Footer() {
  const { itemsLeft, filter, setFilter, clearCompleted, todos } = useTodos();

  const pluralize = (count, word) => (count === 1 ? word : `${word}s`);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> {pluralize(itemsLeft, "item")} left
      </span>
      <ul className="filters">
        {["all", "active", "completed"].map((f) => (
          <li key={f}>
            <button type="button" className={classNames({ selected: filter === f })} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          </li>
        ))}
      </ul>
      {todos.some((todo) => todo.done) && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
