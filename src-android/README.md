# PolyTalk Android TWA

This directory contains a [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)-generated Trusted Web Activity (TWA) wrapper for PolyTalk.

It is built with the latest Android SDKs available from Bubblewrap at generation time:

- Android Gradle Plugin 8.9.1
- Gradle 8.11.1
- compileSdk 36
- targetSdk 36
- minSdk 21
- Android Browser Helper 2.6.2

## Files

- [`twa-manifest.json`](./twa-manifest.json) — source of truth for the TWA configuration.
- `app/build.gradle`, `app/src/main/...` — generated Android project files. Update them by running `npm run android:update` from the repo root, never by hand.

## Build

From the repo root:

```bash
# Install dependencies (includes Bubblewrap CLI)
npm install

# Copy and fill in signing credentials
cp src-android/local.properties.example src-android/local.properties
# Edit src-android/local.properties with your keystore/key passwords

# Regenerate the Android project with the latest Bubblewrap template / SDKs
npm run android:update

# Build the App Bundle (AAB) for Google Play — no interactive prompts
npm run android:build
```

`android:build` invokes the Gradle wrapper directly and reads signing passwords from `local.properties`, so Bubblewrap's password prompts are bypassed. After `android:update`, a small patch is automatically re-applied to `app/build.gradle` to keep the `local.properties` signing configuration in place.

## Signing

The build expects a signing keystore at `src-android/signing.keystore` with the alias `my-key-alias`.

- **Do not commit the keystore.** It is already ignored by `.gitignore`.
- Passwords are read from `src-android/local.properties` (also gitignored).
- Copy the example file and fill in your passwords:

```bash
cp src-android/local.properties.example src-android/local.properties
# Edit src-android/local.properties with your keystore and key passwords
```

- To manage the release signing key, use the Play Console (Play App Signing) or keep your upload key in a safe location.

## Versioning

Before each release, bump both `appVersionName` and `appVersionCode` in [`twa-manifest.json`](./twa-manifest.json), then run `npm run android:update` so the generated Gradle files pick up the new values.

`android:update` / `android:build` re-apply a patch that keeps `targetSdkVersion` at **36**. The Bubblewrap CLI currently locked in this repo (1.24.x) still templates target 35; Play requires Android 16 (API 36) from 31 August 2026.

## Digital Asset Links

The `assetlinks.json` file served at `https://polytalk.me/.well-known/assetlinks.json` must include the SHA-256 fingerprint of the signing key used to build the APK/AAB. Use `npx bubblewrap fingerprint` to generate or update it after creating or rotating keys.
