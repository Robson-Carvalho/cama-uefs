import { useAuth } from "@/contexts/auth/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/api";

const AdminSettings = () => {
  const { payload } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!password) {
        toast.warning("Senha não informada.");
        return;
      }

      if (password !== confirmPassword) {
        toast.warning("Confirmação de senha incorreta.");
        return;
      }

      const data = await api.put(`/admin/${payload?.admin.id}`, {
        name: payload?.admin.name,
        email: payload?.admin.email,
        password: password,
      });

      if (data.status === 200) {
        toast.success("Senha alterada com sucesso!");
        return;
      }
    } catch (error: any) {
      if (error.status === 404) {
        toast.warning("Admin não encontrado.");
        return;
      }
      if (error.status === 500) {
        toast.error("Erro inesperado.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-3xl">

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <Input
              type="text"
              value={payload?.admin.name || ""}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={payload?.admin.email || ""}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Nova Senha
              </label>
              <Input
                type="password"
                placeholder="Digite a nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <Input
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-4 justify-start items-center">
              <Button
                type="submit"
                variant="default"
                className="w-fit"
                disabled={loading}
              >
                Alterar Senha
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-fit"
                onClick={() => {
                  setPassword(""), setConfirmPassword("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export { AdminSettings };
