import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BodyLayout } from "@/layouts/BodyLayout";
import { BookOpen } from "lucide-react";

const Estudos = () => {
  return (
    <>
      <Header />
      <BodyLayout>
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[50vh] opacity-80 animate-fade-in-up">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <BookOpen className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold font-heading mb-3">Bem-vindo à Plataforma</h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Selecione uma aula ou conteúdo no menu lateral para começar o seu treinamento.
          </p>
        </div>
      </BodyLayout>
      <Footer />
    </>
  );
};

export { Estudos };
