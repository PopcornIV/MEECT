import axios from "axios";

// Base URL from environment variables
const API_BASE = import.meta.env.VITE_API_BASE;

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE,
  // Optionally set headers, timeouts, etc.
  timeout: 5000,
});

// Example helper functions
export const getProjects = () => axiosInstance.get("/projects/");
export const getResources = () => axiosInstance.get("/resources/");
// Add more endpoints as needed
