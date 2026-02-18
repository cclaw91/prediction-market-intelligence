import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const marketAPI = {
  // Get all markets
  getMarkets: async (params = {}) => {
    const response = await api.get('/markets', { params });
    return response.data;
  },

  // Get single market
  getMarket: async (id) => {
    const response = await api.get(`/markets/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/markets/meta/categories');
    return response.data;
  },
};

export const alertAPI = {
  // Get all alerts
  getAlerts: async () => {
    const response = await api.get('/alerts');
    return response.data;
  },

  // Create alert
  createAlert: async (alertData) => {
    const response = await api.post('/alerts', alertData);
    return response.data;
  },

  // Subscribe to alerts
  subscribe: async (subscriptionData) => {
    const response = await api.post('/alerts/subscribe', subscriptionData);
    return response.data;
  },

  // Get subscriptions
  getSubscriptions: async (email) => {
    const response = await api.get('/alerts/subscriptions', {
      params: { email },
    });
    return response.data;
  },

  // Delete alert
  deleteAlert: async (id) => {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  },

  // Check alerts
  checkAlerts: async () => {
    const response = await api.post('/alerts/check');
    return response.data;
  },
};

export default api;
