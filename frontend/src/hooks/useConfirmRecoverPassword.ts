import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "@/services/api";
import { handleApiError } from "@/utils/errorHandler";
import { useAuth } from "@/contexts/auth/useAuth";

export const useConfirmRecoverPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (authenticated) {
      navigate("/admin");
    }
  }, [authenticated, navigate]);

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.warn("Token não encontrado na URL.");
      return;
    }

    if (!password) {
      toast.warning("Digite a nova senha.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const data = await api.post("/auth/reset/password", { token, newPassword: password });

      if (data.status === 200) {
        toast.success("Senha alterada com sucesso!");
        localStorage.clear();
        navigate("/admin/login");
        return;
      }
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        handleApiError(error, "Token inválido ou expirado.");
        return;
      }
      handleApiError(error, "Erro inesperado ao alterar senha.");
    } finally {
      setLoading(false);
    }
  };

  return { password, setPassword, confirmPassword, setConfirmPassword, loading, resetPassword };
};
