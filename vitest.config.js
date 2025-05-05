// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',  // This ensures the test is running in a simulated browser environment
    globals: true,          // Enable global functions like `test`, `expect`, `vi.fn`, etc.
  },
})
