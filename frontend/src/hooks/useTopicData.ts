import { handleApiError } from "@/utils/errorHandler";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { ITopic } from "@/interfaces/ITopic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface UseTopicDataProps {
  id: string | undefined;
}

export const useTopicData = ({ id }: UseTopicDataProps) => {
  const [topic, setTopic] = useState<ITopic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [revisions, setRevisions] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const getContent = async () => {
      try {
        const { data } = await api.get(`/topic/${id}`);
        setTopic(data);
        
        try {
          const revs = await api.get(`/topic/${id}/revisions`);
          setRevisions(revs.data);
        } catch (e) {
          console.error("Erro ao carregar revisões", e);
        }
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Tópico não encontrado.");
        } else if (error.status === 500) {
          handleApiError(error, "Erro interno.");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [id]);

  const generateSlug = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleUpdate = async () => {
    if (!topic) return false;

    try {
      const data = await api.put(`/topic/${topic.id}`, {
        title: topic.title,
        content: topic.content,
        path: generateSlug(topic.title),
        classID: topic.classId,
        order: topic.order,
        isPublished: topic.isPublished,
      });

      if (data.status === 202) {
        toast.info(data.data.message || "Revisão enviada para aprovação do autor.");
        return true;
      }
      
      if (data.status === 200) {
        toast.success("Atualizado com sucesso!");
        return true;
      }
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Dados inválidos.";
      
      if (status >= 400 && status < 500) {
        toast.warning(message);
      } else {
        handleApiError(error, "Erro interno. Tente novamente mais tarde.");
      }
      
      // If there was an error (e.g. pending revisions race condition), refetch revisions to update UI
      try {
        const revs = await api.get(`/topic/${id}/revisions`);
        setRevisions(revs.data);
      } catch (e) {}

      return false;
    }
  };

  const handleUpdateVisibility = async (newVisibility: boolean) => {
    if (!topic) return false;
    try {
      setLoading(true);
      await api.put(`/topic/${topic.id}`, {
        title: topic.title,
        content: topic.content,
        path: generateSlug(topic.title),
        classID: topic.classId,
        order: topic.order,
        isPublished: newVisibility,
      });
      setTopic({ ...topic, isPublished: newVisibility });
      toast.success(newVisibility ? "Tópico publicado!" : "Tópico ocultado!");
      return true;
    } catch (error: any) {
      toast.error("Erro ao atualizar visibilidade.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!topic) return false;

    try {
      const data = await api.delete(`/topic/${topic.id}`);

      if (data.status === 204) {
        toast.success("Apagado com sucesso!");
      }

      navigate(`/admin/class/${topic.classId}`);
      return true;
    } catch (error: any) {
      handleApiError(error, "Erro ao tentar apagar tópico.");
      return false;
    }
  };

  const handleAcceptRevision = async (revId: string) => {
    try {
      await api.post(`/topic/revision/${revId}/accept`);
      toast.success("Revisão aceita!");
      setRevisions(prev => prev.filter(r => r.id !== revId));
      const { data } = await api.get(`/topic/${id}`);
      setTopic(data);
    } catch (err) {
      toast.error("Erro ao aceitar revisão");
    }
  };

  const handleRejectRevision = async (revId: string) => {
    try {
      await api.post(`/topic/revision/${revId}/reject`);
      toast.success("Revisão rejeitada!");
      setRevisions(prev => prev.filter(r => r.id !== revId));
    } catch (err) {
      toast.error("Erro ao rejeitar revisão");
    }
  };

  return {
    topic,
    setTopic,
    loading,
    revisions,
    handleUpdate,
    handleDelete,
    handleAcceptRevision,
    handleRejectRevision,
    handleUpdateVisibility
  };
};
