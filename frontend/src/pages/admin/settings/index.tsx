import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const AdminSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    payload,
    name, setName, loadingName, handleNameSubmit,
    password, setPassword, confirmPassword, setConfirmPassword, loadingPassword, handlePasswordSubmit,
    newEmail, setNewEmail, loadingEmail, handleEmailRequest
  } = useSettings();

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
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nível de Acesso</label>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${payload?.admin.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                    {payload?.admin.role === 'ADMIN' ? 'Administrador' : 'Instrutor'}
                  </span>
                </div>
              </div>
              
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite a nova senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus-visible:ring-amber-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirmar Nova Senha
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme a nova senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="focus-visible:ring-amber-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
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
