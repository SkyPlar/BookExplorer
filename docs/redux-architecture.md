# Redux architecture у BookExplorer

Цей документ описує, як організований стан застосунку, де зберігаються дані, і як проходить потік оновлень.

## 1. Store та структура state

Store створюється у `store/index.js` через `combineReducers`.

Поточні slice-и:
- `books` — пошуковий запит, список книг, сортування, фільтри, loading/error.
- `favorites` — обрані книги користувача.
- `ui` — UI-стан, зокрема обрана тема.
- `i18n` — поточна локаль застосунку.

## 2. Потік даних (Redux)

1. Екран/компонент диспатчить action.
2. Відповідний reducer обробляє action та повертає новий state.
3. Компоненти, підписані через `useSelector`, отримують оновлення.
4. UI ререндериться з новими даними.

## 3. Ролі основних reducer-ів

### `reducers/booksReducer.js`
Відповідає за:
- `query`
- `items`
- `isLoading`
- `error`
- `sortBy`
- `withCoverOnly`

Стан змінюється під час пошуку в `HomeScreen`, у т.ч. при `abort/cancel` запитів.

### `reducers/favoritesReducer.js`
Відповідає за:
- додавання книги в favorites
- видалення книги з favorites

Використовується в `DetailsScreen` та `FavoritesScreen`.

### `reducers/uiReducer.js`
Відповідає за загальний UI-стан, насамперед тему (`light`/`dark`).

### `reducers/i18nReducer.js`
Відповідає за поточну мову застосунку (`locale`).

## 4. Theme Context + Redux

Тема надається через `theme/ThemeProvider.js` (Context API),
але джерелом правди для `themeName` є Redux (`state.ui.themeName`).

Тобто:
- ThemeProvider читає `themeName` із Redux;
- `toggleTheme` диспатчить action зміни теми;
- потім тема пробрасывається в компоненти через context.

## 5. Multilang

- Переклади зберігаються у `translation/languages/en.json` та `translation/languages/uk.json`.
- Початкова локаль визначається в `translation/index.js` (device locale + fallback).
- Поточна локаль зберігається в Redux (`i18nReducer`) і використовується через `react-translate`.

## 6. Персист налаштувань

Через `AsyncStorage` зберігаються:
- `theme`
- `locale`
- `lastSearch`

Після запуску застосунку значення відновлюються в `App.js`/екранах і синхронізуються з Redux.

## 7. Чому така схема

- Redux дає передбачуваний глобальний стан та просте тестування reducer-ів.
- Context (ThemeProvider) спрощує доступ до готової обчисленої теми в UI.
- Відділення slice-ів зменшує зв’язність між фічами (`books`, `favorites`, `i18n`, `ui`).
