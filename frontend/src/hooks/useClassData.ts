import { handleApiError } from "@/utils/errorHandler";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { IClass } from "@/interfaces/IClass";
import { ITopic } from "@/interfaces/ITopic";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";

interface UseClassDataProps {
  id: string | undefined;
}

export const useClassData = ({ id }: UseClassDataProps) => {
  const [_class, setClass] = useState<IClass | null>(null);
  const [topics, setTopics] = useState<ITopic[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [topicsLoading, setTopicsLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const setPage = (newPageOrFn: number | ((p: number) => number)) => {
    const newPage = typeof newPageOrFn === 'function' ? newPageOrFn(page) : newPageOrFn;
    setSearchParams({ page: newPage.toString() });
  };
  
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const getContent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/class/${id}`);
        setClass(res.data);
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Aula não encontrada");
        } else if (error.status === 500) {
          handleApiError(error, "Erro interno.");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [id, reload]);

  useEffect(() => {
    if (!id) return;

    const getTopics = async () => {
      setTopicsLoading(true);
      try {
        const _res = await api.get(`/topic/class/${id}?page=${page}&limit=${limit}`);
        setTopics(_res.data.data);
        setTotalPages(Math.ceil(_res.data.total / limit));
      } catch (error: any) {
        // Handle error quietly or show a generic toast
      } finally {
        setTopicsLoading(false);
      }
    };

    getTopics();
  }, [id, page, reload]);

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
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Erro ao criar tópico.";
      
      if (status >= 400 && status < 500) {
        toast.warning(message);
      } else {
        handleApiError(error, "Erro interno. Tente novamente mais tarde.");
      }
      return false;
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleUpdateClass = async (titleClass: string, orderClass?: number, isPublishedClass?: boolean) => {
    try {
      await api.put(`/class/${_class?.id}`, {
        title: titleClass,
        path: generateSlug(titleClass),
        order: orderClass !== undefined ? orderClass : _class?.order,
        isPublished: isPublishedClass !== undefined ? isPublishedClass : _class?.isPublished,
      });

      toast.success("Aula atualizada com sucesso!");
      return true;
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Erro ao atualizar aula.";
      
      if (status >= 400 && status < 500) {
        toast.warning(message);
      } else {
        handleApiError(error, "Erro interno. Tente novamente mais tarde.");
      }
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

  const handleReorderTopic = async (reorderedTopics: ITopic[]) => {
    setTopics(reorderedTopics);
    
    const offset = (page - 1) * limit;
    const items = reorderedTopics.map((t, index) => ({
      id: t.id,
      order: offset + index,
    }));
    
    try {
      await api.put('/topic/reorder', { items });
    } catch (error: any) {
      handleApiError(error, 'Erro ao reordenar tópicos');
      setReload(prev => !prev);
    }
  };

  const handleMoveToPageTopic = async (topicId: string, direction: 'prev' | 'next') => {
    if (topics) {
      setTopics(topics.filter(t => t.id !== topicId));
    }

    try {
      const res = await api.get(`/topic/class/${id}?limit=1000`);
      const allTopics: ITopic[] = res.data.data;
      
      const itemIndex = allTopics.findIndex(t => t.id === topicId);
      if (itemIndex === -1) return;
      
      const item = allTopics.splice(itemIndex, 1)[0];
      
      let newIndex = 0;
      if (direction === 'prev') {
        newIndex = Math.max(0, (page - 2) * limit + (limit - 1));
      } else {
        newIndex = Math.min(allTopics.length, page * limit);
      }
      
      allTopics.splice(newIndex, 0, item);
      
      const items = allTopics.map((t, idx) => ({ id: t.id, order: idx }));
      
      await api.put('/topic/reorder', { items });
      toast.success(`Tópico movido para a página ${direction === 'prev' ? page - 1 : page + 1}`);
    } catch (error: any) {
      handleApiError(error, 'Erro ao mover o tópico');
    } finally {
      setReload(prev => !prev);
    }
  };

  return {
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
    handleMoveToPageTopic,
  };
};
