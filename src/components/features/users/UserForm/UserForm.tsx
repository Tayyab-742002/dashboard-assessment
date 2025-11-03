import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import type { UserFormProps, UserFormData } from "./UserForm.types";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "User", "Manager"]),
  status: z.enum(["active", "inactive"]),
});

const UserForm = ({
  user,
  onSubmit,
  onCancel,
  loading = false,
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status:
            user.status === "active" || user.status === "inactive"
              ? user.status
              : "inactive",
        }
      : {
          name: "",
          email: "",
          role: "User",
          status: "active",
        },
  });

  const handleFormSubmit: SubmitHandler<UserFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit as SubmitHandler<FieldValues>)}
      className="space-y-4"
    >
      <Input
        label="Name"
        {...register("name")}
        error={errors.name?.message}
        placeholder="John Doe"
        fullWidth
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="john@example.com"
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Role
        </label>
        <select
          {...register("role")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Status
        </label>
        <select
          {...register("status")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={loading} fullWidth>
          {user ? "Update User" : "Create User"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} fullWidth>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
