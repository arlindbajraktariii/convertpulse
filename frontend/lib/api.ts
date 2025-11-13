import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Sites API
export const sitesAPI = {
  getAll: () => api.get('/sites'),
  
  create: (data: { name: string; domain: string }) =>
    api.post('/sites', data),
  
  delete: (id: string) => api.delete(`/sites/${id}`),
};

// Stats API
export const statsAPI = {
  get: (siteId: string, timeframe = '7d') =>
    api.get(`/stats/${siteId}?timeframe=${timeframe}`),
};

export default api;
