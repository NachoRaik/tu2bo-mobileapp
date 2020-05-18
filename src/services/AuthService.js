import { AsyncStorage } from 'react-native';

import api from '@config/api';

export const login = (username, password) =>
  api.post('/login', { username, password });

export const getToken = () => AsyncStorage.getItem('access-token');

export const setToken = (token) => {
  AsyncStorage.setItem('access-token', token);
  api.setHeader('Authorization', token);
};

export const removeToken = () => {
  AsyncStorage.removeItem('access-token');
  api.deleteHeader('Authorization');
};
