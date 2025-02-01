import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { IClass } from "@/interfaces/IClass";
import { Classes } from "../components/classes";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [classes, setClasses] = useState<IClass[] | []>([] as IClass[]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      try {
        const response = await api.get("/class");
        const { data } = response;
        setClasses(data);
      } catch (error) {
        toast.warning("Erro inesperado.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex flex-col gap-4 max-w-[1536px] w-full mx-auto py-3 px-4 sm:px-6 md:px-8 p-4">
        <section className="mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">Aulas</h2>

            <Button variant="default">Criar</Button>
          </div>
        </section>

        <section>
          {loading ? (
            <>
              <div className="flex flex-col gap-4">
                <Skeleton className="h-12 w-max-[1440px]" />
                <Skeleton className="h-24 w-max-[1440px]" />
                <Skeleton className="h-24 w-max-[1440px]" />
                <Skeleton className="h-24 w-max-[1440px]" />
                <Skeleton className="h-24 w-max-[1440px]" />
              </div>
            </>
          ) : (
            <>
              {classes ? <Classes classes={classes} /> : <p>Não há conteúdo</p>}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export { AdminDashboard };
