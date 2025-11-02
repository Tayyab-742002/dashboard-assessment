export type Status = "active" | "inactive" | "pending";

export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}
