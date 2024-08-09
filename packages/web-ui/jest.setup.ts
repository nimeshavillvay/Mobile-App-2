import { jest } from "@jest/globals";
import "@testing-library/react";

// Define the type for PointerEventInit
type PointerEventInit = EventInit & {
  button?: number;
  ctrlKey?: boolean;
  pointerType?: string;
};

// Create a mock class for PointerEvent
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit = {}) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
    this.pointerType = props.pointerType ?? "mouse";
  }
}

// Create mock functions for the methods you need
const mockScrollIntoView = jest.fn();
const mockReleasePointerCapture = jest.fn();
const mockHasPointerCapture = jest.fn();

// Mock matchMedia
type MockMatchMedia = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
};

const mockMatchMedia = jest.fn(
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

// Override the global PointerEvent and HTMLElement prototype methods
Object.defineProperty(window, "PointerEvent", {
  writable: true,
  value: MockPointerEvent as unknown as typeof window.PointerEvent,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia as unknown as typeof window.matchMedia,
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  writable: true,
  value: mockScrollIntoView,
});

Object.defineProperty(HTMLElement.prototype, "releasePointerCapture", {
  writable: true,
  value: mockReleasePointerCapture,
});

Object.defineProperty(HTMLElement.prototype, "hasPointerCapture", {
  writable: true,
  value: mockHasPointerCapture,
});

// Optionally export the mocks if needed for use in tests
export {
  mockHasPointerCapture,
  mockMatchMedia,
  mockReleasePointerCapture,
  mockScrollIntoView,
};
