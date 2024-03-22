import { WarningScreenSizeNotSupported } from "@/components/01-atoms/";
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useSupportedNetworks } from "@/lib/client/hooks/useSupportedNetworks";
import { useEffect } from "react";
import { sepolia, useSwitchNetwork } from "wagmi";
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
      <div className={cc(["lg:block hidden"])}>
        <SidebarProvider>
          <meta
            content="initial-scale=1.0, width=device-width"
            name="viewport"
          ></meta>
          {children}
        </SidebarProvider>
      </div>
      <div className="lg:hidden flex justify-center items-center">
        <WarningScreenSizeNotSupported />
      </div>
    </>
  );
};
