import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true, // Cookies config
});

export const isAuthorizate = async () => await api.get('/auth/me')
  .then(res => res.status === 200)
  .catch(() => false);