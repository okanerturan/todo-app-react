import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useTodos } from "../useTodos";

function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editorRef = useRef(null);

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  useEffect(() => {
    if (isEditing) {
      editorRef.current?.focus();
      editorRef.current?.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTodo(todo.id, editText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={classNames({ completed: todo.done, editing: isEditing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          aria-label={`${todo.done ? "Mark active" : "Mark complete"}: ${todo.text}`}
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleEdit}>{todo.text}</label>
        <button className="destroy" aria-label={`Delete ${todo.text}`} onClick={() => deleteTodo(todo.id)}></button>
      </div>
      {isEditing && (
        <input
          ref={editorRef}
          className="edit"
          aria-label={`Edit ${todo.text}`}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
}

export default TodoItem;
