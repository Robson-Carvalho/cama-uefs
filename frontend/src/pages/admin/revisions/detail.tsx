import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Check, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactDiffViewer from 'react-diff-viewer-continued';
import { useParams, useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth/useAuth";

const RevisionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payload } = useAuth();
  
  const [revision, setRevision] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRev = async () => {
      try {
        const { data } = await api.get(`/topic/revision/${id}`);
        setRevision(data);
      } catch (err) {
        toast.error("Erro ao carregar os detalhes da revisão.");
        navigate("/admin/revisions");
      } finally {
        setLoading(false);
      }
    };
    fetchRev();
  }, [id, navigate]);

  const handleAccept = async () => {
    try {
      await api.post(`/topic/revision/${id}/accept`);
      toast.success("Revisão aceita com sucesso!");
      navigate("/admin/revisions");
    } catch (err) {
      toast.error("Erro ao aceitar revisão");
    }
  };

  const handleReject = async () => {
    try {
      await api.post(`/topic/revision/${id}/reject`);
      toast.success("Revisão rejeitada com sucesso!");
      navigate("/admin/revisions");
    } catch (err) {
      toast.error("Erro ao rejeitar revisão");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!revision) {
    return <p>Revisão não encontrada.</p>;
  }

  const isAuthor = payload?.admin?.id === revision.topic?.authorId;
  const isPending = revision.status === "PENDING";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/admin/revisions")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Revisões
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Detalhes da Modificação
          </h1>
          <p className="text-muted-foreground">
            Tópico: <strong>{revision.topic?.title}</strong>
          </p>
        </div>

        {isAuthor && isPending && (
          <div className="flex gap-3">
            <Button onClick={handleReject} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <X className="w-4 h-4 mr-2" /> Rejeitar
            </Button>
            <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4 mr-2" /> Aceitar Modificação
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Enviado por <span className="font-semibold text-slate-700">{revision.revisor?.name}</span> ({revision.revisor?.email})
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(revision.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
             {revision.status === "PENDING" && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">Aguardando Avaliação</span>}
             {revision.status === "ACCEPTED" && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Aprovada</span>}
             {revision.status === "REJECTED" && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">Rejeitada</span>}
          </div>
        </div>
        
        <div className="p-0 overflow-auto">
          <ReactDiffViewer 
            oldValue={revision.originalContent || ""} 
            newValue={revision.content || ""} 
            splitView={true} 
            hideLineNumbers={false}
            showDiffOnly={false}
          />
        </div>
      </div>
    </div>
  );
};

export { RevisionDetail };
