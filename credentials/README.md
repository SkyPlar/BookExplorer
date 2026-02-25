# Credentials folder

Ця папка зберігає локальні/CI credentials для EAS.

## Android submit
- Очікуваний файл: `service-account.json`
- Шлях використовується в `eas.json` -> `submit.production.android.serviceAccountKeyPath`

## iOS submit
- `ascAppId` береться з env змінної `ASC_APP_ID` (див. `eas.json`).
- Перед запуском submit встановіть змінну середовища:
  - локально: `export ASC_APP_ID=your_app_store_connect_app_id`
  - у CI: додайте `ASC_APP_ID` у секрети/variables.

> Не комітьте реальні секрети у git.
