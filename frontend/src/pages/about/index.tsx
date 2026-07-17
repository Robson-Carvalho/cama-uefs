import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookOpen, Map, Target, ExternalLink } from "lucide-react";


const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-6 lg:px-8 animate-fade-in-up">
        {/* Header Hero Section */}
        <div className="mb-12 text-center md:text-left border-b border-border/40 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-primary mb-4 tracking-tight">Sobre a Plataforma</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Conheça o CAMA UEFS, a plataforma oficial de estudos para a Olimpíada Brasileira de Informática, desenvolvida na Universidade Estadual de Feira de Santana.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-3">
            <Target className="text-primary h-8 w-8" />
            <h3 className="text-xl font-bold font-heading">O Objetivo</h3>
            <p className="text-muted-foreground">Preparar alunos do ensino médio e universitários para a OBI através do desenvolvimento prático do pensamento computacional.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-3">
            <BookOpen className="text-primary h-8 w-8" />
            <h3 className="text-xl font-bold font-heading">O Método</h3>
            <p className="text-muted-foreground">Acesso contínuo a materiais de estudo rigorosos, teorias explicadas passo a passo e resolução progressiva de desafios reais.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-3">
            <Map className="text-primary h-8 w-8" />
            <h3 className="text-xl font-bold font-heading">O Caminho</h3>
            <p className="text-muted-foreground">Acreditamos que qualquer pessoa pode aprender algoritmos com a metodologia certa e dedicação.</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12 mb-16 px-2">
          <section>
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4 tracking-tight">Nossa Missão</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              O <strong className="font-bold text-foreground">CAMA UEFS</strong> foi desenvolvido para democratizar o acesso ao treinamento para a Olimpíada Brasileira de Informática (OBI). A iniciativa surge da necessidade de oferecer um ambiente unificado e intuitivo, onde qualquer estudante possa encontrar materiais teóricos, dicas práticas e listas de exercícios direcionadas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold font-heading text-foreground mb-4 tracking-tight">Como funciona?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              O projeto é integrado ao programa de treinamento da Universidade Estadual de Feira de Santana (UEFS), apoiado pelo edital da PROEX. O foco do portal não é apenas preparar para a competição, mas também construir uma base sólida de raciocínio algorítmico que o acompanhará por toda a sua carreira em Computação.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-lg">
                <span className="text-primary font-bold mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Aulas e Estruturas:</strong> Explicações didáticas desde Lógica Básica até Grafos e Programação Dinâmica.
                </p>
              </li>
              <li className="flex items-start gap-3 text-lg">
                <span className="text-primary font-bold mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Questões Focadas:</strong> Problemas retirados diretamente das edições anteriores da OBI.
                </p>
              </li>
              <li className="flex items-start gap-3 text-lg">
                <span className="text-primary font-bold mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Dicas de Competição:</strong> Dicas de C/C++, otimização de tempo e estratégias de prova.
                </p>
              </li>
            </ul>
          </section>
        </div>

        {/* Credits */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-heading text-foreground tracking-tight">Equipe do Projeto</h2>
            <p className="text-muted-foreground mt-2">Conheça as pessoas por trás do desenvolvimento do CAMA UEFS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: "Coordenadora do Projeto",
                name: "Profª Pâmela M. C. Cortez",
                link: "https://www.linkedin.com/in/pcandida/",
                linkText: "LinkedIn"
              },
              {
                role: "Orientador",
                name: "Prof. Matheus G. Pires",
                link: "https://sites.google.com/ecomp.uefs.br/mgpires?authuser=1",
                linkText: "Página Institucional"
              },
              {
                role: "Bolsista",
                name: "Robson C. de Souza",
                link: "https://www.linkedin.com/in/robson-carvalho-souza/",
                linkText: "LinkedIn"
              }
            ].map((member, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase font-heading">
                  {member.name.charAt(member.name.indexOf(" ") + 1) === 'M' || member.name.charAt(member.name.indexOf(" ") + 1) === 'G'
                    ? member.name.split(" ")[1].charAt(0)
                    : member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{member.role}</p>
                  <h4 className="text-lg font-bold font-heading text-foreground">{member.name}</h4>
                </div>
                <a
                  href={member.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="underline underline-offset-4">{member.linkText}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { About };
