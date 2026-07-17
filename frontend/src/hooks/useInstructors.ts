import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandler";
import { api } from "@/services/api";

export interface IInstructor {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export const useInstructors = () => {
  const [instructors, setInstructors] = useState<IInstructor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const itemsPerPage = 8;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchInstructors = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin?page=${page}&limit=${itemsPerPage}`);
      setInstructors(data.data);
      setTotal(data.total);
    } catch (error) {
      toast.error("Erro ao buscar instrutores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors(currentPage);
  }, [currentPage]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { status } = await api.post("/admin", { name, email });

      if (status === 200) {
        toast.success("Instrutor criado e e-mail enviado com sucesso!");
        setName("");
        setEmail("");
        await fetchInstructors();
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao criar instrutor.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { status } = await api.put(`/admin/${id}/toggle-active`, { active: !currentStatus });

      if (status === 200) {
        toast.success(`Acesso ${!currentStatus ? 'ativado' : 'desativado'} com sucesso.`);
        fetchInstructors();
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao alterar o status do instrutor.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este instrutor? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      const { status } = await api.delete(`/admin/${id}`);

      if (status === 200) {
        toast.success("Instrutor excluído com sucesso.");
        fetchInstructors();
      }
    } catch (error: any) {
      handleApiError(error, "Erro ao excluir o instrutor.");
    }
  };

  return {
    instructors,
    loading,
    currentPage,
    setCurrentPage,
    total,
    itemsPerPage,
    name,
    setName,
    email,
    setEmail,
    submitting,
    handleCreate,
    toggleActive,
    handleDelete
  };
};
