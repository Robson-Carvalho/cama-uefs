import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, GraduationCap } from "lucide-react";
import { useCollaborators } from "@/hooks/useCollaborators";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/useAuth";

const Collaborators = () => {
  const { collaborators, loading, currentPage, setCurrentPage, total, itemsPerPage, changeRole } = useCollaborators();
  const { payload } = useAuth();
  
  const isAdmin = payload?.admin?.role === 'ADMIN';
  const currentUserId = payload?.admin?.id;

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          Colaboradores
        </h1>
        <p className="text-slate-500">
          Visualize todos os colaboradores que fazem parte da equipe do CAMA UEFS.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Equipe
          </CardTitle>
          <CardDescription>Listagem de todos os membros e seus respectivos níveis de acesso.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4" >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : collaborators.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Nenhum colaborador encontrado.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {collaborators.map((colab) => (
                <div key={colab.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${colab.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {colab.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{colab.name}</h4>
                      <p className="text-sm text-slate-500">{colab.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase
                      ${colab.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                      {colab.role === 'ADMIN' ? <Shield className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                      {colab.role === 'ADMIN' ? 'Administrador' : 'Instrutor'}
                    </span>
                    {isAdmin && colab.id !== currentUserId && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changeRole(colab.id, colab.role === 'ADMIN' ? 'INSTRUCTOR' : 'ADMIN')}
                        className="ml-2"
                      >
                        Tornar {colab.role === 'ADMIN' ? 'Instrutor' : 'Admin'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {totalPages >= 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-sm text-slate-500">
                Página {currentPage} de {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { Collaborators };
