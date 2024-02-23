/* eslint-disable react-hooks/exhaustive-deps */
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();

  return <SidebarProvider>{children}</SidebarProvider>;
};
