import { test, expect } from '@playwright/test';

test('un utilisateur peut se connecter et arrive sur le dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('admin@banque.fr');
  await page.getByLabel('Mot de passe').fill('admin123');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
});
