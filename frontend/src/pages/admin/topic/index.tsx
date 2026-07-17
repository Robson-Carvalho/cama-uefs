import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
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
import MDEditor from '@uiw/react-md-editor';
import { useTopicData } from "@/hooks/useTopicData";

const Topic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { topic, setTopic, loading, handleUpdate, handleDelete } = useTopicData({ id });

  const onSubmitUpdate = async (e: FormEvent) => {
    e.preventDefault();
    await handleUpdate();
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
                  <form onSubmit={onSubmitUpdate} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-foreground">
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
                      <label className="text-sm font-medium text-foreground">
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
                      <label className="text-sm font-medium text-foreground">
                        Conteúdo
                      </label>

                      <div data-color-mode="light">
                        <MDEditor
                          value={topic.content}
                          onChange={(val) =>
                            setTopic({ ...topic, content: val || "" })
                          }
                          height={500}
                          preview="live"
                          className="w-full"
                        />
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
