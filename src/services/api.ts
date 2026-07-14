import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.autonomous-job.local/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g. redirect to login on 401)
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('auth_token');
        // Optional redirect logic
      }
    }
    return Promise.reject(error);
  }
);

export default api;
