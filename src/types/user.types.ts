import type { BaseEntity, Status } from "./common.types";

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  avatar?: string;
}

// Database user with password field (used in backend/database only)
export interface DbUser extends User {
  password: string;
}

export type UserRole = "Admin" | "User" | "Manager";

export interface AuthUser extends User {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
