import { FormEvent, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Classes } from "../components/classes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useDashboardData } from "@/hooks/useDashboardData";

const AdminDashboard = () => {
  const { classes, loading, page, setPage, totalPages, handleCreateClass, handleReorderClass, handleMoveToPageClass } = useDashboardData();

  const [title, setTitle] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const onSubmitCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleCreateClass(title);
    if (success) {
      setTitle("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Modal
          title="Criar aula"
          description="Preencha as informações para criar a aula."
          confirmText="Criar"
          onSubmit={onSubmitCreateClass}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <Button variant="default"><Plus className="w-4 h-4 mr-2" /> Criar aula</Button>
          }
        >
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-gray-700">
              Título
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Digite o título"
            />
          </div>
        </Modal>
      </div>
      
      <div className="flex flex-col gap-8 w-full">
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : (
          <section>
            {classes.length ? (
              <>
                <Classes 
                  classes={classes} 
                  onReorder={handleReorderClass} 
                  onMoveToPage={handleMoveToPageClass}
                  page={page}
                  totalPages={totalPages}
                />
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm font-medium text-slate-600">
                    Página {page} de {Math.max(1, totalPages)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || loading}
                  >
                    Próxima
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-12 bg-white rounded-xl border border-border flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl opacity-50">📂</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Nenhuma aula encontrada</h3>
                <p className="text-muted-foreground text-sm max-w-[250px]">Crie a primeira aula usando o botão no topo da página.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export { AdminDashboard };
