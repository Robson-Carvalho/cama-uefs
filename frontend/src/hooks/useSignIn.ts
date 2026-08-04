import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/auth/useAuth";

export const useSignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { authenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/admin");
    }
  }, [authenticated, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.warning("E-mail não informado.");
      return;
    }

    if (!password) {
      toast.warning("Senha não informada.");
      return;
    }

    setLoading(true);

    try {
      const status = (await login(email, password)) as number;

      if (status === 200) {
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    loading,
    showPassword, setShowPassword,
    handleLogin
  };
};
