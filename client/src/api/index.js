import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5002";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
