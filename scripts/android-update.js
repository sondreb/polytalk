#!/usr/bin/env node

/**
 * Runs `bubblewrap update` to refresh the generated Android project with the
 * latest Bubblewrap template and SDK versions, then re-applies the signing
 * patch so builds remain non-interactive.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const ANDROID_DIR = path.join(REPO_ROOT, 'src-android');

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// Run Bubblewrap update from the Android project directory.
run('npx', ['bubblewrap', 'update'], ANDROID_DIR);

// Re-apply the signing patch because bubblewrap regenerates app/build.gradle.
run('node', [path.join(__dirname, 'patch-android-signing.js')], REPO_ROOT);
