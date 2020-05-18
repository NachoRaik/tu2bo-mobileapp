import { create } from 'apisauce';
import { API_BASE_URL } from 'react-native-dotenv';

const api = create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

export default api;
