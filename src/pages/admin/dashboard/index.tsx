import { useAuth } from "@/contexts/auth/useAuth";

import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return <></>;
};

export { AdminDashboard };
