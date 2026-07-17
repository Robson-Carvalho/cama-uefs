import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/contexts/auth/useAuth";

const ConfirmRecoverPassword = () => {
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
      toast.error("Token não encontrado na URL.");
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
        // Limpar o localStorage de qualquer lixo anterior, como o usuário pediu
        localStorage.clear();
        navigate("/admin/login");
        return;
      }
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        toast.error("Token inválido ou expirado.");
        return;
      }
      toast.error("Erro inesperado ao alterar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 animate-fade-in-up">
        <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/5 rounded-3xl p-2 sm:p-4">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl text-center font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
              Nova Senha
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Crie uma nova senha de acesso segura
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={resetPassword}>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground/80">
                  Nova Senha
                </label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="******"
                  className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground/80">
                  Confirmar Nova Senha
                </label>
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="******"
                  className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors rounded-xl"
                />
              </div>
              <Button
                disabled={loading}
                className={`${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } w-full h-12 mt-2 rounded-xl text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all`}
                type="submit"
              >
                {loading ? "Salvando..." : "Redefinir Senha"}
              </Button>
            </form>
            <div className="text-center mt-6">
              <Link
                to="/admin/login"
                className="text-sm font-medium text-primary hover:text-blue-500 hover:underline transition-colors"
              >
                Voltar para o Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export { ConfirmRecoverPassword };
