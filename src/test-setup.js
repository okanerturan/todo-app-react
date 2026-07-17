import "@testing-library/jest-dom/vitest";

const values = new Map();
const testStorage = {
  clear: () => values.clear(),
  getItem: (key) => values.get(key) ?? null,
  removeItem: (key) => values.delete(key),
  setItem: (key, value) => values.set(key, String(value)),
};

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: testStorage,
});
