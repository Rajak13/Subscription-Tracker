import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signUp: (name, email, password) => 
    api.post('/auth/sign-up', { name, email, password }),
  
  signIn: (email, password) => 
    api.post('/auth/sign-in', { email, password }),
  
  signOut: () => 
    api.post('/auth/log-out'),
};

// Subscriptions API
export const subscriptionsAPI = {
  getAll: () => 
    api.get('/subscriptions'),
  
  getById: (id) => 
    api.get(`/subscriptions/${id}`),
  
  create: (data) => 
    api.post('/subscriptions', data),
  
  update: (id, data) => 
    api.put(`/subscriptions/${id}`, data),
  
  delete: (id) => 
    api.delete(`/subscriptions/${id}`),
  
  getUserSubscriptions: (userId) => 
    api.get(`/subscriptions/user/${userId}`),
  
  cancel: (id) => 
    api.get(`/subscriptions/${id}/cancel`),
  
  getUpcomingRenewals: () => 
    api.get('/subscriptions/upcoming-renewals'),
};

// Users API
export const usersAPI = {
  getAll: () => 
    api.get('/users'),
  
  getById: (id) => 
    api.get(`/users/${id}`),
  
  update: (id, data) => 
    api.put(`/users/${id}`, data),
  
  delete: (id) => 
    api.delete(`/users/${id}`),
};

export default api;