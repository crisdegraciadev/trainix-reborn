import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "biygim",
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 4,
      openMode: 0,
    },
  },
});
