import { Header } from "@/components/header";
import { MarkdownRenderer } from "@/components/markdownRenderer";
import { BodyLayout } from "@/layouts/Body";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "@/services/api";

const Content = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const getContent = async () => {
      try {
        const { data } = await api.get(`/topic${location.pathname}`);
        setContent(data.content);
      } catch (err: any) {
        console.log(err);

        if (err.status === 404) {
          navigate("/404");
        }
      }
    };

    getContent();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <BodyLayout>
        <MarkdownRenderer content={content} />
      </BodyLayout>
    </>
  );
};

export { Content };
