import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { AuthUser, LoginCredentials } from "../../types/user.types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const response = await apiClient.post<AuthUser>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LOGOUT, {});
  },
};
