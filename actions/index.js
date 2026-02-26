export const addFavorite = book => ({
  type: 'ADD_FAVORITE',
  payload: book
});

export const removeFavorite = bookId => ({
  type: 'REMOVE_FAVORITE',
  payload: bookId
});

export const setBooksQuery = (query) => ({
  type: 'SET_BOOKS_QUERY',
  payload: query,
});

export const setBooksLoading = (isLoading) => ({
  type: 'SET_BOOKS_LOADING',
  payload: isLoading,
});

export const setBooksSuccess = (items) => ({
  type: 'SET_BOOKS_SUCCESS',
  payload: items,
});

export const setBooksError = (error) => ({
  type: 'SET_BOOKS_ERROR',
  payload: error,
});

export const setBooksSort = (sortBy) => ({
  type: 'SET_BOOKS_SORT',
  payload: sortBy,
});

export const setBooksWithCoverOnly = (enabled) => ({
  type: 'SET_BOOKS_WITH_COVER_ONLY',
  payload: enabled,
});

export const setThemeName = (themeName) => ({
  type: 'SET_THEME_NAME',
  payload: themeName,
});

export const setAppLocale = (locale) => ({
  type: 'SET_APP_LOCALE',
  payload: locale,
});
