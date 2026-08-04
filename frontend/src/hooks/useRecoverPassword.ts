import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { api } from "@/services/api";
import { handleApiError } from "@/utils/errorHandler";
import { useAuth } from "@/contexts/auth/useAuth";

export const useRecoverPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/admin");
    }
  }, [authenticated, navigate]);

  const recoverPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        toast.warning("E-mail não informado.");
        return;
      }

      const data = await api.post("/auth/recover/password", { email });

      if (data.status === 200) {
        toast.success("Verifique seu e-mail.");
        return;
      }
    } catch (error: any) {
      if (error.status === 404) {
        toast.warning("E-mail inválido.");
        return;
      }
      if (error.status === 500) {
        handleApiError(error, "Erro inesperado.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, recoverPassword };
};
