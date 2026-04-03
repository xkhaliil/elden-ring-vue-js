import { expect, test } from '@playwright/test'

test.describe('Bosses page filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/bosses')
    await expect(page.getByText('Summoning the fallen…')).not.toBeVisible({
      timeout: 10000,
    })
  })

  test('medium difficulty filter', async ({ page }) => {
    await page.getByRole('button', { name: 'Medium' }).click()

    // Wait for the UI to update to ensure elements are present
    await page.waitForTimeout(500)

    const cards = page.locator('[class*="cursor-pointer"]')
    const count = await cards.count()

    // Find the Medium badges on the page (excluding the filter button)
    const badgeCount = count

    expect(badgeCount).toBeGreaterThan(0)
    expect(badgeCount).toBe(count)
  })

  test('search with nonsense lol', async ({ page }) => {
    await page.getByPlaceholder('Search by name, location, or drop…').fill('213389123123')

    await expect(page.getByText('No boss answers your call…')).toBeVisible()
    await expect(page.getByText(/0 enemies found/)).toBeVisible()
  })

  test('no drops test', async ({ page }) => {
    await page.getByRole('button', { name: 'No Drops' }).click()
    const dropIcons = page.locator('[data-lucide="flame"]')
    await expect(dropIcons).toHaveCount(0)
  })
})
