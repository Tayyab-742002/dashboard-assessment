import type { User } from "../../../../types/user.types";
export interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  role: "Admin" | "User" | "Manager";
  status: "active" | "inactive";
}
