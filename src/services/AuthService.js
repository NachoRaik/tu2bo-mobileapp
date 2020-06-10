import { AsyncStorage } from 'react-native';

import api from '@config/api';

export const login = (username, password) =>
  api.post('/login', { email: username, password });

export const register = (info) => api.post('/register', info);

export const getSession = async () => {
  const token = await AsyncStorage.getItem('access-token');
  const user = await AsyncStorage.getItem('current-user');
  return { token, user };
};

export const removeSession = () => {
  AsyncStorage.removeItem('access-token');
  AsyncStorage.removeItem('current-user');
  api.deleteHeader('Authorization');
};

export const setSession = ({ token, user }) => {
  AsyncStorage.setItem('access-token', token);
  AsyncStorage.setItem('current-user', user);
  api.setHeader('Authorization', token);
};
