import { Navigate, RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { ROUTES } from "./utils/constants";
function App() {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <RouterProvider router={router} />;
}

export default App;
