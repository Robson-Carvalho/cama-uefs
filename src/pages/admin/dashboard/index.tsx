import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/useAuth";

import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      <Button onClick={() => handleLogout()}>sair</Button>
    </>
  );
};

export { AdminDashboard };
