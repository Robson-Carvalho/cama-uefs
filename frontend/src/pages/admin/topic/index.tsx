import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
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
import MDEditor from '@uiw/react-md-editor';
import { useTopicData } from "@/hooks/useTopicData";
import { useAuth } from "@/contexts/auth/useAuth";

const Topic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { topic, setTopic, loading, revisions, handleUpdate, handleDelete, handleUpdateVisibility } = useTopicData({ id });
  const { payload } = useAuth();

  const hasPendingRevisions = revisions.some(r => r.status === "PENDING");
  const isAuthor = payload?.admin?.id === topic?.authorId;
  const isAdmin = payload?.admin?.role === "ADMIN";
  const canEditVisibility = isAuthor || isAdmin;

  const onSubmitUpdate = async (e: FormEvent) => {
    e.preventDefault();
    await handleUpdate();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-6 border-b pb-6">
        <div className="flex flex-col items-start gap-4 w-full md:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              navigate(`/admin/class/${topic?.classId}`);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Aula
          </Button>

          <div className="flex flex-col gap-1 w-full overflow-hidden">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Tópico</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 break-words whitespace-normal">
              {topic?.title}
            </h1>
          </div>
        </div>

        {!loading && topic && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="w-4 h-4 mr-2" /> Deletar
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
                  <DialogClose asChild>
                    <div className="mt-4 flex flex-col-reverse sm:flex-row w-full justify-end gap-3">
                      <Button variant="outline" className="w-full sm:w-auto">Cancelar</Button>
                      <Button
                        onClick={() => handleDelete()}
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

            <Button
              type="submit"
              form="topic-form"
              variant="default"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" /> Salvar Alterações
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 w-full">
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-[500px] w-full" />
          </div>
        ) : (
          <>
            {hasPendingRevisions && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex flex-col gap-2 shadow-sm">
                <h3 className="text-yellow-800 font-bold">⚠️ Edição Bloqueada</h3>
                <p className="text-yellow-700 text-sm">
                  {isAuthor 
                    ? "Você possui sugestões de modificação pendentes neste tópico. Apenas a visibilidade (publicar/ocultar) pode ser alterada no momento. Acesse a Central de Revisões para avaliar as sugestões."
                    : "Este tópico possui sugestões de modificação pendentes. O autor original deve avaliar as sugestões na Central de Revisões antes que novas edições de texto sejam permitidas."}
                </p>
              </div>
            )}

            {topic ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <form id="topic-form" onSubmit={onSubmitUpdate} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Título do Tópico
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: Introdução à Lógica de Programação"
                      value={topic.title}
                      disabled={hasPendingRevisions}
                      className="text-base py-6 px-4 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      onChange={(e) =>
                        setTopic({ ...topic, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Ordem (Posição)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 1"
                      value={topic.order}
                      className="text-base py-6 px-4 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl transition-all"
                      onChange={(e) =>
                        setTopic({ ...topic, order: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <label className={`relative inline-flex items-center w-fit group ${!canEditVisibility ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={topic.isPublished ?? true}
                      disabled={!canEditVisibility || loading}
                      onChange={(e) => handleUpdateVisibility(e.target.checked)}
                    />
                    <div className="relative w-11 h-6 min-w-[44px] bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 group-hover:after:scale-95"></div>
                    <span className="ml-3 text-sm font-semibold text-slate-700 flex flex-col gap-0.5">
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${topic.isPublished !== false ? 'bg-indigo-500' : 'bg-slate-300'}`}></span>
                        Publicado (visível para os alunos)
                      </span>
                      {!canEditVisibility && (
                        <span className="text-xs font-normal text-slate-400 ml-3.5">
                          Apenas o autor ou administrador
                        </span>
                      )}
                    </span>
                  </label>
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Conteúdo (Markdown)
                    </label>

                    <div data-color-mode="light" className={`rounded-xl overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all shadow-sm ${hasPendingRevisions ? 'opacity-60 pointer-events-none' : ''}`}>
                      <MDEditor
                        value={topic.content}
                        onChange={(val) =>
                          setTopic({ ...topic, content: val || "" })
                        }
                        height={600}
                        preview="live"
                        className="w-full !border-0"
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-16 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                  <span className="text-3xl opacity-40">📝</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Tópico não encontrado</h3>
                <p className="text-slate-500 max-w-sm">Este tópico não existe ou foi removido. Volte para a aula e selecione um tópico válido.</p>
              </div>
            )}
            
            {/* Revisões Pendentes */}
            {revisions && revisions.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  Revisões Pendentes de Co-autores
                </h3>
                <div className="flex flex-col gap-6">
                  {revisions.map((rev) => (
                    <div key={rev.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">{rev.revisor.name}</span>
                          <span className="text-sm text-slate-500">{rev.revisor.email}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          Sugerido em {new Date(rev.createdAt).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col gap-4">
                        <div>
                          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Modificação Proposta:</span>
                          <p className="text-sm text-slate-600 mb-4">
                            O co-autor sugeriu modificações no conteúdo deste tópico.
                          </p>
                        </div>

                        <div className="flex gap-3 justify-end mt-2">
                          <Button 
                            onClick={() => navigate(`/admin/revisions/${rev.id}`)} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Ver Modificações (Tela Cheia)
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { Topic };
