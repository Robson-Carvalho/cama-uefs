import { useAuth } from "@/contexts/auth/useAuth";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const { payload, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <>
      <p>dash - {payload?.admin?.name}</p>
      <button onClick={() => handleLogout()}>sair</button>
    </>
  );
};

export { AdminDashboard };
