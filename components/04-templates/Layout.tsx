/* eslint-disable react-hooks/exhaustive-deps */
import { MobileNotSupported } from "@/components/01-atoms/";
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useSupportedNetworks } from "@/lib/client/hooks/useSupportedNetworks";
import { sepolia, useSwitchNetwork } from "wagmi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import cc from "classcat";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
    <>
      <div className={cc(["md:block hidden"])}>
        <SidebarProvider>
          <meta
            content="initial-scale=1.0, width=device-width"
            name="viewport"
          ></meta>
          {children}
        </SidebarProvider>
      </div>
      <div className="md:hidden flex justify-center items-center">
        <MobileNotSupported />
      </div>
    </>
  );
};
