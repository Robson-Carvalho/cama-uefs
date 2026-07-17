import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { IClass } from "@/interfaces/IClass";
import { ITopic } from "@/interfaces/ITopic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface UseClassDataProps {
  id: string | undefined;
}

export const useClassData = ({ id }: UseClassDataProps) => {
  const [_class, setClass] = useState<IClass | null>(null);
  const [topics, setTopics] = useState<ITopic[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const getContent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/class/${id}`);
        const _res = await api.get(`/topic/class/${id}`);

        setClass(res.data);
        setTopics(_res.data);
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Aula não encontrada");
        } else if (error.status === 500) {
          toast.error("Erro interno.");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [id, reload]);

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

  const handleCreateTopic = async (titleTopic: string) => {
    if (!titleTopic) {
      toast.warning("Título não informado.");
      return false;
    }

    const pathTopic = generateSlug(titleTopic);

    try {
      await api.post("/topic", {
        title: titleTopic,
        content: " ",
        path: pathTopic,
        classID: _class?.id,
      });

      toast.success("Tópico criado com sucesso!");
      return true;
    } catch (error) {
      toast.warning("Erro ao criar tópico.");
      return false;
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleUpdateClass = async (titleClass: string) => {
    try {
      await api.put(`/class/${_class?.id}`, {
        title: titleClass,
        path: generateSlug(titleClass),
      });

      toast.success("Aula atualizada com sucesso!");
      return true;
    } catch (error) {
      toast.warning("Erro ao atualizar aula.");
      return false;
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await api.delete(`/class/${_class?.id}`);
      navigate("/admin");
    } catch (error: any) {
      if (error.status) {
        toast.warning("Erro inesperado");
      }
    }
  };

  return {
    _class,
    topics,
    loading,
    handleCreateTopic,
    handleUpdateClass,
    handleDeleteClass,
  };
};
