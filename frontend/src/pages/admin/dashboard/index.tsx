import { Header } from "../components/header";
import { FormEvent, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Classes } from "../components/classes";
import { Button } from "@/components/ui/button";
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
  const [path, setPath] = useState<string>("");

  const onSubmitCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleCreateClass(title, path);
    if (success) {
      setTitle("");
      setPath("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex flex-col gap-8 max-w-[1536px] w-full mx-auto py-3 px-4 sm:px-6 md:px-8 p-4">
        {loading ? (
          <div className="mt-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-12 w-max-[1440px]" />
              <Skeleton className="h-24 w-max-[1440px]" />
              <Skeleton className="h-24 w-max-[1440px]" />
              <Skeleton className="h-24 w-max-[1440px]" />
              <Skeleton className="h-24 w-max-[1440px]" />
            </div>
          </div>
        ) : (
          <>
            <section className="mt-8">
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-2xl font-semibold">Aulas</h2>

                <div className="flex flex-row justify-start items-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">Criar aula</Button>
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

                          <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-gray-700">
                              Path
                            </label>
                            <Input
                              value={path}
                              onChange={(e) => setPath(e.target.value)}
                              type="text"
                              placeholder="Digite o path"
                            />
                          </div>

                          <DialogClose>
                            <div className="flex flex-row gap-4 justify-start items-center">
                              <Button
                                type="submit"
                                variant="default"
                                className="w-fit"
                              >
                                Criar
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                className="w-fit"
                              >
                                Cancelar
                              </Button>
                            </div>
                          </DialogClose>
                        </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>

            <section>
              {classes.length ? (
                <Classes classes={classes} />
              ) : (
                <div className="py-8 flex justify-center items-center">
                  <p>Não há conteúdo</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export { AdminDashboard };
