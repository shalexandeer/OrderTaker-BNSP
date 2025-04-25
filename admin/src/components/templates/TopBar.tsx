import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Menu, Sun, Moon, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store/useAuthStore";
import { useLogout } from "@/services/auth/mutations";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [pageTitle, setPageTitle] = useState("");

  // Get user and logout function from auth store
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  const logoutMutation = useLogout();

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  // Handle logout
  const handleLogout = () => {
    // logout();
    logoutMutation();
    // Navigate to login page will be handled by auth protection
  };

  // Set the theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);

    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Set page title based on route
  useEffect(() => {
    const path = location.pathname;

    if (path === "/dashboard") {
      setPageTitle("Dashboard");
    } else if (path.startsWith("/orders")) {
      if (path === "/transactions/new") {
        setPageTitle("Tambah Transaksi");
      } else {
        setPageTitle("Pesanan");
      }
    } else if (path.startsWith("/records")) {
      if (path === "/records/incoming") {
        setPageTitle("Pencatatan Sampah Masuk");
      } else if (path === "/records/outgoing") {
        setPageTitle("Pencatatan Sampah Keluar");
      } else if (path === "/records/processed") {
        setPageTitle("Pencatatan Sampah Diproses");
      } else {
        setPageTitle("Pencatatan");
      }
    } else if (path.startsWith("/meja")) {
      setPageTitle("Manajemen Meja");
    } else {
      setPageTitle("Dashboard");
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="font-display font-medium text-xl">{pageTitle}</div>

      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleLogout}
            >
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
}
