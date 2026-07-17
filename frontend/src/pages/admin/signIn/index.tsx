import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useSignIn } from "@/hooks/useSignIn";

const AdminSignIn = () => {
  const {
    email, setEmail,
    password, setPassword,
    loading,
    showPassword, setShowPassword,
    handleLogin
  } = useSignIn();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 animate-fade-in-up">
        <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/5 rounded-3xl p-2 sm:p-4">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl text-center font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
              Acesso Restrito
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Área exclusiva para instrutores do CAMA UEFS
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground/80">
                  E-mail
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@uefs.br"
                  className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground/80">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <Button
                disabled={loading}
                className={`${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                } w-full h-12 mt-2 rounded-xl text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all`}
                type="submit"
              >
                {loading ? "Autenticando..." : "Entrar"}
              </Button>
            </form>
            <div className="text-center mt-6">
              <Link
                to="/admin/recover/password"
                className="text-sm font-medium text-primary hover:text-blue-500 hover:underline transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export { AdminSignIn };
