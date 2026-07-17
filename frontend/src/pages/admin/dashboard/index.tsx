import { FormEvent, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Classes } from "../components/classes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDashboardData } from "@/hooks/useDashboardData";

const AdminDashboard = () => {
  const { classes, loading, handleCreateClass } = useDashboardData();

  const [title, setTitle] = useState<string>("");

  const onSubmitCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleCreateClass(title);
    if (success) {
      setTitle("");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default"><Plus className="w-4 h-4 mr-2" /> Criar aula</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar aula</DialogTitle>
              <DialogDescription>
                Preencha as informações para criar a aula.
              </DialogDescription>
              <form
                onSubmit={onSubmitCreateClass}
                className="pt-4 flex flex-col gap-6"
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
                <DialogClose asChild>
                  <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end items-center mt-4 w-full">
                    <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setTitle("")}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="default" className="w-full sm:w-auto">
                      Criar
                    </Button>
                  </div>
                </DialogClose>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col gap-8 w-full">
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <section>
            {classes.length ? (
              <Classes classes={classes} />
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
