import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { IPayload } from "@/interfaces/IPayload";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { LocalStorage } from "@/utils/LocalStorage";
import { AxiosError } from "axios";

interface IAuthProvider {
  children?: JSX.Element;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const [payload, setPayload] = useState<IPayload | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storage = await LocalStorage.getInstance().get<IPayload>(
        "cama-uefs-admin"
      );

      if (storage) {
        setAuthenticated(true);
        setPayload(storage);
      }

      setLoading(false);
    };

    loadingStoreData();
  }, []);

  const login = async (email: string, password: string): Promise<number> => {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 200) {
        const { data } = response;

        LocalStorage.getInstance().set<IPayload>("cama-uefs-admin", data);
        setAuthenticated(true);
        setPayload(data);
      }

      toast.success("Seja bem-vindo!");

      return response.status;
    } catch (err) {
      const error = err as AxiosError;

      const { status } = error;

      if (status === 404 || status === 401) {
        toast.warning("E-mail e/ou senha inválido.");
        return status;
      }

      if (status === 500) {
        toast.error("Erro interno no servidor.");
        return status;
      }

      toast.error("Erro inesperado.");
      throw error;
    }
  };

  const logout = (): void => {
    setAuthenticated(false);
    LocalStorage.getInstance().remove("cama-uefs-admin");
    setPayload(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading: loading, authenticated, login, logout, payload }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
