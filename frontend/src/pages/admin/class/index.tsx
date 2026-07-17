import { useParams } from "react-router";
import { Header } from "../components/header";
import { FormEvent, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Topics } from "../components/topics";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useClassData } from "@/hooks/useClassData";

const Class = () => {
  const { id } = useParams();
  const { _class, topics, loading, handleCreateTopic, handleUpdateClass, handleDeleteClass } = useClassData({ id });

  const [titleTopic, setTitleTopic] = useState<string>("");
  const [pathTopic, setPathTopic] = useState<string>("");

  const [titleClass, setTitleClass] = useState<string>("");
  const [pathClass, setPathClass] = useState<string>("");

  const onSubmitCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleCreateTopic(titleTopic, pathTopic);
    if (success) {
      setTitleTopic("");
      setPathTopic("");
    }
  };

  const onSubmitUpdateClass = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleUpdateClass(titleClass, pathClass);
    if (success) {
      setTitleClass("");
      setPathClass("");
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
                <h2 className="text-2xl font-semibold">{_class?.title}</h2>

                <div className="flex flex-row justify-start items-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">Criar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar tópico</DialogTitle>
                        <DialogDescription>
                          Preencha as informações para criar o tópico.
                        </DialogDescription>

                        <form
                          onSubmit={onSubmitCreateTopic}
                          className="pt-4 flex flex-col gap-6"
                        >
                          <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-gray-700">
                              Título
                            </label>
                            <Input
                              value={titleTopic}
                              onChange={(e) => setTitleTopic(e.target.value)}
                              type="text"
                              placeholder="Digite o título"
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-gray-700">
                              Path
                            </label>
                            <Input
                              value={pathTopic}
                              onChange={(e) => setPathTopic(e.target.value)}
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
                                onClick={() => {
                                  setPathTopic(""), setTitleTopic("");
                                }}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </DialogClose>
                        </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar aula</DialogTitle>
                        <DialogDescription>
                          Preencha as informações para editar a aula.
                        </DialogDescription>

                        <form
                          onSubmit={onSubmitUpdateClass}
                          className="pt-4 flex flex-col gap-6"
                        >
                          <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-gray-700">
                              Título
                            </label>
                            <Input
                              value={titleClass}
                              onChange={(e) => setTitleClass(e.target.value)}
                              type="text"
                              placeholder="Digite o título"
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <label className="text-sm font-medium text-gray-700">
                              Path
                            </label>
                            <Input
                              value={pathClass}
                              onChange={(e) => setPathClass(e.target.value)}
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
                                Editar
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Apagar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmar deleção</DialogTitle>
                        <DialogDescription>
                          Tem certeza de que deseja deletar a aula{" "}
                          <strong>{_class?.title}</strong> e todos os seus
                          tópicos?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose className="w-full">
                          <div className="mt-6 w-full flex justify-center">
                            <Button
                              onClick={() => handleDeleteClass()}
                              variant="destructive"
                              className="flex-grow"
                            >
                              Apagar
                            </Button>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>

            <section>
              {topics?.length ? (
                <Topics topics={topics} />
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

export { Class };
