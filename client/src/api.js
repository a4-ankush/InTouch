import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Use env variable for backend URL
  withCredentials: true,
});

export default api;
