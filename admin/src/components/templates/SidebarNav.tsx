import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  Users,
  Recycle,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Table,
  ForkKnifeIcon,
  ListCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store/useAuthStore";

interface SidebarNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

export function SidebarNav({ open, setOpen, isMobile }: SidebarNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Pesanan",
      href: "/orders",
      icon: ListCheckIcon,
    },
    {
      title: "Manajemen Makanan",
      href: "/food-management/foods",
      icon: ForkKnifeIcon,
    },
    {
      title: "Manajemen Meja",
      href: "/meja",
      icon: Table,
    },
  ];

  // Track opened submenu
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Set initial open submenu based on current location
  useEffect(() => {
    const currentItem = navItems.find((item) =>
      item.submenu?.some(
        (subitem) =>
          location.pathname === subitem.href ||
          (location.pathname.startsWith(subitem.href) && subitem.href !== "/")
      )
    );

    if (currentItem) {
      setOpenSubmenu(currentItem.title);
    }
  }, [location.pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const { logout } = useAuthStore();

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
    {
      "translate-x-0": open,
      "-translate-x-full": !open && isMobile,
      "w-[80px]": !open && !isMobile,
    }
  );

  const overlayClasses = cn(
    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
    {
      "opacity-100 pointer-events-auto": open && isMobile,
      "opacity-0 pointer-events-none": !open || !isMobile,
    }
  );

  // Function to check if a specific submenu item is active
  const isSubmenuItemActive = (href: string) => {
    return (
      location.pathname === href ||
      (href !== "/" && location.pathname.startsWith(href + "/"))
    );
  };

  // Function to check if any submenu item in a parent menu is active
  const hasActiveSubmenuItem = (
    submenu: { title: string; href: string }[] | undefined
  ) => {
    if (!submenu) return false;
    return submenu.some((subitem) => isSubmenuItemActive(subitem.href));
  };

  return (
    <>
      <div className={overlayClasses} onClick={() => setOpen(false)} />

      <aside className={sidebarClasses}>
        <div className="p-6 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            {(open || !isMobile) && (
              <span className="font-display font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">
                Order Taker Admin
              </span>
            )}
          </div>

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="text-muted-foreground hover:text-foreground"
            >
              {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          )}
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              // Parent menu is active if it has no submenu and its path matches
              // or if it has a submenu and any submenu item is active
              const isActive = item.submenu
                ? hasActiveSubmenuItem(item.submenu)
                : isSubmenuItemActive(item.href);

              const isSubmenuOpen = openSubmenu === item.title;

              return (
                <div key={item.title}>
                  {item.submenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn("nav-link w-full text-left", {
                        active: isActive,
                        "justify-center": !open && !isMobile,
                      })}
                    >
                      <item.icon className="h-5 w-5" />
                      {(open || !isMobile) && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          <ChevronRight
                            className={cn("h-4 w-4 transition-transform", {
                              "rotate-90": isSubmenuOpen,
                            })}
                          />
                        </>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn("nav-link", {
                          active: isActive,
                          "justify-center": !open && !isMobile,
                        })
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {(open || !isMobile) && <span>{item.title}</span>}
                    </NavLink>
                  )}

                  {item.submenu && isSubmenuOpen && (open || !isMobile) && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <NavLink
                          key={subitem.title}
                          to={subitem.href}
                          className={({ isActive }) =>
                            cn(
                              "block py-2 px-3 text-sm rounded-md transition-colors",
                              isActive && subitem.href === location.pathname
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            )
                          }
                        >
                          {subitem.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          <button
            onClick={() => {
              navigate("/login");
              logout();
              localStorage.removeItem("access_token");
            }}
            className="nav-link w-full text-left text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />

            {(open || !isMobile) && <span>Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
