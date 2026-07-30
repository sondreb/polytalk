#!/usr/bin/env node

/**
 * Patches src-android/app/build.gradle to read signing credentials from
 * local.properties instead of prompting interactively. This is re-applied
 * automatically by the android:build and android:update scripts, so it survives
 * running `bubblewrap update` which regenerates the Android project files.
 */

const fs = require('fs');
const path = require('path');

const ANDROID_DIR = path.resolve(__dirname, '..', 'src-android');
const BUILD_GRADLE = path.join(ANDROID_DIR, 'app', 'build.gradle');

function patch() {
  if (!fs.existsSync(BUILD_GRADLE)) {
    throw new Error(`Expected ${BUILD_GRADLE} to exist. Run 'npm run android:update' first.`);
  }

  let content = fs.readFileSync(BUILD_GRADLE, 'utf8');

  // 1. Inject local.properties loader right after the plugins block.
  const propertiesLoader = `// Load signing configuration from local.properties (never commit this file).
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withInputStream { stream ->
        localProperties.load(stream)
    }
}
`;

  if (!content.includes('def localProperties = new Properties()')) {
    content = content.replace(
      /plugins\s*\{\s*id\s+'com\.android\.application'\s*\}\s*\n/,
      `plugins {\n    id 'com.android.application'\n}\n\n${propertiesLoader}`
    );
  }

  // 2. Inject signingConfigs.release inside the android block.
  const signingConfigBlock = `    signingConfigs {
        release {
            def storePath = localProperties.getProperty('key.store', 'signing.keystore')
            storeFile new File(storePath).isAbsolute() ? file(storePath) : rootProject.file(storePath)
            storePassword localProperties.getProperty('key.store.password', '')
            keyAlias localProperties.getProperty('key.alias', 'my-key-alias')
            keyPassword localProperties.getProperty('key.alias.password', '')
        }
    }

`;

  if (!content.includes('signingConfigs {')) {
    content = content.replace(
      /(\s*buildTypes\s*\{\s*\n\s*release\s*\{\s*\n\s*minifyEnabled\s+)/,
      `\n${signingConfigBlock}$1`
    );
  }

  // 3. Wire the release build type to the signing config.
  if (!content.includes('signingConfig signingConfigs.release')) {
    content = content.replace(
      /(buildTypes\s*\{\s*\n\s*release\s*\{\s*\n)(\s*minifyEnabled\s+)/,
      `$1            signingConfig signingConfigs.release\n$2`
    );
  }

  fs.writeFileSync(BUILD_GRADLE, content, 'utf8');
  console.log(`Patched ${path.relative(path.resolve(__dirname, '..'), BUILD_GRADLE)} for local.properties signing.`);
}

patch();
