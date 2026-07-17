import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { Plus, ToggleRight, UserX, Loader2 } from "lucide-react";

interface IInstructor {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const Instructors = () => {
  const [instructors, setInstructors] = useState<IInstructor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // States for new instructor
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchInstructors = async () => {
    try {
      const { data } = await api.get("/admin");
      setInstructors(data);
    } catch (error) {
      toast.error("Erro ao buscar instrutores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { status } = await api.post("/admin", {
        name,
        email,
      });

      if (status === 200) {
        toast.success("Instrutor criado e e-mail enviado com sucesso!");
        setName("");
        setEmail("");
        fetchInstructors();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao criar instrutor.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { status } = await api.put(`/admin/${id}/toggle-active`, {
        active: !currentStatus,
      });

      if (status === 200) {
        toast.success(`Acesso ${!currentStatus ? 'ativado' : 'desativado'} com sucesso.`);
        fetchInstructors();
      }
    } catch (error) {
      toast.error("Erro ao alterar o status do instrutor.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Instrutores
        </h1>
        <p className="text-slate-500">
          Gerencie os instrutores com acesso à plataforma.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Instrutor</h2>
        <p className="text-sm text-slate-500 mb-4">A senha será gerada automaticamente e enviada para o e-mail cadastrado.</p>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            placeholder="Nome Completo" 
            value={name} 
            onChange={e => setName(e.target.value)}
            required
          />
          <Input 
            type="email"
            placeholder="E-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Criar Instrutor
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-sm">
              <th className="p-4">Nome</th>
              <th className="p-4">E-mail</th>
              <th className="p-4">Cargo</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  <Loader2 className="animate-spin w-6 h-6 mx-auto" />
                </td>
              </tr>
            ) : instructors.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Nenhum instrutor encontrado.
                </td>
              </tr>
            ) : (
              instructors.map(inst => (
                <tr key={inst.id} className={`transition-colors hover:bg-slate-50 ${!inst.active ? 'opacity-60 bg-slate-50/50' : ''}`}>
                  <td className="p-4 font-medium text-slate-900">
                    {inst.name}
                  </td>
                  <td className="p-4 text-slate-600">{inst.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${inst.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {inst.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${inst.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {inst.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {inst.role !== 'ADMIN' && (
                      <Button 
                        variant={inst.active ? "outline" : "default"} 
                        size="sm"
                        onClick={() => toggleActive(inst.id, inst.active)}
                        className={!inst.active ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                      >
                        {inst.active ? (
                          <><UserX className="w-4 h-4 mr-1.5" /> Desativar</>
                        ) : (
                          <><ToggleRight className="w-4 h-4 mr-1.5" /> Ativar</>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Instructors };
