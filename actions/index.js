export const addFavorite = book => ({
  type: 'ADD_FAVORITE',
  payload: book
});

export const removeFavorite = bookId => ({
  type: 'REMOVE_FAVORITE',
  payload: bookId
});
