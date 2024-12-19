import axios from 'axios';
import { storage } from '../utils/storage';

const API_URL = 'https://formgenius-backend.onrender.com/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const user = await storage.getItem('user');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const formApi = {
  createForm: async (formData: any) => {
    const response = await api.post('/forms', formData);
    return response.data;
  },

  getForms: async () => {
    const response = await api.get('/forms');
    return response.data;
  },
  getFormResponses: async(id:string) =>{
    const response = await api.get(`/responses/${id}/responses`);
    return response.data;
  },

  getFormById: async (id: string) => {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  },

  updateForm: async (id: string, formData: any) => {
    const response = await api.put(`/forms/${id}`, formData);
    return response.data;
  },

  deleteForm: async (id: string) => {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  },

  submitResponse: async (responseData: any) => {
    const response = await api.post('/responses', responseData);
    return response.data;
  },
};