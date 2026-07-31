/**
 * Generates all raster app icons from public/polytalk-icon.svg (and the social
 * card from public/polytalk.svg).
 *
 * Outputs:
 *  - public/icons/icon-<size>.png        PWA "any" icons (white background, light padding)
 *  - public/icons/maskable-<size>.png    PWA "maskable" icons (icon inside the 80% safe zone)
 *  - public/icons/polytalk-icon.png      1024px master icon (used as Tauri source)
 *  - public/favicon.png                  browser favicon
 *  - public/apple-touch-icon.png         iOS home screen icon (180px, opaque background)
 *  - public/apple-touch-icon-<size>.png  additional iOS sizes
 *  - public/assets/polytalk-social.png   1280x640 Open Graph / Twitter card
 *  - src-android/store_icon.png          Google Play / TWA store icon (512px)
 *  - src-android/app/src/main/res/**     TWA launcher, maskable, splash and notification assets
 *
 * Run with: npm run generate:icons
 * Afterwards run: npx tauri icon public/icons/polytalk-icon.png
 */

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOURCE_SVG = path.join(PUBLIC_DIR, 'polytalk-icon.svg');
const WORDMARK_SVG = path.join(PUBLIC_DIR, 'polytalk.svg');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
const ANDROID_DIR = path.join(ROOT, 'src-android');

const BACKGROUND = '#ffffff';

/** PWA icon sizes declared in manifest.webmanifest. */
const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
/** Maskable icons only need a couple of sizes per the web app manifest spec. */
const MASKABLE_SIZES = [192, 512];
/** iOS home screen icon sizes. */
const APPLE_SIZES = [120, 152, 167, 180];

/**
 * Android TWA (Bubblewrap) resources. Bubblewrap regenerates these from the live
 * manifest during `npm run android:init`, but keeping them in sync locally means the
 * checked-in project already shows the current branding.
 */
const ANDROID_DENSITIES = [
  { density: 'mdpi', launcher: 48, maskable: 82, splash: 300, notification: 24 },
  { density: 'hdpi', launcher: 72, maskable: 123, splash: 450, notification: 36 },
  { density: 'xhdpi', launcher: 96, maskable: 164, splash: 600, notification: 48 },
  { density: 'xxhdpi', launcher: 144, maskable: 246, splash: 900, notification: 72 },
  { density: 'xxxhdpi', launcher: 192, maskable: 328, splash: 1200, notification: 96 },
];

async function renderIcon(page, { size, padding, background, silhouette, outFile }) {
  const svg = fs.readFileSync(SOURCE_SVG, 'utf8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;

  const pngDataUrl = await page.evaluate(
    async ({ dataUri, size, padding, background, silhouette }) => {
      const image = new Image();
      image.src = dataUri;
      await image.decode();

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');

      if (background) {
        context.fillStyle = background;
        context.fillRect(0, 0, size, size);
      }

      const inset = (size * padding) / 100;
      const box = size - inset * 2;
      const scale = Math.min(box / image.width, box / image.height);
      const width = image.width * scale;
      const height = image.height * scale;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);

      if (silhouette) {
        // Android tints notification icons, so only the alpha channel matters.
        context.globalCompositeOperation = 'source-in';
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, size, size);
        context.globalCompositeOperation = 'source-over';
      }

      return canvas.toDataURL('image/png');
    },
    { dataUri, size, padding, background, silhouette: silhouette === true }
  );

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, Buffer.from(pngDataUrl.split(',')[1], 'base64'));

  console.log(`  ✓ ${path.relative(ROOT, outFile)} (${size}x${size})`);
}

async function renderSocialCard(page, { width, height, outFile }) {
  const svg = fs.readFileSync(WORDMARK_SVG, 'utf8');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;

  const pngDataUrl = await page.evaluate(
    async ({ dataUri, width, height }) => {
      const image = new Image();
      image.src = dataUri;
      await image.decode();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');

      // Matches the wordmark's own background plate (#fefefe) so the logo blends
      // into the card instead of showing a visible rectangle seam.
      context.fillStyle = '#fefefe';
      context.fillRect(0, 0, width, height);

      const logoWidth = width * 0.82;
      const logoHeight = (image.height / image.width) * logoWidth;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      // Crop a couple of source pixels off every edge: the wordmark ships with an
      // opaque background plate whose anti-aliased border would otherwise show up
      // as a faint rectangle on the white card.
      const inset = 4;
      context.drawImage(
        image,
        inset,
        inset,
        image.width - inset * 2,
        image.height - inset * 2,
        (width - logoWidth) / 2,
        height * 0.34 - logoHeight / 2,
        logoWidth,
        logoHeight
      );

      context.fillStyle = '#6366f1';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font =
        '600 44px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto, sans-serif';
      context.fillText('Learn Any Language with PolyTalk', width / 2, height * 0.62);

      context.fillStyle = '#4b5563';
      context.font =
        '400 30px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto, sans-serif';
      context.fillText(
        'Master basic words, numbers, and essential phrases in any language',
        width / 2,
        height * 0.74
      );

      return canvas.toDataURL('image/png');
    },
    { dataUri, width, height }
  );

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, Buffer.from(pngDataUrl.split(',')[1], 'base64'));

  console.log(`  ✓ ${path.relative(ROOT, outFile)} (${width}x${height})`);
}

async function main() {
  if (!fs.existsSync(SOURCE_SVG)) {
    throw new Error(`Source icon not found: ${SOURCE_SVG}`);
  }

  fs.mkdirSync(ICONS_DIR, { recursive: true });

  // "chromium" channel uses the full browser build instead of the headless shell,
  // which is what Playwright installs alongside the e2e test suite.
  const browser = await chromium.launch({ channel: 'chromium' });
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  try {
    console.log('Generating PWA icons...');
    for (const size of PWA_SIZES) {
      await renderIcon(page, {
        size,
        padding: 6,
        background: BACKGROUND,
        outFile: path.join(ICONS_DIR, `icon-${size}x${size}.png`),
      });
    }

    console.log('Generating maskable icons...');
    for (const size of MASKABLE_SIZES) {
      await renderIcon(page, {
        size,
        padding: 20,
        background: BACKGROUND,
        outFile: path.join(ICONS_DIR, `maskable-${size}x${size}.png`),
      });
    }

    console.log('Generating master icon...');
    await renderIcon(page, {
      size: 1024,
      padding: 6,
      background: BACKGROUND,
      outFile: path.join(ICONS_DIR, 'polytalk-icon.png'),
    });

    console.log('Generating favicon...');
    await renderIcon(page, {
      size: 192,
      padding: 4,
      background: null,
      outFile: path.join(PUBLIC_DIR, 'favicon.png'),
    });

    console.log('Generating iOS icons...');
    for (const size of APPLE_SIZES) {
      await renderIcon(page, {
        size,
        // iOS applies its own rounded mask, so keep artwork clear of the corners.
        padding: 10,
        background: BACKGROUND,
        outFile: path.join(PUBLIC_DIR, `apple-touch-icon-${size}x${size}.png`),
      });
    }
    fs.copyFileSync(
      path.join(PUBLIC_DIR, 'apple-touch-icon-180x180.png'),
      path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    );
    console.log('  ✓ public/apple-touch-icon.png (180x180)');

    if (fs.existsSync(WORDMARK_SVG)) {
      console.log('Generating social card...');
      await renderSocialCard(page, {
        width: 1280,
        height: 640,
        outFile: path.join(PUBLIC_DIR, 'assets', 'polytalk-social.png'),
      });
    }

    if (fs.existsSync(ANDROID_DIR)) {
      console.log('Generating Android store icon...');
      await renderIcon(page, {
        size: 512,
        padding: 6,
        background: BACKGROUND,
        outFile: path.join(ANDROID_DIR, 'store_icon.png'),
      });

      const resDir = path.join(ANDROID_DIR, 'app', 'src', 'main', 'res');
      if (fs.existsSync(resDir)) {
        console.log('Generating Android TWA resources...');
        for (const { density, launcher, maskable, splash, notification } of ANDROID_DENSITIES) {
          await renderIcon(page, {
            size: launcher,
            padding: 6,
            background: BACKGROUND,
            outFile: path.join(resDir, `mipmap-${density}`, 'ic_launcher.png'),
          });
          await renderIcon(page, {
            size: maskable,
            // The adaptive icon XML already adds its own padding around this layer.
            padding: 12,
            background: BACKGROUND,
            outFile: path.join(resDir, `mipmap-${density}`, 'ic_maskable.png'),
          });
          await renderIcon(page, {
            size: splash,
            padding: 12,
            background: BACKGROUND,
            outFile: path.join(resDir, `drawable-${density}`, 'splash.png'),
          });
          await renderIcon(page, {
            size: notification,
            padding: 4,
            background: null,
            silhouette: true,
            outFile: path.join(resDir, `drawable-${density}`, 'ic_notification_icon.png'),
          });
        }
      }
    }
  } finally {
    await page.close();
    await browser.close();
  }

  console.log('\nDone. Run "npx tauri icon public/icons/polytalk-icon.png" to refresh desktop icons.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
