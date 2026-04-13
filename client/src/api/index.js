import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5002/api";
// VITE_API_URL should include /api suffix (e.g., https://api.example.com/api)

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
