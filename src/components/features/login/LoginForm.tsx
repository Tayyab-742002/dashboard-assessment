import { Mail, Lock, LogIn } from "lucide-react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormProps } from "./LoginForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../api/services/auth.service";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ isLoading = false, error }: LoginFormProps) => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    // here will use auth service
    try {
      const responseData = await authService.login({
        email: data.email,
        password: data.password,
      });
      if (responseData?.token) {
        console.log("RESPONSE DATA", responseData);
        login(responseData);
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        className="border border-primary/30 focus:ring-primary focus:border-none transition-all duration-300"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
        leftIcon={<Mail size={18} />}
        fullWidth
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        className="border border-primary/30 focus:ring-primary focus:border-none transition-all duration-300"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
        leftIcon={<Lock size={18} />}
        fullWidth
        autoComplete="current-password"
      />

      {error && (
        <div className="p-3 bg-red-200 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        leftIcon={<LogIn size={18} />}
        isLoading={isLoading}
        fullWidth
        variant="ghost"
        className="mt-6 bg-primary/80 text-white hover:bg-primary cursor-pointer hover:transition-colors duration-300"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
