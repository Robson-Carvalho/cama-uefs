import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/auth/useAuth";
import { LoadingSpinner } from "../loadingSpinner";

const PrivateRoute = () => {
  const { authenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export { PrivateRoute };
