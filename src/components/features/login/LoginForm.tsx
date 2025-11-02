import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import Input from "../../common/Input";
import Button from "../../common/Button";

export interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({
  onSubmit,
  isLoading = false,
  error,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit?.(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setFormErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={formErrors.email}
        leftIcon={<Mail size={18} />}
        fullWidth
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setFormErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={formErrors.password}
        leftIcon={<Lock size={18} />}
        fullWidth
        autoComplete="current-password"
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        leftIcon={<LogIn size={18} />}
        isLoading={isLoading}
        fullWidth
        className="mt-6"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;

