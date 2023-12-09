import { ChainID, SupportedNetworks } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useWalletClient } from "wagmi";
import { CheckmarkIcon } from "react-hot-toast";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export const SelectChain = () => {
  const { setPreferredChainId, preferredChainId } = useAuthenticatedUser();
  const { data: walletClient } = useWalletClient();

  const fetchSwitchChain = async () => {
    await walletClient?.switchChain({ id: ChainID[preferredChainId] });
  };

  useEffect(() => {
    fetchSwitchChain();
  }, [preferredChainId]);

  return (
    <Listbox
      value={preferredChainId}
      onChange={(newChain) => setPreferredChainId(newChain)}
    >
      <Listbox.Button className="px-4 py-2">
        {SupportedNetworks[preferredChainId]}
      </Listbox.Button>
      <Listbox.Options>
        <>
          {Object.keys(ChainID).map((chain) => (
            <Listbox.Option
              key={ChainID[chain as SupportedNetworks]}
              value={ChainID[chain as SupportedNetworks]}
            >
              {({ active, selected }) => (
                <div
                  className={`${
                    active ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {selected && <CheckmarkIcon />}
                  {chain}
                </div>
              )}
            </Listbox.Option>
          ))}
        </>
      </Listbox.Options>
    </Listbox>
  );
};
