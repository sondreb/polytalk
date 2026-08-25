import { expect, test } from '@playwright/test';

// The cookie consent bar is injected outside Angular and can overlay the
// bottom transport bar, so keep it out of the way for every test.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent =
      '#cconsent-bar, #cconsent-modal, #cconsent-init-modal { display: none !important; }';
    document.documentElement.appendChild(style);
  });
});

test.describe('Home', () => {
  test('has title and hero call to action', async ({ page }) => {
    await page.goto('/home');

    await expect(page).toHaveTitle(/PolyTalk/);
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.cta-button.primary')).toBeVisible();
  });

  test('navigates to the language selection page', async ({ page }) => {
    await page.goto('/home');
    await page.locator('.cta-button.primary').click();

    await expect(page).toHaveURL(/\/languages/);
    await expect(page.locator('.language-card').first()).toBeVisible();
  });

  test('highlights the active route in the navbar', async ({ page }) => {
    await page.goto('/languages');
    await expect(page.locator('.nav-link.active')).toHaveCount(1);
  });
});

test.describe('Language selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/languages');
  });

  test('filters languages with the search field', async ({ page }) => {
    const total = await page.locator('.language-card').count();
    expect(total).toBeGreaterThan(5);

    await page.getByRole('searchbox').fill('span');

    await expect(page.locator('.language-card')).toHaveCount(1);
    await expect(page.locator('.language-card h2')).toHaveText('Spanish');
  });

  test('shows an empty state when nothing matches', async ({ page }) => {
    await page.getByRole('searchbox').fill('zzzzzz');

    await expect(page.locator('.language-card')).toHaveCount(0);
    await expect(page.locator('.empty')).toBeVisible();
  });

  test('opens the learning page and remembers the language as favorite', async ({
    page,
  }) => {
    await page.getByRole('searchbox').fill('spanish');
    await page.locator('.language-card').first().click();

    await expect(page).toHaveURL(/\/learn\/en\/es\/words/);

    await page.goto('/languages');
    await expect(page.locator('.favorites-section .language-card')).toHaveCount(
      1
    );
  });
});

test.describe('Learning page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn/en/es/words');
  });

  test('renders the language pair, tabs and word list', async ({ page }) => {
    await expect(page.locator('.language-selector')).toHaveCount(2);
    await expect(page.locator('.tabs button')).toHaveCount(3);
    await expect(page.locator('.tabs button.active')).toHaveText('Words');

    const items = page.locator('.phrase-list .item');
    expect(await items.count()).toBe(22);
    await expect(items.first().locator('.native span')).toHaveText('water');
    await expect(items.first().locator('.translation span')).toHaveText('agua');
    await expect(page.locator('.premium-teaser')).toBeVisible();
    await expect(page.locator('.item.locked').first()).toBeVisible();
  });

  test('unlocks the extra pack with the development localStorage key', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('polytalk-premium', '1');
    });
    await page.reload();

    const items = page.locator('.phrase-list .item');
    await expect(items).toHaveCount(49);
    await expect(page.locator('.premium-teaser')).toHaveCount(0);
    await expect(items.last().locator('.native span')).toHaveText('to pay');
  });

  test('switches category through the tabs', async ({ page }) => {
    await page.locator('.tabs button', { hasText: 'Numbers' }).click();

    await expect(page).toHaveURL(/\/learn\/en\/es\/numbers/);
    await expect(page.locator('.tabs button.active')).toHaveText('Numbers');
  });

  test('swaps the language direction', async ({ page }) => {
    await page.locator('.switch-button').click();

    await expect(page).toHaveURL(/\/learn\/es\/en\/words/);
    await expect(page.locator('.language-selector select').first()).toHaveValue(
      'es'
    );
    await expect(page.locator('.language-selector select').last()).toHaveValue(
      'en'
    );
  });

  test('changes the target language from the dropdown', async ({ page }) => {
    await page.locator('.language-selector select').last().selectOption('fr');

    await expect(page).toHaveURL(/\/learn\/en\/fr\/words/);
    await expect(page.locator('.item').first().locator('.translation span')).toHaveText(
      'eau'
    );
  });

  test('keeps transport controls disabled until playback starts', async ({
    page,
  }) => {
    const buttons = page.locator('.transport .buttons button');
    await expect(buttons.nth(0)).toBeDisabled();
    await expect(buttons.nth(2)).toBeDisabled();
    await expect(buttons.nth(1)).toBeEnabled();
    await expect(buttons.nth(1)).toContainText('Start');
  });

  test('plays a single word without starting the playlist', async ({ page }) => {
    await page.locator('.item').first().locator('.play-button').first().click();

    await expect(page.locator('.transport .buttons button').nth(1)).toContainText(
      'Start'
    );
  });
});

test.describe('Playback options sheet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn/en/es/words');
  });

  test('opens and closes the options sheet', async ({ page }) => {
    await expect(page.locator('.sheet')).toHaveCount(0);

    await page.locator('.options-button').click();
    await expect(page.locator('.sheet')).toBeVisible();

    await page.locator('.close-button').click();
    await expect(page.locator('.sheet')).toHaveCount(0);
  });

  test('closes the options sheet with escape and backdrop', async ({ page }) => {
    await page.locator('.options-button').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('.sheet')).toHaveCount(0);

    await page.locator('.options-button').click();
    await page.locator('.sheet-backdrop').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.sheet')).toHaveCount(0);
  });

  test('persists repeat settings to local storage', async ({ page }) => {
    await page.locator('.options-button').click();

    const wordRepeat = page.locator('.setting-row').first();
    await wordRepeat.getByRole('button', { name: '+' }).click();
    await wordRepeat.getByRole('button', { name: '+' }).click();
    await expect(wordRepeat.locator('.number-value')).toHaveText('3');

    const stored = await page.evaluate(() =>
      localStorage.getItem('polytalk-settings')
    );
    expect(JSON.parse(stored ?? '{}').wordRepeat).toBe(3);

    await page.reload();
    await page.locator('.options-button').click();
    await expect(
      page.locator('.setting-row').first().locator('.number-value')
    ).toHaveText('3');
  });

  test('never lets repeat values drop below one', async ({ page }) => {
    await page.locator('.options-button').click();

    const wordRepeat = page.locator('.setting-row').first();
    for (let i = 0; i < 3; i++) {
      await wordRepeat.getByRole('button', { name: '-' }).click();
    }

    await expect(wordRepeat.locator('.number-value')).toHaveText('1');
  });

  test('toggles the bilingual switch', async ({ page }) => {
    await page.locator('.options-button').click();

    const bilingual = page.locator('.toggle-row').first().locator('.switch');
    await expect(bilingual).toBeChecked();

    await bilingual.click();
    await expect(bilingual).not.toBeChecked();

    const stored = await page.evaluate(() =>
      localStorage.getItem('polytalk-settings')
    );
    expect(JSON.parse(stored ?? '{}').playBothLanguages).toBe(false);
  });
});

test.describe('Settings', () => {
  test('applies the selected theme to the document', async ({ page }) => {
    await page.goto('/settings');

    await page.selectOption('#theme-select', 'dark');
    await expect(page.locator('body')).toHaveClass(/dark-theme/);

    await page.selectOption('#theme-select', 'light');
    await expect(page.locator('body')).toHaveClass(/light-theme/);
  });

  test('changes the interface language', async ({ page }) => {
    await page.goto('/settings');

    await page.selectOption('#ui-language-select', 'es');

    await expect(page.locator('.settings-container h1')).toHaveText('Ajustes');
    await expect(page.locator('.nav-link').first()).toContainText('Idiomas');
  });

  test('keeps sliders and actions reachable', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.locator('#word-delay')).toBeVisible();
    await expect(page.locator('#playback-speed')).toBeVisible();
    await expect(page.locator('.actions button')).toHaveCount(2);
  });

  test('shows the web premium fallback without charging', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.locator('app-premium-card')).toBeVisible();
    await expect(page.getByRole('link', { name: /Buy on Google Play/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Restore purchase/i })).toBeVisible();
  });
});
