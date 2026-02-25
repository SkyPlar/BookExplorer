const initialState = {
  locale: 'en',
};

const i18nReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_LOCALE':
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export default i18nReducer;
