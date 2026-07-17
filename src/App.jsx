import React from "react";
import { useTodos } from "./useTodos";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
  const { todos, filteredTodos, toggleAll, itemsLeft, filter } = useTodos();
  const completedCount = todos.length - itemsLeft;

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Local-first / learning archive</p>
          <h1>A small list,<br />built to finish.</h1>
        </div>
        <div className="browser-note">
          <span className="status-dot" aria-hidden="true" />
          <span>Stored in this browser</span>
        </div>
      </header>

      <section className="workspace" aria-labelledby="ledger-title">
        <div className="todoapp">
          <Header />

          {todos.length > 0 ? (
            <section className="main" aria-label="Task list">
              <div className="list-toolbar">
                <span>{filteredTodos.length} shown</span>
                <div className="toggle-all-control">
                  <input
                    id="toggle-all"
                    type="checkbox"
                    className="toggle-all"
                    checked={itemsLeft === 0}
                    onChange={toggleAll}
                  />
                  <label htmlFor="toggle-all">Mark all complete</label>
                </div>
              </div>
              <TodoList />
            </section>
          ) : (
            <div className="empty-state" role="status">
              <span aria-hidden="true">00</span>
              <h2>The ledger is clear.</h2>
              <p>Add a task above when there is something worth remembering.</p>
            </div>
          )}

          {todos.length > 0 && <Footer />}
        </div>

        <aside className="ledger-aside" aria-label="Task summary">
          <p className="eyebrow">Current ledger</p>
          <div className="stat-grid">
            <div><strong>{todos.length}</strong><span>Total</span></div>
            <div><strong>{itemsLeft}</strong><span>Open</span></div>
            <div><strong>{completedCount}</strong><span>Done</span></div>
            <div><strong>{filter}</strong><span>View</span></div>
          </div>
          <div className="aside-note">
            <span>Editing</span>
            <p>Double-click a task. Press Enter to save or Escape to cancel.</p>
          </div>
          <div className="aside-note">
            <span>Privacy</span>
            <p>No account and no server sync. Clearing this site’s browser data removes the list.</p>
          </div>
        </aside>
      </section>

      <footer className="page-footer">
        <span>React Context + browser storage</span>
        <a href="https://github.com/okturan/todo-app-react">Source and provenance ↗</a>
      </footer>
    </main>
  );
}

export default App;
