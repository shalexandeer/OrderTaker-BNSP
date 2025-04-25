import { useEffect } from "react";
import useAuthStore from "@/lib/store/useAuthStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const user = useAuthStore.useUser();
  
  useEffect(() => {
    // Apply role-based theme to the HTML element
    if (user?.role === "superadmin") {
      document.documentElement.setAttribute("data-role", "superadmin");
    } else {
      // Remove the attribute for other roles (petugas-tps)
      document.documentElement.removeAttribute("data-role");
    }

    // Cleanup function
    return () => {
      document.documentElement.removeAttribute("data-role");
    };
  }, [user?.role]);

  return <>{children}</>;
}

export default ThemeProvider;