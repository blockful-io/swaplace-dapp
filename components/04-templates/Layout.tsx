/* eslint-disable react-hooks/exhaustive-deps */
import { SwapContext } from "../01-atoms";
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useSupportedNetworks } from "@/lib/client/hooks/useSupportedNetworks";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { sepolia, useSwitchNetwork } from "wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isNetworkSupported } = useSupportedNetworks();
  const { switchNetwork } = useSwitchNetwork();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { clearAllData } = useContext(SwapContext);

  useEffect(() => {
    if (authenticatedUserAddress && !isNetworkSupported) {
      toast.error("Network not supported, change network and try again", {
        duration: 5000,
        id: "network-toast",
      });
      clearAllData();
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
