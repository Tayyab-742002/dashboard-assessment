import axios, { type AxiosInstance } from "axios";
import { queryClient } from "../config/queryClient";
import { useAuthStore } from "../store/useAuthStore";
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor to handle the 401 Unauthorized response

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      try {
        queryClient.clear();
      } catch {
        console.error("Error clearing query client", error);
      }
      try {
        useAuthStore.getState().logout();
      } catch {
        console.error("Error logging out", error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
