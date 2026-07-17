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

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const getContent = async () => {
      try {
        const { data } = await api.get(`/topic/${id}`);
        setTopic(data);
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Tópico não encontrado.");
        } else if (error.status === 500) {
          toast.error("Erro interno.");
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
        toast.error("Erro interno. Tente novamente mais tarde.");
      }
      return false;
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
      if (error.status === 500) {
        toast.error("Erro inesperado.");
      }
      return false;
    }
  };

  return {
    topic,
    setTopic,
    loading,
    handleUpdate,
    handleDelete,
  };
};
