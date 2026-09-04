# Google Play premium unlock

PolyTalk sells a **one-time** extra-content unlock. It is not a subscription.

- Product ID: `polytalk_premium`
- Android package: `me.polytalk.twa`
- Unlocks extra words, numbers, and sentences in the learning lists
- Purchases run through Google Play Billing in the Android Trusted Web Activity (TWA)
- The website and desktop builds do **not** charge a card or fake a Play payment

## Create the product in Play Console

Sondre must create the product and set the price. High-level steps:

1. Open [Google Play Console](https://play.google.com/console) and select the PolyTalk app (`me.polytalk.twa`).
2. Open **Monetize** (in-app products / one-time products). Official names in Console change; look for one-time in-app products, not subscriptions.
3. Create a product with ID **`polytalk_premium`**. The ID must match exactly.
4. Add a title and description that explain the extra words, numbers, and phrases pack.
5. **Set the price.** This repository does not choose or store a price. Play is the source of truth, including regional prices.
6. Activate the product so license testers and later production users can buy it.
7. Link a payments profile if Play asks for one. A merchant / payments setup is required before paid products can go live.

Do not treat this as a click-by-click Console walkthrough. Use Play’s current help for one-time products if a screen name differs.

## How the Android TWA charges

The Bubblewrap TWA enables Play Billing in `src-android/twa-manifest.json`:

```json
"features": {
  "playBilling": { "enabled": true }
},
"alphaDependencies": {
  "enabled": true
}
```

The generated Android project also:

- declares `com.android.vending.BILLING`
- registers `DigitalGoodsRequestHandler` on `DelegationService`
- hosts Play’s Digital Goods payment activity/service
- depends on `com.google.androidbrowserhelper:billing:1.1.0` (Play Billing Library 7.x)

On a device where the TWA is opened in Chrome, the web app uses:

1. **Digital Goods API** (`getDigitalGoodsService('https://play.google.com/billing')`) to read the SKU price and existing purchases
2. **Payment Request API** with method `https://play.google.com/billing` and `sku: polytalk_premium` to start checkout

After a successful purchase or restore, the app stores `polytalk-premium=1` in `localStorage` so the user is not asked again. The extra pack is **not** consumed, so Play can keep the entitlement.

Digital Goods is only available inside the Play-installed TWA (typically Chrome). It is not available on a normal desktop browser.

## Restore

The Settings and About pages have **Restore purchase**.

- In the Android TWA: the app calls Digital Goods `listPurchases()` on launch and when the user taps Restore.
- On web/desktop: Restore re-reads the local unlock flag. It cannot invent a Play charge. If nothing is stored, the UI tells the user to restore in the Android app.

## Web and desktop fallback

If Digital Goods is missing:

- Show the premium pitch
- Show **Buy on Google Play** (Play Store listing for `me.polytalk.twa`)
- Show **Restore purchase**
- Do not open a fake checkout

## Development unlock

For local development only, this is **not** a real payment:

```js
localStorage.setItem('polytalk-premium', '1');
location.reload();
```

To lock again:

```js
localStorage.removeItem('polytalk-premium');
location.reload();
```

The Settings card mentions this key only in Angular development mode.

## License testers

To try a real Play checkout without charging the production price:

1. In Play Console, add your Google account as a [license tester](https://support.google.com/googleplay/android-developer/answer/6062777).
2. Install a Play build (internal / closed / open testing, or production) signed with the upload key that Play already knows.
3. Sign in on the device with that tester account.
4. Buy `polytalk_premium`. Play should offer a test purchase flow for license testers.

License testing still requires the Play product to exist and the app to be uploaded to a track. A local `ng serve` page in a desktop browser cannot run Play Billing.

## After you change Android billing files

`npm run android:update` runs `bubblewrap update` and then re-applies the signing patch. If you regenerate the Android project, confirm Play Billing is still enabled:

- `src-android/twa-manifest.json` still has `features.playBilling.enabled`
- `DelegationService` still registers `DigitalGoodsRequestHandler`
- `app/build.gradle` still includes `com.google.androidbrowserhelper:billing`
- `AndroidManifest.xml` still has the billing permission and payment activity/service

Do not bump `appVersionCode` for this feature unless you are uploading a new Android package to Play.
