# Покриття пунктів грейдування та перевірка

Цей файл — окремий чекліст по всіх пунктах зі списку: що реалізовано, де саме в проєкті, і як це перевірити вручну.

> Формат:
> - **Реалізація**: що зроблено
> - **Де в коді**: ключові файли
> - **Як перевірити**: короткі кроки для ручної перевірки

---

## 1) Знайомство з React Native

### Вступ до React Native / Особливості / Налаштування середовища
- **Реалізація**: застосунок на RN + Expo, опис запуску/вимог та структури.
- **Де в коді**:
  - `README.md`
  - `app.json`
  - `app.config.js`
  - `package.json`
- **Як перевірити**:
  1. Відкрити `README.md`, перевірити розділи prerequisites та run.
  2. Запустити `npm start` і відкрити в Expo Go / Simulator.

---

## 2) Основні компоненти React Native

### Базові компоненти / Порівняння з HTML
- **Реалізація**: використано `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `SafeAreaView`, `TextInput`, `Switch`, `TouchableOpacity`, `Pressable`.
- **Де в коді**:
  - `screens/HomeScreen/index.jsx`
  - `screens/DetailsScreen/index.jsx`
  - `screens/FavoritesScreen.js`
  - `screens/SettingsScreen.js`
  - `screens/HomeScreen/components/BookCard.jsx`
- **Як перевірити**:
  1. Пройти всі екрани (Home, Details, Favorites, Settings).
  2. Переконатися, що списки, інпут, зображення, перемикачі працюють.

---

## 3) Стилізація

### classnames / Platform / Адаптивний дизайн / Стилізація компонентів
- **Реалізація**:
  - Theme-палітра + light/dark
  - адаптивні відступи через `useWindowDimensions`
  - платформені стилі (iOS/Android) у кнопках/тінях
  - уніфікація кольорів кнопок через тему
- **Де в коді**:
  - `theme/index.js`
  - `theme/ThemeProvider.js`
  - `App.js` (синхронізація react-native-paper з темою)
  - `screens/SettingsScreen.js`
  - `screens/DetailsScreen/index.jsx`
  - `screens/HomeScreen/index.jsx`
- **Як перевірити**:
  1. У Settings перемкнути тему.
  2. Перевірити, що кольори кнопок консистентні на Home/Details/Settings.
  3. Перевірити вигляд на різних розмірах екрану.

---

## 4) Робота зі станом і хуками

### Управління станом у React Native
- **Реалізація**: Redux для глобального стану + React hooks (`useEffect`, `useMemo`, `useCallback`, `useSelector`, `useDispatch`).
- **Де в коді**:
  - `store/index.js`
  - `reducers/booksReducer.js`
  - `reducers/favoritesReducer.js`
  - `reducers/uiReducer.js`
  - `reducers/i18nReducer.js`
  - `screens/HomeScreen/index.jsx`
  - `screens/SettingsScreen.js`
- **Як перевірити**:
  1. Змінити мову/тему в Settings — зміни мають застосуватись одразу.
  2. Додати/прибрати favorite — список Favorites має оновитись.

---

## 5) Навігація

### React Navigation / Stack / Передача даних між екранами
- **Реалізація**: Drawer + Bottom Tabs + Stack (Home/Details/WebView), передача `route.params` у Details/WebView.
- **Де в коді**:
  - `App.js`
  - `screens/HomeStack.js`
  - `screens/DetailsScreen/index.jsx`
  - `screens/WebViewScreen.js`
- **Як перевірити**:
  1. Home -> відкриття книги -> Details.
  2. У Details натиснути “Відкрити прев’ю” -> WebView.

---

## 6) Робота з API

### REST API / Axios
- **Реалізація**: axios-клієнт, таймаут, запити до Google Books, обробка помилок, abort/cancel.
- **Де в коді**:
  - `services/api.js`
  - `screens/HomeScreen/index.jsx`
  - `app.config.js`
- **Як перевірити**:
  1. Ввести запит > 2 символів на Home.
  2. Переконатися, що є результати або зрозуміле повідомлення про помилку.

---

## 7) Поглиблення у Expo та React Native

### Expo / Створення проєкту / SDK / Expo Go
- **Реалізація**: проєкт працює через Expo, виправлена сумісність із SDK 53 (включно з Reanimated), стабілізовано запуск у Expo Go.
- **Де в коді**:
  - `app.json`
  - `package.json`
  - `package-lock.json`
  - `babel.config.js`
  - `index.js`
- **Як перевірити**:
  1. Запустити `npx expo start -c`.
  2. Відкрити в iOS/Android Expo Go та перевірити, що немає крешу при старті.

---

## 8) Розширені можливості Expo

### WebView / Медіафайли / Push / Permissions API
- **Реалізація**:
  - `WebView` екран
  - збереження обкладинки в медіатеку
  - запит push permissions + отримання токена
  - централізовані permission-сервіси
- **Де в коді**:
  - `screens/WebViewScreen.js`
  - `screens/DetailsScreen/index.jsx`
  - `services/permissions.js`
  - `screens/SettingsScreen.js`
- **Як перевірити**:
  1. Details -> “Відкрити прев’ю”.
  2. Details -> “Зберегти обкладинку” (дозвіл + збереження).
  3. Settings -> “Push-сповіщення” (результат/помилка в UI).

---

## 9) Робота з бібліотеками та компонентами

### Популярні бібліотеки / Кастомні компоненти
- **Реалізація**:
  - `react-navigation`, `react-redux`, `react-native-paper`, `axios`, `react-native-webview`, `expo-*`
  - кастомний `BookCard` + `CustomText`
- **Де в коді**:
  - `package.json`
  - `screens/HomeScreen/components/BookCard.jsx`
  - `screens/HomeScreen/components/CustomText.jsx`
- **Як перевірити**:
  1. На Home перевірити рендер карток та skeleton-стан.
  2. Перевірити `Snackbar`, `Button`, `Portal` у Home/Settings.

---

## 10) Анімації

### Базові анімації / Створення анімацій
- **Реалізація**:
  - анімація появи карток у списку
  - press-анімація картки
  - hero/fade анімація в Details
- **Де в коді**:
  - `screens/HomeScreen/components/BookCard.jsx`
  - `screens/DetailsScreen/index.jsx`
- **Як перевірити**:
  1. На Home зробити пошук і подивитися анімацію появи карток.
  2. Відкрити Details і перевірити плавну появу контенту.

---

## 11) Основи мобільної розробки iOS та Android

### Екосистеми / Apple Connect + Transporter / UI-UX особливості
- **Реалізація**: документація по EAS, сертифікатах, iOS submission/Transporter.
- **Де в коді**:
  - `README.md`
  - `eas.json`
- **Як перевірити**:
  1. У `README.md` знайти секції про EAS і Transporter.
  2. Перевірити наявність профілів в `eas.json`.

---

## 12) Білд застосунків через Expo та EAS

### EAS build / Підготовка / Сертифікати
- **Реалізація**: профілі `development`, `preview`, `production` + submit-конфіг.
- **Де в коді**:
  - `eas.json`
  - `README.md`
- **Як перевірити**:
  1. Переглянути `eas.json`.
  2. (Опційно) запустити `eas build --platform ios|android --profile preview`.

---

## 13) Робота з нативними модулями

### Нативні модулі / Сторонні бібліотеки / Оновлення Expo
- **Реалізація**:
  - використано нативні модулі з Expo SDK (`expo-notifications`, `expo-media-library`, `expo-file-system`, `expo-device`)
  - оновлена сумісність залежностей до актуальних під SDK 53
- **Де в коді**:
  - `services/permissions.js`
  - `screens/DetailsScreen/index.jsx`
  - `package.json`
- **Як перевірити**:
  1. Перевірити роботу push/media на відповідних екранах.
  2. Перевірити `npx expo install --check`.

---

## 14) Тестування та налагодження

### Тестування / React Native Debugger
- **Реалізація**:
  - Jest + React Native Testing Library
  - тести редʼюсера й HomeScreen
  - документація по дебагу
- **Де в коді**:
  - `jest.config.js`
  - `setupJest.js`
  - `__tests__/favoritesReducer.test.js`
  - `__tests__/HomeScreen.test.jsx`
  - `README.md`
- **Як перевірити**:
  1. Запустити `npm test -- --runInBand`.
  2. Перевірити наявність інструкцій по дебагу в `README.md`.

---

## 15) Розширена мобільна розробка

### Складні навігаційні патерни / Deep Linking / Drawer + Combined Stack / Portal
- **Реалізація**: combined navigation (Drawer + Tabs + Stack), deep linking config, Portal у модалках/оверлеях.
- **Де в коді**:
  - `App.js`
  - `screens/HomeStack.js`
  - `screens/HomeScreen/index.jsx`
- **Як перевірити**:
  1. Пройти повний ланцюг навігації через UI.
  2. Перевірити відкриття deep link (`home`, `details/:id?`) через Expo URL.

---

## 16) Архітектура та управління станом

### Redux / Context / Multilang / Організація архітектури
- **Реалізація**:
  - Redux store розбитий на слайси
  - Theme context
  - i18n через redux + translation файли
  - документований підхід
- **Де в коді**:
  - `store/index.js`
  - `reducers/*.js`
  - `theme/ThemeProvider.js`
  - `translation/index.js`
  - `docs/redux-architecture.md`
- **Як перевірити**:
  1. Перемикання теми/мови має переживати перезапуск (AsyncStorage).
  2. Favorites та books-стан має коректно оновлюватися через UI.

---

## 17) Розширена стилізація та кастомізація UI

### Складні кастомні UI-компоненти / Теми / Динамічні стилі
- **Реалізація**:
  - кастомний `BookCard` зі skeleton/loading
  - модальний filter/sort
  - динамічні стилі від теми
  - уніфікація кнопок/кольорів між екранами
- **Де в коді**:
  - `screens/HomeScreen/components/BookCard.jsx`
  - `screens/HomeScreen/index.jsx`
  - `screens/SettingsScreen.js`
  - `screens/DetailsScreen/index.jsx`
  - `theme/index.js`
- **Як перевірити**:
  1. На Home відкрити filter/sort modal.
  2. На різних екранах перевірити єдину стилістику кнопок.
  3. Перемкнути тему і перевірити динамічне оновлення кольорів.