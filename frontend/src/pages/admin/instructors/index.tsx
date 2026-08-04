import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ToggleRight, UserX, Loader2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useInstructors } from "@/hooks/useInstructors";

const Instructors = () => {
  const {
    instructors,
    loading,
    currentPage,
    setCurrentPage,
    total,
    itemsPerPage,
    name,
    setName,
    email,
    setEmail,
    submitting,
    handleCreate,
    toggleActive,
    handleDelete
  } = useInstructors();

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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
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
                <tr key={inst.id} className={`transition-colors hover:bg-slate-50 ${!inst.active ? 'bg-slate-50/70' : ''}`}>
                  <td className={`p-4 font-medium ${!inst.active ? 'text-slate-400' : 'text-slate-900'}`}>
                    {inst.name}
                  </td>
                  <td className={`p-4 ${!inst.active ? 'text-slate-400' : 'text-slate-600'}`}>{inst.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${inst.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {inst.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block w-20 text-center px-2.5 py-1 rounded-full text-xs font-semibold ${inst.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {inst.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {inst.role !== 'ADMIN' && (
                        <>
                          <Button 
                            variant={inst.active ? "outline" : "default"} 
                            size="sm"
                            onClick={() => toggleActive(inst.id, inst.active)}
                            className={`w-28 ${!inst.active ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                          >
                            {inst.active ? (
                              <><UserX className="w-4 h-4 mr-1.5" /> Desativar</>
                            ) : (
                              <><ToggleRight className="w-4 h-4 mr-1.5" /> Ativar</>
                            )}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(inst.id)}
                            title="Excluir instrutor"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <span className="text-sm text-slate-500">
            {total <= itemsPerPage ? (
              <>Total de <span className="font-medium">{total}</span> instrutor{total !== 1 ? 'es' : ''}</>
            ) : (
              <>Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{Math.ceil(total / itemsPerPage)}</span> (Total: {total})</>
            )}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(total / itemsPerPage), p + 1))}
              disabled={currentPage >= Math.ceil(total / itemsPerPage) || total === 0}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Instructors };
