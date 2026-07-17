import { toast } from "react-toastify";

export const handleApiError = (error: any, defaultMessage: string = "Erro inesperado.") => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || defaultMessage;

  if (status === 400 || status === 409) {
    toast.warn(message);
  } else if (status === 401 || status === 403) {
    toast.error(message || "Acesso negado.");
  } else {
    toast.error(message);
  }
};
