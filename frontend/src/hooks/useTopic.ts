import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "@/services/api";

export const useTopic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [author, setAuthor] = useState<{ name: string; email: string } | null>(null);
  const [coAuthors, setCoAuthors] = useState<{ name: string; email: string }[]>([]);

  useEffect(() => {
    setLoading(true);

    const getContent = async () => {
      try {
        const { data } = await api.get(`/topic${location.pathname}`);
        setContent(data.content);
        setViews(data.views || 0);
        setLikesCount(data.likes || 0);
        setAuthor(data.author || null);
        setCoAuthors(data.coAuthors || []);

        const likedTopics = JSON.parse(localStorage.getItem("@CAMA_UEFS:liked_topics") || "[]");
        setLiked(likedTopics.includes(location.pathname));
      } catch (err: any) {
        console.log(err);
        if (err.status === 404) {
          navigate("/404");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [location.pathname, navigate]);

  const handleLike = async () => {
    const isLiking = !liked;
    const likedTopics = JSON.parse(localStorage.getItem("@CAMA_UEFS:liked_topics") || "[]");
    
    setLiked(isLiking);
    setLikesCount(prev => isLiking ? prev + 1 : prev - 1);

    if (isLiking) {
      localStorage.setItem("@CAMA_UEFS:liked_topics", JSON.stringify([...likedTopics, location.pathname]));
    } else {
      localStorage.setItem("@CAMA_UEFS:liked_topics", JSON.stringify(likedTopics.filter((path: string) => path !== location.pathname)));
    }

    try {
      if (isLiking) {
        await api.post(`/topic${location.pathname}/like`);
      } else {
        await api.post(`/topic${location.pathname}/unlike`);
      }
    } catch (err) {
      // Revert in case of error
      setLiked(!isLiking);
      setLikesCount(prev => isLiking ? prev - 1 : prev + 1);
      
      if (isLiking) {
        localStorage.setItem("@CAMA_UEFS:liked_topics", JSON.stringify(likedTopics.filter((path: string) => path !== location.pathname)));
      } else {
        localStorage.setItem("@CAMA_UEFS:liked_topics", JSON.stringify([...likedTopics, location.pathname]));
      }

      toast.error(`Erro ao registrar ${isLiking ? 'curtida' : 'remoção da curtida'}.`);
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CAMA UEFS',
          text: 'Dá uma olhada nesta aula do CAMA UEFS!',
          url: url,
        });
      } catch (err) {
        // AbortError acontece quando o usuário fecha a aba de compartilhar sem concluir
        if ((err as Error).name !== 'AbortError') {
          // Fallback silencioso para cópia em caso de erro no Web Share API
          navigator.clipboard.writeText(url);
          toast.success("Link copiado para a área de transferência!");
        }
      }
    } else {
      // Fallback para computadores ou navegadores antigos
      navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  return {
    content,
    loading,
    liked,
    likesCount,
    views,
    author,
    coAuthors,
    handleLike,
    handleCopyLink,
  };
};
