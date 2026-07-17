import { handleApiError } from "@/utils/errorHandler";
import { useAuth } from "@/contexts/auth/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, User } from "lucide-react";

const AdminSettings = () => {
  const { payload } = useAuth();
  
  // State for Name
  const [loadingName, setLoadingName] = useState<boolean>(false);
  const [name, setName] = useState<string>(payload?.admin.name || "");

  // States for password change
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // States for email change
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(payload?.admin.email || "");

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingPassword(true);

    try {
      if (!password) {
        toast.warning("Senha não informada.");
        return;
      }

      if (password !== confirmPassword) {
        toast.warning("As senhas não coincidem.");
        return;
      }

      const data = await api.put(`/admin/${payload?.admin.id}`, {
        name: payload?.admin.name,
        email: payload?.admin.email, // Kept the same because we change email in another endpoint
        password: password,
      });

      if (data.status === 200) {
        toast.success("Senha alterada com sucesso!");
        setPassword("");
        setConfirmPassword("");
        return;
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.warning("Admin não encontrado.");
      } else {
        handleApiError(error, "Erro inesperado ao alterar senha.");
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingName(true);

    try {
      if (!name) {
        toast.warning("Nome não pode ficar em branco.");
        return;
      }

      const data = await api.put(`/admin/${payload?.admin.id}`, {
        name: name,
        email: payload?.admin.email,
      });

      if (data.status === 200) {
        toast.success("Nome atualizado com sucesso!");
        
        // Update local storage so it persists without forcing relogin
        const storageData = localStorage.getItem("cama-uefs-admin");
        if (storageData) {
          const parsed = JSON.parse(storageData);
          parsed.admin.name = name;
          localStorage.setItem("cama-uefs-admin", JSON.stringify(parsed));
        }

        // Slight delay before reload to let the toast show
        setTimeout(() => {
          window.location.reload();
        }, 1500);
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

      const data = await api.post(`/admin/${payload?.admin.id}/request-email-change`, {
        newEmail,
      });

      if (data.status === 200) {
        toast.success("Link de confirmação enviado para o novo e-mail!");
        setNewEmail(payload?.admin.email || ""); // Reset after request
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao solicitar troca de e-mail.");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Configurações da Conta
        </h1>
        <p className="text-slate-500">
          Gerencie suas informações pessoais e configurações de segurança
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PERSONAL INFO CARD */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                <CardDescription>
                  Mantenha suas informações pessoais atualizadas.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus-visible:ring-indigo-500"
                    />
                    <Button 
                      type="submit" 
                      disabled={loadingName || name === payload?.admin.name}
                    >
                      {loadingName ? "..." : "Salvar"}
                    </Button>
                  </div>
                </div>
              </form>

              <form onSubmit={handleEmailRequest} className="space-y-4 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">E-mail atual</label>
                  <div className="flex items-center space-x-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-200">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{payload?.admin.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Novo E-mail</label>
                  <Input
                    type="email"
                    placeholder="Digite seu novo e-mail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Um link de confirmação será enviado para este endereço.
                  </p>
                </div>
                
                <Button
                  type="submit"
                  disabled={loadingEmail || newEmail === payload?.admin.email}
                  className="w-full sm:w-auto"
                >
                  {loadingEmail ? "Solicitando..." : "Alterar E-mail"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* SECURITY CARD */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Segurança</CardTitle>
                <CardDescription>
                  Mantenha sua conta segura atualizando sua senha regularmente.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Nova Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="Digite a nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus-visible:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirmar Nova Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
                  disabled={loadingPassword}
                >
                  {loadingPassword ? "Atualizando..." : "Atualizar Senha"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { AdminSettings };
