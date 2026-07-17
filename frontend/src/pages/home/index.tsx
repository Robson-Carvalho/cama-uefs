import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, Code2 } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 w-full max-w-7xl mx-auto py-20 lg:py-32">
        <div className="text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60 tracking-tight max-w-4xl mx-auto leading-tight">
            Domine Algoritmos para a <br className="hidden md:block" /> <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-500">Olimpíada Brasileira de Informática</span>.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Desenvolva o seu raciocínio lógico e habilidades em programação com o treinamento oficial do CAMA - Universidade Estadual de Feira de Santana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all gap-2">
              <Link to="/estudos">
                <BookOpen size={20} />
                Acessar Plataforma
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted transition-all gap-2">
              <Link to="/admin/login">
                <LogIn size={20} />
                Área do Instrutor
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { title: "Estruturas de Dados", desc: "Aprenda Grafos, Árvores, Filas e Pilhas com material focado." },
            { title: "Resolução de Problemas", desc: "Treine lógica com questões extraídas de provas passadas." },
            { title: "C & C++", desc: "Aprofunde-se nas linguagens oficiais e mais rápidas da competição." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { Home };
