const initialState = {
  themeName: 'light',
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME_NAME':
      return {
        ...state,
        themeName: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
