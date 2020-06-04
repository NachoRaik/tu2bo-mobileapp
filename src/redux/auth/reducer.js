import { actions } from './actions';

const initialState = {
  loading: false,
  token: '',
  error: null,
  registered: false,
  currentUser: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        loading: true,
        token: '',
        error: null
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user,
        loading: false
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.SAVE_CURENT_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case actions.LOGOUT:
      return {
        ...state,
        token: ''
      };
    case actions.REGISTER:
      return {
        ...state,
        loading: true,
        token: '',
        error: null
      };
    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: true
      };
    case actions.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.CLEAN_STATE:
      return {
        ...state,
        registered: false,
        error: null,
        loading: false
      };
    default:
      return state;
  }
}

export default reducer;
