import { useParams } from "react-router";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { IClass } from "@/interfaces/IClass";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ITopic } from "@/interfaces/ITopic";
import { Topics } from "../components/topics";

const Class = () => {
  const { id } = useParams();
  const [_class, setClass] = useState<IClass | null>(null);
  const [topics, setTopics] = useState<ITopic[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const getContent = async () => {
      try {
        const res = await api.get(`/class/${id}`);
        const _res = await api.get(`/topic/class/${id}`);

        console.log(_res.data);

        setClass(res.data);
        setTopics(_res.data);
      } catch (error: any) {
        if (error.status === 404) {
          toast.warning("Aula não encontrada");
        }

        if (error.status === 500) {
          toast.error("Erro interno.");
        }
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex flex-col gap-4 max-w-[1536px] w-full mx-auto py-3 px-4 sm:px-6 md:px-8 p-4">
        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
            <Skeleton className="h-24 w-max-[1440px]" />
          </div>
        ) : (
          <>
            {_class ? (
              <>
                <section>
                  <div className="mt-8 flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-semibold">{_class.title}</h2>

                    <Button variant="default">Criar</Button>
                  </div>
                </section>

                <section>
                  {topics && (
                    <div className="">
                      <Topics topics={topics} />
                    </div>
                  )}

                  {!topics && (
                    <div className="mt-8 flex flex-row justify-center items-center">
                      <p>Não há tópicos.</p>
                    </div>
                  )}
                </section>
              </>
            ) : (
              <div className="mt-8 flex flex-row justify-center items-center">
                <p>Aula não encontrada.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export { Class };
