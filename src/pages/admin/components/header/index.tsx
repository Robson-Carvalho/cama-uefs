import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth/useAuth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Sair</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Logout</DialogTitle>
          <DialogDescription>Tem certeza de que deseja sair?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="mt-6 w-full flex justify-center">
            <Button
              variant="destructive"
              className="flex-grow"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  return (
    <>
      <header className="max-w-full flex flex-row items-center h-16 py-3 px-4 sm:px-6 md:px-8 shadow-sm p-4 rounded-md">
        <nav className="max-w-[1536px] w-full mx-auto flex flex-row justify-between">
          <Link to="/admin" className="min-w-0 shrink flex items-center">
            <span className="font-emoji text-xl">💡</span>
            <p className="text-pretty line-clamp-3 tracking-tight max-w-[18ch] lg:max-w-[24ch] font-semibold ms-3 text-base/tight lg:text-lg/tight text-dark dark:text-light">
              Dashboard
            </p>
          </Link>

          <ul
            id="menu"
            className="hidden md:flex flex-row gap-8 justify-center items-center"
          >
            <Link
              to="/admin"
              className="cursor-pointer transition-colors flex flex-row justify-between p-1.5 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none hover:bg-[#F6F6F6]"
            >
              Home
            </Link>

            <Link
              to="/admin/settings"
              className="cursor-pointer transition-colors flex flex-row justify-between p-1.5 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none hover:bg-[#F6F6F6]"
            >
              Configurações
            </Link>

            <li>
              <Logout />
            </li>
          </ul>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navegação</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link
                    to="/admin"
                    className="cursor-pointer transition-colors flex flex-row justify-between p-1.5 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none hover:bg-[#F6F6F6]"
                  >
                    Home
                  </Link>

                  <Link
                    to="/admin/settings"
                    className="cursor-pointer transition-colors flex flex-row justify-between p-1.5 rounded-md straight-corners:rounded-none text-sm font-normal text-balance text-dark/8 hover:text-dark/9 hover:bg-dark/1 hover:before:bg-dark/3 dark:text-light/8 dark:hover:text-light/9 dark:hover:bg-light/1 dark:hover:before:bg-light/3 contrast-more:text-dark contrast-more:dark:text-light hover:contrast-more:text-dark dark:hover:contrast-more:text-light hover:contrast-more:ring-1 hover:contrast-more:ring-dark dark:contrast-more:hover:ring-light before:contents[] before:absolute before:inset-y-0 before:-left-px [&+div_a]:pl-5 sidebar-list-line:before:w-px sidebar-list-default:[&+div_a]:before:w-px sidebar-list-default:[&+div_a]:rounded-l-none sidebar-list-line:rounded-l-none hover:bg-[#F6F6F6]"
                  >
                    Configurações
                  </Link>

                  <Logout />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
};

export { Header };
