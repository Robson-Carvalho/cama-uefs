import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { FileText, Send, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Revisions = () => {
  const [activeTab, setActiveTab] = useState<"to_review" | "my_suggestions">("to_review");
  const [revisions, setRevisions] = useState<any[]>([]);
  const [myRevisions, setMyRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRevs = async () => {
      try {
        setLoading(true);
        const [allRes, mineRes] = await Promise.all([
          api.get('/topic/revisions/all'),
          api.get('/topic/revisions/mine')
        ]);
        setRevisions(allRes.data);
        setMyRevisions(mineRes.data);
      } catch (err) {
        toast.error("Erro ao carregar revisões");
      } finally {
        setLoading(false);
      }
    };
    fetchRevs();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Central de Revisões
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as modificações pendentes nas suas aulas e acompanhe as sugestões que você enviou.
        </p>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("to_review")}
          className={`pb-4 px-2 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "to_review" 
              ? "border-primary text-primary" 
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <FileText className="w-4 h-4" /> Para Avaliar ({revisions.length})
        </button>
        <button
          onClick={() => setActiveTab("my_suggestions")}
          className={`pb-4 px-2 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "my_suggestions" 
              ? "border-primary text-primary" 
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Send className="w-4 h-4" /> Minhas Sugestões ({myRevisions.length})
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : activeTab === "to_review" ? (
        revisions.length === 0 ? (
          <div className="py-16 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-slate-500">Nenhuma revisão pendente para as suas aulas no momento.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {revisions.map(rev => (
              <div key={rev.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{rev.topic?.title || rev.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Sugerido por <span className="font-medium text-slate-700">{rev.revisor?.name}</span> em {new Date(rev.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button onClick={() => navigate(`/admin/revisions/${rev.id}`)} variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                      <Eye className="w-4 h-4 mr-2" /> Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        myRevisions.length === 0 ? (
          <div className="py-16 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-slate-500">Você ainda não enviou nenhuma sugestão de edição.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myRevisions.map(rev => (
              <div key={rev.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{rev.topic?.title || rev.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Enviada em {new Date(rev.createdAt).toLocaleString()} para <span className="font-medium text-slate-700">{rev.topic?.author?.name || "Desconhecido"}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {rev.status === "PENDING" && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Aguardando Avaliação</span>}
                    {rev.status === "ACCEPTED" && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Aprovada</span>}
                    {rev.status === "REJECTED" && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Rejeitada</span>}
                    <Button onClick={() => navigate(`/admin/revisions/${rev.id}`)} variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                      <Eye className="w-4 h-4 mr-2" /> Visualizar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export { Revisions };
