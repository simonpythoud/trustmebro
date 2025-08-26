import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('Brand can sign in and land on Dashboard', async ({ page, request, baseURL }) => {
    // Seed baseline users (requires FEATURE_TEST_ENDPOINTS=true)
    const res = await request.post(`${baseURL}/api/test/seed-users`)
    expect(res.ok()).toBeTruthy()

    await page.goto('/signin')
    await page.getByTestId('auth-email').fill('brand@example.com')
    await page.getByTestId('auth-password').fill('Passw0rd!')
    await page.getByTestId('auth-submit').click()

    // Expect redirect to dashboard and presence of create-contract button
    await page.waitForURL('**/dashboard')
    await expect(page.getByTestId('create-contract')).toBeVisible()
  })
})


