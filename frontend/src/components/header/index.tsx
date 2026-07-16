import { Link, useLocation } from "react-router";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navigation } from "../navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu as MenuIcon, UserCog } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-screen-2xl w-full mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <Link id="logo" to="/" className="min-w-0 shrink-0 flex items-center gap-2 group transition-all duration-300">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-white shadow-md shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all">
              <span className="font-emoji text-lg animate-fade-in">💡</span>
            </div>
            <div className="flex flex-col ml-1">
              <p className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                CAMA UEFS
              </p>
            </div>
          </Link>
        </div>

        {/* Right Side - Actions & Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/estudos" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/estudos' ? 'text-foreground' : 'text-muted-foreground'}`}>Plataforma</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-foreground' : 'text-muted-foreground'}`}>Sobre o Projeto</Link>
          </div>

          <Button asChild variant="default" size="sm" className="hidden md:flex gap-2 rounded-full px-5 shadow-sm">
            <Link to="/admin/login">
              <UserCog size={16} />
              Área do Instrutor
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Menu className="md:hidden" />
        </div>

      </nav>
    </header>
  );
};

const Menu = ({ className }: { className: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div className={className}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="font-heading">Navegação</DrawerTitle>
            <DrawerDescription>
              Selecione para onde deseja ir ou escolha uma aula abaixo.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[65vh] w-full px-4 pb-4">
            
            {/* Global Links for Mobile */}
            <div className="flex flex-col gap-3 py-4 border-b border-border/40 mb-4">
              <Link onClick={() => setOpen(false)} to="/estudos" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/estudos' ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted'}`}>
                <span className="text-base">Plataforma de Estudos</span>
              </Link>
              <Link onClick={() => setOpen(false)} to="/about" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/about' ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted'}`}>
                <span className="text-base">Sobre o Projeto</span>
              </Link>
              <Link onClick={() => setOpen(false)} to="/admin/login" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/admin/login' ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted'}`}>
                <UserCog size={18} />
                <span className="text-base">Área do Instrutor</span>
              </Link>
            </div>

            {/* Sidebar Lessons */}
            <div className="px-1">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Conteúdo OBI</h4>
              <Navigation onClose={() => setOpen(false)} />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export { Header };
