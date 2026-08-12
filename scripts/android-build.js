#!/usr/bin/env node

/**
 * Wrapper to build the Android TWA App Bundle (AAB) without interactive prompts.
 *
 * Expects src-android/local.properties to exist with signing passwords.
 * Invokes the Gradle wrapper directly so Bubblewrap's password/version prompts
 * are bypassed after the Android project has been generated.
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const ANDROID_DIR = path.join(REPO_ROOT, 'src-android');
const LOCAL_PROPERTIES = path.join(ANDROID_DIR, 'local.properties');
const GRADLEW = path.join(ANDROID_DIR, 'gradlew');

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.error) {
    console.error(`Failed to spawn "${command}":`, result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!fs.existsSync(LOCAL_PROPERTIES)) {
  console.error(
    `Missing ${path.relative(REPO_ROOT, LOCAL_PROPERTIES)}.\n` +
      'Copy src-android/local.properties.example to src-android/local.properties and fill in your signing passwords.'
  );
  process.exit(1);
}

// Ensure the signing patch is applied before building (bubblewrap update
// regenerates app/build.gradle and would otherwise revert it).
run('node', [path.join(__dirname, 'patch-android-signing.js')], REPO_ROOT);

const isWindows = process.platform === 'win32';

// Build the release AAB using the Gradle wrapper. The signing config is read from
// local.properties via the signingConfigs.release block in app/build.gradle.
if (isWindows) {
  run('cmd', ['/c', 'gradlew.bat', 'bundleRelease'], ANDROID_DIR);
} else {
  // Git may check out the wrapper without +x (e.g. on some CI runners). Ensure
  // it is executable before invoking; also surface spawn errors instead of a silent exit 1.
  if (!fs.existsSync(GRADLEW)) {
    console.error(`Missing Gradle wrapper: ${path.relative(REPO_ROOT, GRADLEW)}`);
    process.exit(1);
  }
  try {
    fs.chmodSync(GRADLEW, 0o755);
  } catch (err) {
    console.error(`Failed to chmod ${path.relative(REPO_ROOT, GRADLEW)}:`, err);
    process.exit(1);
  }
  run('./gradlew', ['bundleRelease'], ANDROID_DIR);
}

const aabPath = path.join(ANDROID_DIR, 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab');
console.log(`\nBuild complete: ${path.relative(REPO_ROOT, aabPath)}`);
