import { Link } from "react-router";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8 relative z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="font-emoji text-xl opacity-80">💡</span>
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} CAMA UEFS. Todos os direitos reservados.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            to="https://www.linkedin.com/in/robson-carvalho-souza/"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            Desenvolvido por Robson Carvalho
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
