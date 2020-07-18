import { AsyncStorage } from 'react-native';

import api from '@config/api';

export const login = (username, password) =>
  api.post('/login', { email: username, password });

export const register = (info) => api.post('/register', info);

export const resetPassword = (email) => api.post(`/reset_password`, { email });

export const verifyCode = (email, code) =>
  api.get(`/password`, { email, code });

export const newPassword = (email, code, password) =>
  api.post(`/password`, { password }, { params: { email, code } });

export const getSession = async () => {
  const token = await AsyncStorage.getItem('access-token');
  const id = await AsyncStorage.getItem('userid');
  const username = await AsyncStorage.getItem('username');
  return { token, user: { id: parseInt(id, 10), username } };
};

export const removeSession = () => {
  AsyncStorage.removeItem('access-token');
  AsyncStorage.removeItem('userid');
  AsyncStorage.removeItem('username');
  api.deleteHeader('access-token');
};

export const setSession = ({ token, user }) => {
  AsyncStorage.setItem('access-token', token);
  AsyncStorage.setItem('userid', `${user.id}`);
  AsyncStorage.setItem('username', user.username);
  api.setHeader('access-token', token);
};
