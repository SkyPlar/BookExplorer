const initialState = {
  query: '',
  items: [],
  isLoading: false,
  error: null,
  sortBy: 'relevance',
  withCoverOnly: false,
};

const sortBooks = (items, sortBy) => {
  if (sortBy === 'title') {
    return [...items].sort((a, b) => {
      const titleA = a?.volumeInfo?.title || '';
      const titleB = b?.volumeInfo?.title || '';
      return titleA.localeCompare(titleB);
    });
  }

  if (sortBy === 'author') {
    return [...items].sort((a, b) => {
      const authorA = a?.volumeInfo?.authors?.[0] || '';
      const authorB = b?.volumeInfo?.authors?.[0] || '';
      return authorA.localeCompare(authorB);
    });
  }

  return items;
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKS_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_BOOKS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_BOOKS_SUCCESS':
      return {
        ...state,
        items: sortBooks(action.payload || [], state.sortBy),
        error: null,
      };
    case 'SET_BOOKS_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_BOOKS_SORT':
      return {
        ...state,
        sortBy: action.payload,
        items: sortBooks(state.items, action.payload),
      };
    case 'SET_BOOKS_WITH_COVER_ONLY':
      return {
        ...state,
        withCoverOnly: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
