import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { FormEvent, useState } from "react";

const AdminSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
    } catch (error) {
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
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input type="email" placeholder="Digite seu email" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <Button className="w-full" type="submit">
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
