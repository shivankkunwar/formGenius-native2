import axios from 'axios';
import { storage } from '../utils/storage';


const API_URL = 'https://formgenius-backend.onrender.com/api/auth';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.log('Response Error:', error);
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      console.log('Login attempt with:', { email, password });
      const response = await api.post('/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.user && response.data.token) {
        await storage.setItem('user', response.data);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      console.log('Register attempt with:', { name, email, password });
      const response = await api.post('/register', {
        name,
        email,
        password,
      });
      console.log('Register response:', response.data);

      if (response.data.user && response.data.token) {
        await storage.setItem('user', response.data);
      }
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: async () => {
    await storage.removeItem('user');
  },
};