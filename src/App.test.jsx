import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { TodoProvider } from "./TodoProvider";

function renderApp() {
  return render(
    <TodoProvider>
      <App />
    </TodoProvider>,
  );
}

function seedTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

describe("todo behavior", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("deletes the selected active task rather than the same index in the full list", async () => {
    seedTodos([
      { text: "completed first", done: true },
      { text: "active second", done: false },
    ]);
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Active" }));
    await user.click(screen.getByRole("button", { name: "Delete active second" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getByText("completed first")).toBeInTheDocument();
    expect(screen.queryByText("active second")).not.toBeInTheDocument();
  });

  it("edits the selected active task without changing a completed task", async () => {
    seedTodos([
      { text: "completed first", done: true },
      { text: "active second", done: false },
    ]);
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Active" }));
    const item = screen.getByText("active second").closest("li");
    await user.dblClick(within(item).getByText("active second"));
    const editor = within(item).getByRole("textbox");
    await user.clear(editor);
    await user.type(editor, "renamed active{Enter}");
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getByText("completed first")).toBeInTheDocument();
    expect(screen.getByText("renamed active")).toBeInTheDocument();
  });

  it("adds, completes, filters, and clears a task through the public UI", async () => {
    seedTodos([]);
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByPlaceholderText("What needs to be done?"), "Ship behavior proof{Enter}");
    await user.click(screen.getByRole("checkbox", { name: "Mark complete: Ship behavior proof" }));
    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Ship behavior proof")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear completed" }));
    expect(screen.queryByText("Ship behavior proof")).not.toBeInTheDocument();
  });

  it("recovers from malformed local storage instead of crashing", () => {
    localStorage.setItem("todos", "not-json");
    renderApp();
    expect(screen.getByText("Experience JavaScript")).toBeInTheDocument();
  });
});
