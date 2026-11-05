import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // The tests share one database, so run test files one at a time.
    fileParallelism: false,
  },
});
