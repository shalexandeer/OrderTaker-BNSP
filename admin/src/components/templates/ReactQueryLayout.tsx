import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { storageKeys } from "@/services/auth/keys";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

interface ReactQueryLayoutProps {
  children: ReactNode;
}

const ReactQueryLayout: React.FC<ReactQueryLayoutProps> = ({ children }) => {
  // This effect will run once when the component mounts
  React.useEffect(() => {
    // Check if we have a refresh token
    const accessToken = localStorage.getItem(storageKeys.accessToken);

    if (accessToken) {
      try {
        // Check if the token is expired or will expire soon
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Your global layout components like header, navigation, footer, etc. */}
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryLayout;
