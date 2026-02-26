## BookExplorer quickstart

### Prerequisites
- Node.js LTS, npm
- Expo CLI (`npm i -g expo-cli`) optional but handy
- Android emulator or iOS Simulator/Expo Go on device

### Setup
1. Install deps: `npm install`
2. Create `.env` in project root:
```
GOOGLE_BOOKS_API_KEY=your_key_here
```
3. Expo reads the key from `app.config.js` (extra.googleBooksApiKey). Fallback is `YOUR_API_KEY` placeholder.

### Run
- Start: `npm start`
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

### Lint & format
- Lint project: `npm run lint`
- Auto-format source/docs: `npm run format`
- Check formatting only: `npm run format:check`

### Notes
- API calls use axios via `services/api.js` with abort handling.
- Translations live in `translation/languages`. Add new keys there.
- Redux store split by slices: `books`, `favorites`, `ui`, `i18n`.
- Theme and language are persisted in AsyncStorage (`theme`, `locale`).

### EAS build (optional)
- Require Expo account + `npm i -g eas-cli`.
- Configure credentials paths in `eas.json` (`credentials/service-account.json` for Android, `ascAppId` for iOS).
- Build: `eas build --platform android` / `eas build --platform ios` (use profiles development/preview/production).
- Submit: `eas submit --platform android|ios` after configuring credentials.

### iOS Transporter / сертифікати (коротко)
- Створіть App ID і provisioning profile в Apple Developer, зв’яжіть із bundleId у app.config.js/Expo (якщо потрібно).
- Увійдіть у Xcode/Transporter з Apple ID; завантажуйте .ipa з `eas build --platform ios --profile production` через Transporter або `eas submit --platform ios`.
- Згенерований ascAppId (App Store Connect App ID) задайте через env: `export ASC_APP_ID=your_app_id` (в `eas.json` використовується `submit.production.ios.ascAppId = ${ASC_APP_ID}`).

### Debugging (RN Debugger / Flipper)
- RN Debugger: запустіть `expo start`, відкрийте dev menu на пристрої/емуляторі та увімкніть remote debugging.
- Flipper: використовуйте для network/layout inspect під час запуску debug build.
- Логи push/media/permissions перевіряйте в Metro terminal та Flipper logs.

### E2E plan (Detox)
- Для e2e додайте Detox після стабілізації UI-флоу (search → details → favorites → settings).
- Мінімальний план: smoke test запуску, пошук книги, відкриття details, додавання/видалення з favorites, зміна мови/теми.