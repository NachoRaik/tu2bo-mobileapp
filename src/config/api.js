import { create } from 'apisauce';
import { API_BASE_URL } from 'react-native-dotenv';

console.warn('ACA');

const api = create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

console.warn(API_BASE_URL);

export default api;
