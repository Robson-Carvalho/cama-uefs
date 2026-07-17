import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandler";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/auth/useAuth";

export const useSettings = () => {
  const { payload } = useAuth();
  
  const [loadingName, setLoadingName] = useState<boolean>(false);
  const [name, setName] = useState<string>(payload?.admin.name || "");

  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loadingEmail, setLoadingEmail] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(payload?.admin.email || "");

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);

    try {
      if (!password) { toast.warning("Senha não informada."); return; }
      if (password !== confirmPassword) { toast.warning("As senhas não coincidem."); return; }

      const data = await api.put(`/admin/${payload?.admin.id}`, {
        name: payload?.admin.name,
        email: payload?.admin.email,
        password: password,
      });

      if (data.status === 200) {
        toast.success("Senha alterada com sucesso!");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      if (error.response?.status === 404) toast.warning("Admin não encontrado.");
      else handleApiError(error, "Erro inesperado ao alterar senha.");
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingName(true);

    try {
      if (!name) { toast.warning("Nome não pode ficar em branco."); return; }

      const data = await api.put(`/admin/${payload?.admin.id}`, {
        name: name,
        email: payload?.admin.email,
      });

      if (data.status === 200) {
        toast.success("Nome atualizado com sucesso!");
        const storageData = localStorage.getItem("cama-uefs-admin");
        if (storageData) {
          const parsed = JSON.parse(storageData);
          parsed.admin.name = name;
          localStorage.setItem("cama-uefs-admin", JSON.stringify(parsed));
        }
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao atualizar o nome.");
    } finally {
      setLoadingName(false);
    }
  };

  const handleEmailRequest = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);

    try {
      if (!newEmail || newEmail === payload?.admin.email) {
        toast.warning("Insira um novo e-mail.");
        return;
      }

      const data = await api.post(`/admin/${payload?.admin.id}/request-email-change`, { newEmail });

      if (data.status === 200) {
        toast.success("Link de confirmação enviado para o novo e-mail!");
        setNewEmail(payload?.admin.email || "");
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao solicitar troca de e-mail.");
    } finally {
      setLoadingEmail(false);
    }
  };

  return {
    payload,
    name, setName, loadingName, handleNameSubmit,
    password, setPassword, confirmPassword, setConfirmPassword, loadingPassword, handlePasswordSubmit,
    newEmail, setNewEmail, loadingEmail, handleEmailRequest
  };
};
