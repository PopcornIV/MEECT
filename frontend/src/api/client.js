import axios from "axios";

// Base URL from environment (VITE_BACKEND_URL) or fallback to localhost
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET request
export const getResources = async (resource) => {
  try {
    const res = await api.get(`/api/${resource}/`);
    return res;
  } catch (err) {
    console.error(`❌ Error fetching ${resource}:`, err);
    throw err;
  }
};

// Generic POST request
export const postResource = async (resource, data) => {
  try {
    const res = await api.post(`/api/${resource}/`, data);
    return res;
  } catch (err) {
    console.error(`❌ Error posting to ${resource}:`, err);
    throw err;
  }
};

// Optional: other HTTP methods
export const putResource = async (resource, id, data) => {
  try {
    const res = await api.put(`/api/${resource}/${id}/`, data);
    return res;
  } catch (err) {
    console.error(`❌ Error updating ${resource} with id ${id}:`, err);
    throw err;
  }
};

export const deleteResource = async (resource, id) => {
  try {
    const res = await api.delete(`/api/${resource}/${id}/`);
    return res;
  } catch (err) {
    console.error(`❌ Error deleting ${resource} with id ${id}:`, err);
    throw err;
  }
};

export default api;
