import { chromium, type Page, type Browser, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env['PLAYWRIGHT_TEST_BASE_URL'] ?? 'http://localhost:4211';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'screenshots');

interface ScreenshotConfig {
  name: string;
  url: string;
  viewport: { width: number; height: number };
  setup?: (page: Page) => Promise<void>;
  beforeScreenshot?: (page: Page) => Promise<void>;
  waitFor?: string;
  fullPage?: boolean;
  delay?: number;
  darkMode?: boolean;
}

/**
 * Dismiss the cookie consent banner by setting consentMode in localStorage
 * and hiding any visible banner elements.
 */
async function dismissCookieBanner(page: Page): Promise<void> {
  await page.evaluate(() => {
    // Set consent in localStorage so the banner doesn't appear
    localStorage.setItem('consentMode', JSON.stringify({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    }));
  });

  // Also force-hide any banner that may have already rendered
  await page.evaluate(() => {
    const bar = document.getElementById('cconsent-bar');
    if (bar) {
      bar.style.display = 'none';
    }
    const modal = document.getElementById('cconsent-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
}

/**
 * Apply dark theme to the page.
 */
async function applyDarkTheme(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.setItem('app-theme', 'dark');
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.documentElement.style.colorScheme = 'dark';
  });
}

/**
 * Hide ad banners and other non-essential promotional elements.
 */
async function hideAds(page: Page): Promise<void> {
  await page.evaluate(() => {
    // Hide any ad containers / iframes
    document.querySelectorAll('iframe, [id*="adcash"], [class*="ad-"]').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  });
}

/**
 * Simulate a playing state on the learning page by adding the 'playing'
 * class to a specific vocabulary item.
 */
async function simulatePlayingState(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((idx) => {
    const items = document.querySelectorAll('.item');
    if (items[idx]) {
      items[idx].classList.add('playing');
      // Scroll so the playing item is visible
      items[idx].scrollIntoView({ block: 'center' });
    }
  }, itemIndex);
}

const screenshots: ScreenshotConfig[] = [
  // ═══════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════
  {
    name: '01-home-desktop-light',
    url: '/home',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },
  {
    name: '02-home-desktop-dark',
    url: '/home',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    delay: 1000,
  },
  {
    name: '03-home-mobile',
    url: '/home',
    viewport: { width: 390, height: 844 },
    delay: 1500,
  },

  // ═══════════════════════════════════════════════
  // LANGUAGE SELECTION
  // ═══════════════════════════════════════════════
  {
    name: '04-languages-desktop',
    url: '/languages',
    viewport: { width: 1280, height: 800 },
    delay: 2000,
  },
  {
    name: '05-languages-with-favorites',
    url: '/languages',
    viewport: { width: 1280, height: 800 },
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('polytalk-favorite-languages', JSON.stringify(['es', 'fr', 'ja', 'de', 'it']));
      });
    },
    delay: 2000,
  },
  {
    name: '06-languages-desktop-dark',
    url: '/languages',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('polytalk-favorite-languages', JSON.stringify(['es', 'fr', 'ja']));
      });
    },
    delay: 2000,
  },
  {
    name: '07-languages-mobile',
    url: '/languages',
    viewport: { width: 390, height: 844 },
    delay: 2000,
  },

  // ═══════════════════════════════════════════════
  // LEARNING PAGE — WORDS
  // ═══════════════════════════════════════════════
  {
    name: '08-learning-words-en-es',
    url: '/learn/en/es/words',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },
  {
    name: '09-learning-words-en-es-dark',
    url: '/learn/en/es/words',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    delay: 1500,
  },
  {
    name: '10-learning-words-en-ja',
    url: '/learn/en/ja/words',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },
  {
    name: '11-learning-words-en-zh',
    url: '/learn/en/zh/words',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },

  // ═══════════════════════════════════════════════
  // LEARNING PAGE — ACTIVE PLAYBACK (simulated)
  // ═══════════════════════════════════════════════
  {
    name: '12-learning-playing-state',
    url: '/learn/en/es/words',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
    beforeScreenshot: async (page) => {
      await simulatePlayingState(page, 3); // Highlight the 4th word
      // Also make the Start button look like it's playing
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('.buttons button');
        if (buttons[0]) {
          const iconSpan = buttons[0].querySelector('.icon');
          const textSpan = buttons[0].querySelector('.button-text');
          if (iconSpan) iconSpan.textContent = '⏸';
          if (textSpan) textSpan.textContent = 'Pause';
        }
        // Enable the other buttons
        buttons.forEach((btn, i) => {
          if (i > 0) btn.removeAttribute('disabled');
        });
      });
    },
  },
  {
    name: '13-learning-playing-dark',
    url: '/learn/en/fr/words',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    delay: 1500,
    beforeScreenshot: async (page) => {
      await simulatePlayingState(page, 2);
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('.buttons button');
        if (buttons[0]) {
          const iconSpan = buttons[0].querySelector('.icon');
          const textSpan = buttons[0].querySelector('.button-text');
          if (iconSpan) iconSpan.textContent = '⏸';
          if (textSpan) textSpan.textContent = 'Pause';
        }
        buttons.forEach((btn, i) => {
          if (i > 0) btn.removeAttribute('disabled');
        });
      });
    },
  },

  // ═══════════════════════════════════════════════
  // LEARNING PAGE — NUMBERS & SENTENCES
  // ═══════════════════════════════════════════════
  {
    name: '14-learning-numbers-en-fr',
    url: '/learn/en/fr/numbers',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },
  {
    name: '15-learning-sentences-en-de',
    url: '/learn/en/de/sentences',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },

  // ═══════════════════════════════════════════════
  // LEARNING PAGE — MOBILE
  // ═══════════════════════════════════════════════
  {
    name: '16-learning-mobile-words',
    url: '/learn/en/es/words',
    viewport: { width: 390, height: 844 },
    delay: 1500,
  },
  {
    name: '17-learning-mobile-playing',
    url: '/learn/en/es/words',
    viewport: { width: 390, height: 844 },
    delay: 1500,
    beforeScreenshot: async (page) => {
      await simulatePlayingState(page, 2);
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('.buttons button');
        if (buttons[0]) {
          const iconSpan = buttons[0].querySelector('.icon');
          if (iconSpan) iconSpan.textContent = '⏸';
        }
        buttons.forEach((btn, i) => {
          if (i > 0) btn.removeAttribute('disabled');
        });
      });
    },
  },

  // ═══════════════════════════════════════════════
  // LEARNING PAGE — TABLET
  // ═══════════════════════════════════════════════
  {
    name: '18-learning-tablet',
    url: '/learn/en/it/words',
    viewport: { width: 768, height: 1024 },
    delay: 1500,
  },

  // ═══════════════════════════════════════════════
  // SETTINGS
  // ═══════════════════════════════════════════════
  {
    name: '19-settings-desktop',
    url: '/settings',
    viewport: { width: 1280, height: 800 },
    delay: 800,
  },
  {
    name: '20-settings-desktop-dark',
    url: '/settings',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    delay: 800,
  },

  // ═══════════════════════════════════════════════
  // BLOG
  // ═══════════════════════════════════════════════
  {
    name: '21-blog-desktop',
    url: '/blog',
    viewport: { width: 1280, height: 800 },
    delay: 1500,
  },
  {
    name: '22-blog-desktop-dark',
    url: '/blog',
    viewport: { width: 1280, height: 800 },
    darkMode: true,
    delay: 1500,
  },
];

async function generateScreenshots() {
  console.log(`\nGenerating screenshots from ${BASE_URL}...`);
  console.log(`Output directory: ${SCREENSHOT_DIR}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser: Browser = await chromium.launch({ headless: true });
  let successCount = 0;
  let errorCount = 0;

  for (const config of screenshots) {
    const label = `${config.name} (${config.viewport.width}x${config.viewport.height}${config.darkMode ? ', dark' : ''})`;
    console.log(`  Capturing: ${label}...`);

    const context: BrowserContext = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 2, // Retina-quality screenshots
    });
    const page = await context.newPage();

    try {
      // Pre-set consentMode in localStorage before navigating, so the
      // cookie banner never appears in the first place.
      await page.addInitScript(() => {
        localStorage.setItem('consentMode', JSON.stringify({
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        }));
      });

      // Run any setup that sets localStorage before navigation
      if (config.setup) {
        // We inject setup via addInitScript so localStorage is set before Angular boots
        // But setup may have complex logic, so we navigate first, set, then reload
        await page.goto(`${BASE_URL}${config.url}`, {
          timeout: 60000,
          waitUntil: 'networkidle',
        });
        await config.setup(page);
        // Reload for setup changes to take effect (e.g., favorites)
        await page.goto(`${BASE_URL}${config.url}`, {
          timeout: 60000,
          waitUntil: 'networkidle',
        });
      } else {
        await page.goto(`${BASE_URL}${config.url}`, {
          timeout: 60000,
          waitUntil: 'networkidle',
        });
      }

      // Wait for Angular to settle
      await page.waitForLoadState('networkidle');

      // Apply dark theme if requested
      if (config.darkMode) {
        await applyDarkTheme(page);
        // Small delay for theme transition
        await page.waitForTimeout(300);
      }

      // Dismiss cookie banner (belt-and-suspenders)
      await dismissCookieBanner(page);

      // Hide ads
      await hideAds(page);

      // Additional delay for animations
      if (config.delay) {
        await page.waitForTimeout(config.delay);
      }

      // Wait for specific element if configured
      if (config.waitFor) {
        await page.waitForSelector(config.waitFor, { timeout: 10000 });
      }

      // Run any pre-screenshot manipulation (e.g. simulating playing state)
      if (config.beforeScreenshot) {
        await config.beforeScreenshot(page);
        await page.waitForTimeout(300); // Let DOM updates settle
      }

      // Final cookie banner cleanup right before screenshot
      await dismissCookieBanner(page);

      // Take the screenshot — NOT fullPage so the fixed toolbar is visible
      const screenshotPath = path.join(SCREENSHOT_DIR, `${config.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: config.fullPage ?? false,
      });

      console.log(`    Saved: ${config.name}.png`);
      successCount++;
    } catch (error) {
      console.error(`    ERROR capturing ${config.name}:`, error);
      errorCount++;
    }

    await context.close();
  }

  await browser.close();

  console.log(`\nDone! ${successCount} screenshots generated, ${errorCount} errors.`);
  console.log(`Output: ${SCREENSHOT_DIR}`);
}

generateScreenshots().catch(console.error);
