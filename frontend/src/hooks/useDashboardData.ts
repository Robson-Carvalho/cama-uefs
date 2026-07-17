import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { IClass } from "@/interfaces/IClass";
import { toast } from "react-toastify";

export const useDashboardData = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const getContent = async () => {
      try {
        const response = await api.get("/class");
        setClasses(response.data);
      } catch (error) {
        toast.warning("Erro inesperado.");
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [reload]);

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

  return {
    classes,
    loading,
    handleCreateClass,
  };
};
