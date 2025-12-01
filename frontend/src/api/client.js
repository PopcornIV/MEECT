import axios from "axios";

// Base backend URL (from environment variable if set)
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

// Create a shared axios instance
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example API functions using axiosInstance
export const getProjects = () => axiosInstance.get("/api/projects/");
export const getResources = (resourceType) => axiosInstance.get(`/api/${resourceType}/`);
export const getGallery = () => axiosInstance.get("/api/gallery/");
