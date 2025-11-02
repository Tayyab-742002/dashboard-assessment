import type { BaseEntity, Status } from "./common.types";

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  avatar?: string;
}

// Database user with password field (used in backend/database only)

export type UserRole = "Admin" | "User" | "Manager";

export interface AuthUser extends User {
  password: string;
  token: string;
}
