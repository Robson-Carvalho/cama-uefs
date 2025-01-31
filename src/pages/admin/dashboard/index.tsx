import { useAuth } from "@/contexts/auth/useAuth";
import { Header } from "../components/header";

const AdminDashboard = () => {
  const { payload } = useAuth();
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className=" flex flex-col gap-12 max-w-[1536px] w-full mx-auto py-3 px-4 sm:px-6 md:px-8 p-4">
        <section>
          <h2 className="text-2xl font-semibold">
            Olá, {payload?.admin.name.split(" ")[0]}! Bem-vindo ao Painel
            Administrativo da CAMA UEFS.
          </h2>
        </section>

        <section className="">classes</section>
      </main>
    </div>
  );
};

export { AdminDashboard };
