import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || '/api/v1';

const api = axios.create({
  baseURL: `${API_BASE_URL}${API_BASE_PATH}`,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
