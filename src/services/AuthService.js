import { AsyncStorage } from 'react-native';

import api from '@config/api';

export const login = (username, password) =>
  api.post('/login', { email: username, password });

export const register = (info) => api.post('/register', info);

export const getSession = async () => {
  const token = await AsyncStorage.getItem('access-token');
  const id = await AsyncStorage.getItem('userid');
  const username = await AsyncStorage.getItem('username');
  return { token, user: { id, username } };
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
};
