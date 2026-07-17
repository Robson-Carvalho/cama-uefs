import { useParams, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Topics } from "../components/topics";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
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
  const navigate = useNavigate();
  const { 
    _class, 
    topics, 
    loading, 
    topicsLoading,
    page,
    setPage,
    totalPages,
    handleCreateTopic, 
    handleUpdateClass, 
    handleDeleteClass,
    handleReorderTopic,
    handleMoveToPageTopic
  } = useClassData({ id });

  const [titleTopic, setTitleTopic] = useState<string>("");
  const [titleClass, setTitleClass] = useState<string>("");
  const [orderClass, setOrderClass] = useState<number>(0);
  const [isPublishedClass, setIsPublishedClass] = useState<boolean>(true);

  const onSubmitCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handleCreateTopic(titleTopic);
    if (success) {
      setTitleTopic("");
    }
  };

  const onSubmitUpdateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleClass) return;

    await handleUpdateClass(titleClass, orderClass, isPublishedClass);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-6 border-b pb-6">
        <div className="flex flex-col items-start gap-4 w-full md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Dashboard
          </Button>
          
          <div className="flex flex-col gap-1 w-full overflow-hidden">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Aula</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 break-words whitespace-normal">
              {_class?.title}
            </h1>
          </div>
        </div>
        
        {!loading && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default"><Plus className="w-4 h-4 mr-2" /> Criar Tópico</Button>
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
                    <DialogClose asChild>
                      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end items-center mt-4 w-full">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => setTitleTopic("")}
                        >
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

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => {
                  setTitleClass(_class?.title || "");
                  setOrderClass(_class?.order || 0);
                  setIsPublishedClass(_class?.isPublished ?? true);
                }}><Edit className="w-4 h-4 mr-2" /> Editar</Button>
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
                        Ordem (Posição)
                      </label>
                      <Input
                        value={orderClass}
                        onChange={(e) => setOrderClass(parseInt(e.target.value) || 0)}
                        type="number"
                        placeholder="Ex: 1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isPublishedClass" 
                        checked={isPublishedClass}
                        onChange={(e) => setIsPublishedClass(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="isPublishedClass" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Publicado (visível para os alunos)
                      </label>
                    </div>
                    <DialogClose asChild>
                      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end items-center mt-4 w-full">
                        <Button type="button" variant="outline" className="w-full sm:w-auto">
                          Cancelar
                        </Button>
                        <Button type="submit" variant="default" className="w-full sm:w-auto">
                          Salvar
                        </Button>
                      </div>
                    </DialogClose>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive"><Trash2 className="w-4 h-4 mr-2" /> Apagar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar deleção</DialogTitle>
                  <DialogDescription>
                    Tem certeza de que deseja deletar a aula{" "}
                    <strong>{_class?.title}</strong> e todos os seus tópicos?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <div className="mt-4 flex flex-col-reverse sm:flex-row w-full justify-end gap-3">
                      <Button variant="outline" className="w-full sm:w-auto">Cancelar</Button>
                      <Button
                        onClick={() => handleDeleteClass()}
                        variant="destructive"
                        className="w-full sm:w-auto"
                      >
                        Apagar
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 w-full">
        {topicsLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ) : (
          <section>
            {topics?.length ? (
              <>
                <Topics 
                  topics={topics} 
                  onReorder={handleReorderTopic} 
                  onMoveToPage={handleMoveToPageTopic}
                  page={page}
                  totalPages={totalPages}
                />
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                    disabled={page === 1 || topicsLoading}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm font-medium text-slate-600">
                    Página {page} de {Math.max(1, totalPages)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || topicsLoading}
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
                <h3 className="text-lg font-semibold mb-1">Nenhum tópico encontrado</h3>
                <p className="text-muted-foreground text-sm max-w-[250px]">Crie o primeiro tópico usando o botão no topo da página.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export { Class };
