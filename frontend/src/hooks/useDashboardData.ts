import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { IClass } from "@/interfaces/IClass";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export const useDashboardData = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get("page") || "1", 10);
  const setPage = (newPageOrFn: number | ((p: number) => number)) => {
    const newPage = typeof newPageOrFn === 'function' ? newPageOrFn(page) : newPageOrFn;
    setSearchParams({ page: newPage.toString() });
  };
  
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    setLoading(true);

    const getContent = async () => {
      try {
        const response = await api.get(`/class?page=${page}&limit=${limit}`);
        setClasses(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        toast.warning("Erro inesperado.");
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [page, reload]);

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

  const handleCreateClass = async (title: string) => {
    if (!title) {
      toast.warning("Título não informado.");
      return false;
    }

    const path = generateSlug(title);

    try {
      await api.post("/class", { title, path });
      toast.success("Aula criada com sucesso.");
      return true;
    } catch (error) {
      toast.warning("Erro ao criar aula.");
      return false;
    } finally {
      setReload((prev) => !prev);
    }
  };

  const handleReorderClass = async (reorderedClasses: IClass[]) => {
    setClasses(reorderedClasses);
    
    const offset = (page - 1) * limit;
    const items = reorderedClasses.map((c, index) => ({
      id: c.id,
      order: offset + index,
    }));
    
    try {
      await api.put('/class/reorder', { items });
    } catch (error) {
      toast.error('Erro ao reordenar aulas');
      setReload(prev => !prev);
    }
  };

  return {
    classes,
    loading,
    page,
    setPage,
    totalPages,
    handleCreateClass,
    handleReorderClass,
  };
};
