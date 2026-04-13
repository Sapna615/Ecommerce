import axios from "axios";

// Always use localhost for development
const baseURL = `http://localhost:5002/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
