import { Shield } from "lucide-react";
import LoginForm from "../../components/features/login";
import Card from "../../components/common/Card";

const Login = () => {
  const handleSubmit = (email: string, password: string) => {
    console.log("Login attempt:", { email, password });
    // TODO: Implement actual authentication logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your dashboard account</p>
        </div>

        {/* Login Form Card */}
        <Card>
          <LoginForm onSubmit={handleSubmit} />
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default Login;
