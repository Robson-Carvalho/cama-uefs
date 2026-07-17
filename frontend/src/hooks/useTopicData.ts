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

  const handleUpdate = async () => {
    if (!topic) return false;

    try {
      const data = await api.put(`/topic/${topic._id}`, {
        title: topic.title,
        content: topic.content,
        path: topic.path,
        classID: topic.classID,
      });

      if (data.status === 200) {
        toast.success("Atualizado com sucesso!");
        return true;
      }
    } catch (error: any) {
      if (error.status === 400) {
        toast.warning("Dados inválidos.");
      } else if (error.status === 500) {
        toast.error("Erro inesperado.");
      }
      return false;
    }
  };

  const handleDelete = async () => {
    if (!topic) return false;

    try {
      const data = await api.delete(`/topic/${topic._id}`);

      if (data.status === 204) {
        toast.success("Apagado com sucesso!");
      }

      navigate(`/admin/class/${topic.classID}`);
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
