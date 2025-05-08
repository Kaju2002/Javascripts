// setupTests.js
import '@testing-library/jest-dom';
// setupTests.js
import { vi } from 'vitest';

// Prevent modal crash by faking #root
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// Optional: mock matchMedia for Tailwind dark mode support
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
