import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/contexts/auth/useAuth";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const ConfirmEmailChange = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // We only execute once
    const confirmToken = async () => {
      if (!token) {
        toast.error("Token não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        const data = await api.post("/admin/confirm-email-change", { token });
        
        if (data.status === 200) {
          setSuccess(true);
          toast.success("E-mail alterado com sucesso!");
          // Clean storage to force relogin and update context
          setTimeout(() => {
            localStorage.clear();
            navigate("/admin/login");
          }, 3000);
        }
      } catch (error: any) {
        toast.error("Token inválido ou expirado.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    confirmToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 animate-fade-in-up">
        <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/5 rounded-3xl p-4 sm:p-6">
          <CardHeader className="space-y-4 pb-6 flex flex-col items-center">
            {loading ? (
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
            ) : success ? (
              <CheckCircle className="w-16 h-16 text-emerald-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
            
            <CardTitle className="text-2xl text-center font-extrabold font-heading">
              {loading ? "Confirmando e-mail..." : success ? "E-mail Atualizado!" : "Falha na Confirmação"}
            </CardTitle>
            
            <p className="text-center text-sm text-muted-foreground mt-2">
              {loading 
                ? "Aguarde enquanto verificamos seu token." 
                : success 
                  ? "Seu e-mail foi alterado com sucesso. Você será redirecionado para fazer login novamente."
                  : "O link é inválido, já foi usado ou expirou. Tente solicitar a alteração novamente nas configurações."
              }
            </p>
          </CardHeader>
          <CardContent className="flex justify-center">
            {!loading && !success && (
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-md"
                onClick={() => navigate(authenticated ? "/admin/settings" : "/admin/login")}
              >
                Voltar
              </Button>
            )}
            {!loading && success && (
              <Button
                variant="default"
                className="w-full h-12 rounded-xl text-md"
                onClick={() => {
                  localStorage.clear();
                  navigate("/admin/login");
                }}
              >
                Ir para o Login Agora
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export { ConfirmEmailChange };
