import { Header } from "@/components/header";
import { MarkdownRenderer } from "@/components/markdownRenderer";
import { BodyLayout } from "@/layouts/BodyLayout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

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
        {content === "" ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
          </div>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </BodyLayout>
    </>
  );
};

export { Content };
