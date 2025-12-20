import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------- API CALLS ---------- */

export const getProjects = () =>
  axiosInstance.get("/api/projects/");

export const getGallery = () =>
  axiosInstance.get("/api/gallery/");

export const getResources = (resourceType) =>
  axiosInstance.get(`/api/${resourceType}/`);
