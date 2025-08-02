import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock localStorage
const createLocalStorageMock = () => {
  const store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    length: Object.keys(store).length,
    key: jest.fn((index) => Object.keys(store)[index] || null),
  };
};

Object.defineProperty(window, "localStorage", {
  value: createLocalStorageMock(),
  writable: true,
});

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});
