/* eslint-disable react-hooks/exhaustive-deps */
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useConnectedChain } from "@/lib/client/hooks/useConnectedChain";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();
  useConnectedChain();

  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
};
