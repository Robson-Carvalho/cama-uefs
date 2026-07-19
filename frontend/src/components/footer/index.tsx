import { Link } from "react-router";
import { ExternalLink } from "lucide-react";

import uefsLogo from "@/assets/images/Brasão_da_UEFS.png";
import proexLogo from "@/assets/images/logo_PROEX_positiva.png";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8 relative z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 pb-6 border-b border-border/30">
          
          <div className="flex items-center justify-center md:justify-start gap-6">
            {/* Logo UEFS */}
            <a 
              href="https://www.uefs.br/#" 
              target="_blank" 
              rel="noreferrer"
              className="group block"
            >
              <img src={uefsLogo} alt="Brasão da UEFS" className="h-11 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm opacity-90 group-hover:opacity-100" />
            </a>
            
            <div className="h-8 w-px bg-border/60"></div>
            
            {/* Logo PROEX */}
            <a 
              href="http://proex.uefs.br/" 
              target="_blank" 
              rel="noreferrer"
              className="group block"
            >
              <img src={proexLogo} alt="Logo PROEX" className="h-11 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm opacity-90 group-hover:opacity-100" />
            </a>
          </div>

          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link
              to="https://www.linkedin.com/in/robson-carvalho-souza/"
              target="_blank"
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full"
            >
              <ExternalLink size={14} />
              Desenvolvido por Robson
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="font-emoji text-sm opacity-80">💡</span>
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} CAMA UEFS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
