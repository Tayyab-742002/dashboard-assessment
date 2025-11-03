import LoginForm from "../../components/features/login";
import Card from "../../components/common/Card";
import logo from "../../assets/images/logo.png";
const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 p-4 border-b border-primary/50">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <img src={logo} alt="logo" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your dashboard account
          </p>
        </div>
        <Card className="border border-primary/50">
          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;
