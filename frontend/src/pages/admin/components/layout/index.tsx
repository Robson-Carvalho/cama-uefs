import { Link, useNavigate, useLocation, Outlet } from "react-router";
import { Menu, LogOut, Home, Settings, Users, UserCog, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth/useAuth";

const AdminLayout = () => {
  const { logout, payload } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home className="w-5 h-5" /> },
    { name: "Colaboradores", path: "/admin/collaborators", icon: <Users className="w-5 h-5" /> },
    { name: "Revisões", path: "/admin/revisions", icon: <FileSignature className="w-5 h-5" /> },
    ...(payload?.admin?.role === "ADMIN" ? [{ name: "Instrutores", path: "/admin/instructors", icon: <UserCog className="w-5 h-5" /> }] : []),
    { name: "Configurações", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-neutral-50/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            💡
          </div>
          <span className="font-bold text-xl tracking-tight">CAMA/UEFS</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${location.pathname === item.path
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Topbar */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              💡
            </div>
            <span className="font-bold text-xl tracking-tight">Admin</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    💡
                  </div>
                  <span>Admin</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                      }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sair
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export { AdminLayout };
