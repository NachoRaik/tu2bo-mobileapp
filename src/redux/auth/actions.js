import { login, setToken, removeToken } from '@services/AuthService';
import api from '@config/api';

export const actions = {
  LOGIN: '@@AUTH/LOGIN',
  LOGIN_SUCCESS: '@@AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@@AUTH/LOGIN_FAILURE',
  SAVE_CURENT_TOKEN: '@@AUTH/SAVE_CURENT_TOKEN',
  LOGOUT: '@@AUTH/LOGOUT'
};

export const actionCreator = {
  login: (username, password) => async (dispatch) => {
    dispatch({ type: actions.LOGIN });
    const response = await login(username, password);
    if (response.ok) {
      const token = response.data.token; //response.headers['access-token']
      setToken(token);
      dispatch(actionCreator.loginSuccess(token));
    } else dispatch(actionCreator.loginFailure(response.problem));
  },
  loginSuccess: (token) => ({
    type: actions.LOGIN_SUCCESS,
    payload: token
  }),
  loginFailure: (problem) => ({
    type: actions.LOGIN_FAILURE,
    payload: problem
  }),
  saveCurrentToken: (token) => {
    api.setHeader('Authorization', token);
    return { type: actions.SAVE_CURENT_TOKEN, payload: token };
  },
  logout: () => {
    removeToken();
    return { type: actions.LOGOUT };
  }
};

export default actionCreator;
