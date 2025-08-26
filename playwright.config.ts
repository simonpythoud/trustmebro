import { defineConfig, devices } from '@playwright/test'

const PORT = process.env.E2E_PORT || '3100'
const BASE = process.env.BASE_URL || `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: BASE,
    reuseExistingServer: true,
    env: {
      FEATURE_TEST_ENDPOINTS: 'true',
      NEXTAUTH_URL: BASE,
      PORT,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})


