# Google Play upload from GitHub Actions

Manual workflow [`.github/workflows/android-play.yml`](../.github/workflows/android-play.yml) builds the Bubblewrap TWA App Bundle and uploads it to Google Play.

Default track is **beta**. Trigger it with **Actions → Android Play Store → Run workflow**.

## Job flow

```
checkout → Node 22 + Java 17 + Android SDK
  → decode keystore + write src-android/local.properties
  → node scripts/android-build.js  (no npm install; scripts use Node builtins only)
  → upload AAB artifact
  → upload to Play (r0adkll/upload-google-play@v1) if PLAY_SERVICE_ACCOUNT_JSON is set
```

Package name: `me.polytalk.twa` (from `src-android/twa-manifest.json`).

AAB output: `src-android/app/build/outputs/bundle/release/app-release.aab`

## Secrets and variables

| Name | Type | Required | Purpose |
| --------------------------- | ------------------- | -------- | ----------------------------------------------- |
| `KEYSTORE_BASE64` | secret | yes | Base64 of the upload keystore (`signing.keystore`) |
| `KEYSTORE_PASSWORD` | secret | yes | Keystore password |
| `KEY_PASSWORD` | secret | yes | Key password |
| `KEY_ALIAS` | secret | no | Key alias (defaults to `my-key-alias`) |
| `PLAY_SERVICE_ACCOUNT_JSON` | secret | for upload | Full Google Cloud service account JSON key |
| `PLAY_TRACK` | variable | no | Optional track override when input is unset (default `beta`) |

Encode the keystore:

```bash
base64 -w0 src-android/signing.keystore | gh secret set KEYSTORE_BASE64 --repo sondreb/polytalk
```

> If `PLAY_SERVICE_ACCOUNT_JSON` is missing, the workflow still builds and uploads the AAB artifact, then **skips** the Play upload with a warning.

## One-time setup

### 1. Play Console app

Create (or reuse) the app with package `me.polytalk.twa`. Complete declarations (app content, data safety, content rating, audience).

### 2. First upload manually

Google Play needs the first bundle on a track uploaded through the Console so **Play App Signing** can enroll. Download the workflow’s AAB artifact (or a local `npm run android:build` output) and upload once.

The keystore behind `KEYSTORE_BASE64` must be the registered **upload key**.

### 3. Service account

1. Play Console → **Setup → API access** — link a Google Cloud project.
2. Create a service account in Google Cloud → **Keys → Add key → JSON**.
3. Invite that service account email in Play Console and grant, for PolyTalk:
   - **Release → Release apps to testing tracks**
   - **Release → Manage testing tracks and edit tester lists**
   - **Release to production** only if you will use the `production` track
4. Enable the **Google Play Android Developer API** on the Cloud project.

```bash
gh secret set PLAY_SERVICE_ACCOUNT_JSON --repo sondreb/polytalk < path/to/service-account.json
```

## Choosing a track

On `workflow_dispatch`, pick `play_track` (`internal` / `alpha` / `beta` / `production`) and `play_release_status` (`completed` or `draft`). Defaults: **beta** + **completed**.

Use `draft` to create the release in Play Console without rolling it out.

## Version codes

Versions come from `src-android/twa-manifest.json`:

- `appVersionName` — user-visible version (e.g. `0.0.6`)
- `appVersionCode` — integer Play uses for uniqueness (e.g. `6`)

**Google Play rejects a versionCode that has already been used.** Before each release:

1. Bump `appVersionCode` (and usually `appVersionName`) in `twa-manifest.json`
2. Run `npm run android:update` so Gradle picks up the new values
3. Re-run the workflow

Do not invent a Tauri-style versionCode formula; use the TWA values as-is.

## After upload

1. Check Play Console → **Testing → Open testing** (beta) or the track you chose.
2. Add testers once and share the opt-in link.
3. Promote from the Console, or re-run the workflow with another track.

## Troubleshooting

| Error | Cause |
| ------------------------------------------------------------- | ---- |
| Missing required secret | Add `KEYSTORE_*` / `KEY_PASSWORD` (see table above) |
| Google Play upload skipped | `PLAY_SERVICE_ACCOUNT_JSON` not configured |
| `The caller does not have permission` | Service account not invited / wrong app / API not enabled / permissions still propagating |
| `Package not found: me.polytalk.twa` | App missing in Play Console or SA has no access |
| `Version code N has already been used` | Bump `appVersionCode` in `twa-manifest.json` |
| `Only releases with status draft may be created on draft app` | Use `play_release_status: draft` until the app is published |
