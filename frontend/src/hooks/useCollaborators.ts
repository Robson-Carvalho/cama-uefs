import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/api";

export interface ICollaborator {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const itemsPerPage = 10;

  const fetchCollaborators = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin?page=${page}&limit=${itemsPerPage}`);
      setCollaborators(data.data);
      setTotal(data.total);
    } catch (error: any) {
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        toast.error("Erro ao buscar colaboradores.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators(currentPage);
  }, [currentPage]);

  const changeRole = async (id: string, newRole: string) => {
    try {
      await api.put(`/admin/${id}/role`, { role: newRole });
      toast.success("Nível de acesso alterado com sucesso!");
      fetchCollaborators();
    } catch (error) {
      toast.error("Erro ao alterar nível de acesso.");
    }
  };

  return {
    collaborators,
    loading,
    currentPage,
    setCurrentPage,
    total,
    itemsPerPage,
    changeRole,
  };
};
