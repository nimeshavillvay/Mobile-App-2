import { jest } from "@jest/globals";

interface MockMatchMedia {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
}

export const mockMatchMedia = jest.fn(
  (query: string): MockMatchMedia => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia as unknown as typeof window.matchMedia,
});
