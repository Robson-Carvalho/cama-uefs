import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "@/services/api";
import { handleApiError } from "@/utils/errorHandler";
import { useAuth } from "@/contexts/auth/useAuth";

export const useConfirmEmailChange = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmToken = async () => {
      if (!token) {
        toast.warn("Token não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        const data = await api.post("/admin/confirm-email-change", { token });
        
        if (data.status === 200) {
          setSuccess(true);
          toast.success("E-mail alterado com sucesso!");
          setTimeout(() => {
            localStorage.clear();
            navigate("/admin/login");
          }, 3000);
        }
      } catch (error: any) {
        handleApiError(error, "Token inválido ou expirado.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    confirmToken();
  }, [token, navigate]);

  return { loading, success, authenticated };
};
