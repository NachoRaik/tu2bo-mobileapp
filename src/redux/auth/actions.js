import * as GoogleSignIn from 'expo-google-sign-in';

import {
  login,
  register,
  oauth,
  setSession,
  removeSession
} from '@services/AuthService';
import api from '@config/api';

export const actions = {
  LOGIN: '@@AUTH/LOGIN',
  LOGIN_SUCCESS: '@@AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@@AUTH/LOGIN_FAILURE',
  SAVE_CURRENT_SESSION: '@@AUTH/SAVE_CURRENT_SESSION',
  LOGOUT: '@@AUTH/LOGOUT',
  REGISTER: '@@AUTH/REGISTER',
  REGISTER_SUCCESS: '@@AUTH/REGISTER_SUCCESS',
  REGISTER_FAILURE: '@@AUTH/REGISTER_FAILURE',
  CLEAN_STATE: '@@AUTH/CLEAN_STATE',
  OAUTH: '@@AUTH/OAUTH'
};

export const actionCreator = {
  login: (username, password) => async (dispatch) => {
    dispatch({ type: actions.LOGIN });
    const response = await login(username, password);
    if (response?.ok) {
      setSession(response.data);
      dispatch(actionCreator.loginSuccess(response.data));
    } else dispatch(actionCreator.loginFailure(response?.data.reason));
  },
  loginSuccess: (token) => ({
    type: actions.LOGIN_SUCCESS,
    payload: token
  }),
  loginFailure: (problem) => ({
    type: actions.LOGIN_FAILURE,
    payload: problem
  }),
  saveCurrentSession: (session) => {
    api.setHeader('access-token', session.token);
    return { type: actions.SAVE_CURRENT_SESSION, payload: session };
  },
  logout: () => async (dispatch, getState) => {
    dispatch({ type: actions.LOGOUT });
    const { googleUser } = getState().auth;
    if (googleUser) {
      await GoogleSignIn.signOutAsync();
    }
    removeSession();
  },
  register: (info) => async (dispatch) => {
    dispatch({ type: actions.REGISTER });
    const response = await register(info);
    if (response.ok) {
      dispatch(actionCreator.registerSuccess());
    } else dispatch(actionCreator.registerFailure(response.data.reason));
  },
  registerSuccess: () => ({
    type: actions.REGISTER_SUCCESS
  }),
  registerFailure: (problem) => ({
    type: actions.REGISTER_FAILURE,
    payload: problem
  }),
  cleanState: () => ({
    type: actions.CLEAN_STATE
  }),
  oauth: (idToken, photoURL) => async (dispatch) => {
    dispatch({ type: actions.OAUTH });
    const response = await oauth(idToken, photoURL);
    if (response?.ok) {
      setSession(response.data);
      dispatch(actionCreator.loginSuccess(response.data));
    } else dispatch(actionCreator.loginFailure(response?.data.reason));
  }
};

export default actionCreator;
