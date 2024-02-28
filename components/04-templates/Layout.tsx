/* eslint-disable react-hooks/exhaustive-deps */
import { SidebarProvider } from "@/lib/client/contexts/SidebarContext.tsx";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useConnectedChain } from "@/lib/client/hooks/useConnectedChain";
import { sepolia, useSwitchNetwork } from "wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();
  const { isNetworkSupported } = useConnectedChain();

  const { switchNetwork } = useSwitchNetwork();

  const changeChain = async () => {
    try {
      switchNetwork && (await switchNetwork(sepolia.id));
    } catch (switchError) {
      console.error("Error switching network:", switchError);
    }
  };

  return (
    <SidebarProvider>
      {!isNetworkSupported && (
        <div className="absolute backdrop-blur-sm left-0 z-50 top-0 w-screen h-screen flex items-center justify-center">
          <div className="p-10 flex flex-col gap-6 items-center justify-center bg-[#353836] rounded-md">
            <h3>Unsupported chain</h3>
            <button className="bg-black py-4 px-8 hover:bg-[#353836] rounded-md" disabled={!switchNetwork} onClick={changeChain}>
              Change Chain
            </button>
          </div>
        </div>
      )}
      {children}
    </SidebarProvider>
  );
};
