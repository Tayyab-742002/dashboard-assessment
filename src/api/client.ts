import axios, { type AxiosInstance } from "axios";
import type { ApiError } from "../types/api.types";


const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    
})