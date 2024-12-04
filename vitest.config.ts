import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true, // Ensure that Vitest globals (like expect) are available in tests
    setupFiles: ["./src/__tests__/setupTests.ts"],
    mockReset: true,
  },
});
