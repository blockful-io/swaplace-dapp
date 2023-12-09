import { ChainInfo, SupportedNetworks } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useWalletClient } from "wagmi";
import { CheckmarkIcon } from "react-hot-toast";
import { capitalizeFirstLetter } from "@/lib/client/utils";
import cc from "classcat";

export const SelectChain = () => {
  const { setPreferredChainId, preferredChainId } = useAuthenticatedUser();
  const { data: walletClient } = useWalletClient();

  const fetchSwitchChain = async () => {
    if (walletClient)
      await walletClient.switchChain({ id: ChainInfo[preferredChainId].id });
  };

  useEffect(() => {
    fetchSwitchChain();
  }, [preferredChainId]);

  return (
    <div className="relative">
      <Listbox
        value={preferredChainId}
        onChange={(newChain) => setPreferredChainId(newChain)}
      >
        <Listbox.Button className="font-medium text-lg rounded px-4 bg-[#e8e8e8] shadow-md border-2 border-[#e8e8e8] hover:bg-[#f8f8f8] transition">
          {capitalizeFirstLetter(SupportedNetworks[preferredChainId])}
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 top-full rounded overflow-hidden">
          <>
            {Object.keys(ChainInfo).map((chain) => (
              <Listbox.Option
                key={ChainInfo[chain as SupportedNetworks].id}
                value={chain}
              >
                {({ active, selected }) => (
                  <div
                    className={cc([
                      "flex items-center space-x-3 p-4 py-2 cursor-pointer transition",
                      active ? "bg-gray-700 text-white" : "bg-white text-black",
                    ])}
                  >
                    <p>{chain}</p>
                    {selected && <CheckmarkIcon />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </>
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
