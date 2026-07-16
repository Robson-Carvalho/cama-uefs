import { Link } from "react-router";
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

const Header = () => {
  return (
    <header className="max-w-full flex flex-row items-center h-16 py-3 px-4 sm:px-6 md:px-8 shadow-sm p-4 rounded-md">
      <nav className="max-w-[1536px] w-full mx-auto flex flex-row justify-between">
        <Link id="logo" to="/" className="min-w-0 shrink flex items-center">
          <span className="font-emoji text-xl">💡</span>

          <p className="text-pretty line-clamp-3 tracking-tight max-w-[18ch] lg:max-w-[24ch] font-semibold ms-3 text-base/tight lg:text-lg/tight text-dark dark:text-light">
            CAMA / UEFS
          </p>
        </Link>

        <Menu className="lg:hidden" />
      </nav>
    </header>
  );
};

const Menu = ({ className }: { className: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={className}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <Button variant="outline">Menu</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navegação</DrawerTitle>
            <DrawerDescription>
              Selecione o conteúdo desejado.
            </DrawerDescription>

            <ScrollArea className="h-[400px] w-full py-4">
              <Navigation onClose={() => setOpen(false)} />
            </ScrollArea>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export { Header };
