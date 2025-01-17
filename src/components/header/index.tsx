import { Link } from "react-router";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Linkedin } from "lucide-react";

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

        <div className="lg:hidden">
          <Menu />
        </div>
      </nav>
    </header>
  );
};

const Menu = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <p className="rounded-md border px-4 py-2 block lg:hidden text-pretty line-clamp-3 tracking-tight max-w-[18ch] font-normal ms-3 text-base/tight lg:text-lg/tight text-dark dark:text-light">
          Menu
        </p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navegação</DrawerTitle>
          <DrawerDescription>Selecione o conteúdo desejado.</DrawerDescription>

          <ScrollArea className="h-[400px]  w-full py-4">
            <div className="flex flex-col items-start"></div>
          </ScrollArea>
        </DrawerHeader>

        <DrawerFooter>
          <Button variant="outline">
            <Link
              to="https://www.linkedin.com/in/robson-carvalho-souza/"
              target="_blank"
              className="flex flex-row gap-2 justify-center"
            >
              <Linkedin />
              Developed by Robson Carvalho.
            </Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Header };
