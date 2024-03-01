/* eslint-disable react-hooks/exhaustive-deps */
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useSupportedNetworks } from "@/lib/client/hooks/useSupportedNetworks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { sepolia, useSwitchNetwork } from "wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();
  const { isNetworkSupported } = useSupportedNetworks();
  const { switchNetwork } = useSwitchNetwork();
  const { authenticatedUserAddress } = useAuthenticatedUser();

  useEffect(() => {
    if (authenticatedUserAddress && !isNetworkSupported) {
      toast.error("Network not supported, change network and try again", {
        duration: 5000,
        id: "network-toast",
      });
      switchNetwork && switchNetwork(sepolia.id);
    }
  }, [authenticatedUserAddress, isNetworkSupported]);

  return (
    <SidebarProvider>
      <meta
        content="initial-scale=1.0, width=device-width"
        name="viewport"
      ></meta>
      {children}
    </SidebarProvider>
  );
};
