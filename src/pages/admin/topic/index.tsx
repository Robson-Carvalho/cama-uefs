import { ITopic } from "@/interfaces/ITopic";
import { api } from "@/services/api";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Header } from "../components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownRenderer } from "@/components/markdownRenderer";

const Topic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<ITopic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const getContent = async () => {
      try {
        const { data } = await api.get(`/topic/${id}`);

        setTopic(data);
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Tópico não encontrado.");
        }

        if (error.status === 500) {
          toast.error("Erro interno,");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, []);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await api.put(`/topic/${topic?._id}`, {
        title: topic?.title,
        content: topic?.content,
        path: topic?.path,
        classID: topic?.classID,
      });

      if (data.status === 200) {
        toast.success("Atualizado com sucesso!");
      }
    } catch (error: any) {
      if (error.status === 400) {
        toast.warning("Dados inválidos.");
        return;
      }
      if (error.status === 500) {
        toast.error("Erro inesperado.");
        return;
      }
    }
  };

  const handleDelete = async () => {
    try {
      const data = await api.delete(`/topic/${topic?._id}`);

      if (data.status === 204) {
        toast.success("Apagado com sucesso!");
      }

      navigate(`/admin/class/${topic?.classID}`);
    } catch (error: any) {
      if (error.status === 500) {
        toast.error("Erro inesperado.");
        return;
      }
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
            {topic ? (
              <>
                <section>
                  <div className="flex flex-col items-start gap-4">
                    <h2 className="text-2xl font-semibold">{topic?.title}</h2>

                    <Button
                      variant="default"
                      onClick={() => {
                        navigate(`/admin/class/${topic?.classID}`);
                      }}
                    >
                      Voltar
                    </Button>
                  </div>
                </section>

                <section>
                  <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-gray-700">
                        Título
                      </label>
                      <Input
                        type="text"
                        placeholder="Digite o título"
                        value={topic.title}
                        onChange={(e) =>
                          setTopic({ ...topic, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-gray-700">
                        Path
                      </label>
                      <Input
                        type="text"
                        placeholder="Digite o caminho"
                        value={topic.path}
                        onChange={(e) =>
                          setTopic({ ...topic, path: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-gray-700">
                        Conteúdo
                      </label>

                      <div className="flex gap-4 justify-between items-center  flex-wrap lg:flex-nowrap">
                        <Textarea
                          value={topic.content}
                          onChange={(e) =>
                            setTopic({ ...topic, content: e.target.value })
                          }
                          placeholder="Digite o conteúdo"
                          className="flex-grow h-64 w-32 md:w-1/2 resize-none"
                        />

                        {topic.content && (
                          <div className="flex-grow shadow-sm p-4 rounded-md border border-gray-200 h-64 w-full md:w-1/2 overflow-auto">
                            <MarkdownRenderer
                              content={topic.content as string}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 justify-start items-center">
                      <Button
                        type="submit"
                        variant="default"
                        className="w-fit"
                        disabled={loading}
                      >
                        Atualizar
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" className="w-fit">
                            Deletar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar deleção</DialogTitle>
                            <DialogDescription>
                              Tem certeza de que deseja deletar{" "}
                              <strong>{topic?.title}</strong>?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose className="w-full">
                              <div className="mt-6 w-full flex justify-center">
                                <Button
                                  onClick={() => handleDelete()}
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
                  </form>
                </section>
              </>
            ) : (
              <div className="py-8 flex justify-center items-center">
                <p>Tópico não encontrado.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export { Topic };
