const defaultLoginState = {
  isUserLoggedIn: false,
  username: '',
  isLuke: false,
  hasError: null,
};

export default function loginReducer(state = defaultLoginState, action) {
  if (action.type === 'SWAPI_LOGIN') {
    return { ...state, ...action.payload };
  } else if (action.type === 'SWAPI_ERRORS') {
    return { ...state, ...action.payload };
  }
  return state;
}
