import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

const AdminSignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!email) {
        toast.warning("E-mail não informado.");
        return;
      }

      if (!password) {
        toast.warning("Senha não informada.");
        return;
      }

      const data = await api.post("/auth/login", { email, password });

      if (data.status === 200) {
        toast.success("Seja bem-vindo!");
        navigate("/admin");
      }
    } catch (error: any) {
      if (error.status === 404) {
        toast.warning("E-mail e/ou senha inválido.");
        return;
      }

      if (error.status === 401) {
        toast.warning("E-mail e/ou senha inválido.");
        return;
      }

      if (error.status === 500) {
        toast.warning("Erro inesperado.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(80vh-64px)] px-4 sm:px-6 md:px-8">
        <Card className="w-full max-w-md shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <Button
                disabled={loading}
                className={`${
                  loading === true ? "cursor-progress" : ""
                } w-full`}
                type="submit"
              >
                Entrar
              </Button>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/admin/recover/password"
                className="text-sm text-blue-600 hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export { AdminSignIn };
