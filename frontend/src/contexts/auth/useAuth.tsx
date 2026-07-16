import { useContext } from "react";
import { AuthContext } from "./authContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { useAuth };
