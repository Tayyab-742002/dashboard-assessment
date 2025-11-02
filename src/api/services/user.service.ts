import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type { User } from "../../types/user.types";

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS);
    return response.data;
  },
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
    return response.data;
  },
  createUser: async (user: User): Promise<User> => {
    const response = await apiClient.post<User>(API_ENDPOINTS.USERS, user);
    return response.data;
  },
  updateUser: async (id: string, user: User): Promise<User> => {
    const response = await apiClient.put<User>(
      `${API_ENDPOINTS.USERS}/${id}`,
      user
    );
    return response.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
