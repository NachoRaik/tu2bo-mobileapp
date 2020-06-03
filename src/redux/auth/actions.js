import { login, register, setToken, removeToken } from '@services/AuthService';
import api from '@config/api';

export const actions = {
  LOGIN: '@@AUTH/LOGIN',
  LOGIN_SUCCESS: '@@AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@@AUTH/LOGIN_FAILURE',
  SAVE_CURENT_TOKEN: '@@AUTH/SAVE_CURENT_TOKEN',
  LOGOUT: '@@AUTH/LOGOUT',
  REGISTER: '@@AUTH/REGISTER',
  REGISTER_SUCCESS: '@@AUTH/REGISTER_SUCCESS',
  REGISTER_FAILURE: '@@AUTH/REGISTER_FAILURE'
};

export const actionCreator = {
  login: (username, password) => async (dispatch) => {
    dispatch({ type: actions.LOGIN });
    const response = await login(username, password);
    if (response?.ok) {
      const token = response.data.token; //response.headers['access-token']
      setToken(token);
      dispatch(actionCreator.loginSuccess(token));
    } else dispatch(actionCreator.loginFailure(response?.problem));
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
  },
  register: (info) => async (dispatch) => {
    dispatch({ type: actions.REGISTER });
    const response = await register(info);
    if (response.ok) {
      dispatch(actionCreator.registerSuccess());
    } else dispatch(actionCreator.loginFailure(response.problem));
  },
  registerSuccess: () => ({
    type: actions.REGISTER_SUCCESS
  }),
  registerFailure: (problem) => ({
    type: actions.REGISTER_FAILURE,
    payload: problem
  })
};

export default actionCreator;
