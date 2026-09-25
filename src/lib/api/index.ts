import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = (path: string) => axios.create({
  baseURL: API_URL + path,
  withCredentials: true
});