import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Link } from "react-router";

const RecoverPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        toast.error("Erro inesperado.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 md:px-8">
        <Card className="w-full max-w-md shadow-lg rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Recuperar Senha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={recoverPassword}>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Digite seu email"
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
                Recuperar
              </Button>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/admin/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Voltar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export { RecoverPassword };
