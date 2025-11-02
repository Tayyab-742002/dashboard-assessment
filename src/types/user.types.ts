import type { BaseEntity, Status } from "./common.types";
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  status: Status;
  avatar?: string;
}

export type UserRole = "Admin" | "User" | "Manager";

export interface AuthUser {
  user: User;
  token: string;
}
