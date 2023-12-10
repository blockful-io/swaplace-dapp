import { Dialog, Transition } from "@headlessui/react";
import { useContext, useState } from "react";
import { EthereumIcon, PolygonIcon, SwapContext } from ".";
import { ChainInfo, SupportedNetworks } from "@/lib/client/constants";
import cc from "classcat";

export const SelectDestinyChain = () => {
  const { destinyChain, setDestinyChain } = useContext(SwapContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleChainSelection = (value: SupportedNetworks) => {
    setDestinyChain(value);

    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#e8e8e8] shadow-md border-2 border-[#e8e8e8] hover:bg-[#f8f8f8] rounded px-4 transition flex items-center space-x-2"
      >
        {destinyChain === SupportedNetworks.SEPOLIA ? (
          <EthereumIcon width={12} height={12} />
        ) : (
          <PolygonIcon width={12} height={12} />
        )}
        <p>{ChainInfo[destinyChain].name}</p>
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay
          className={
            "w-screen h-screen bg-black opacity-20 blur fixed top-0 left-0 z-40"
          }
        />
        <Transition
          show={isOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="fixed left-1/2 top-1/2 z-50 bg-[#1A1B1F] -translate-x-1/2 -translate-y-1/2 rounded-lg"
        >
          <Dialog.Panel className={"p-6 flex flex-col"}>
            {Object.keys(SupportedNetworks).map((chain) => (
              <button
                key={chain}
                value={chain}
                className={cc([
                  "text-white font-bold text-base p-1 py-2 px-3 flex items-center w-[300px] justify-between rounded",
                  {
                    "bg-gray-700 brightness-125 bg-opacity-70":
                      destinyChain === chain,
                  },
                ])}
                onClick={() => handleChainSelection(chain as SupportedNetworks)}
              >
                <div className="flex space-x-2 items-center">
                  {chain === SupportedNetworks.SEPOLIA ? (
                    <EthereumIcon width={24} height={24} />
                  ) : (
                    <PolygonIcon width={24} height={24} />
                  )}
                  <p>{ChainInfo[chain as SupportedNetworks].name}</p>
                </div>
                {destinyChain === chain && (
                  <div className="flex space-x-2 items-center">
                    <p className="text-sm font-medium">Connected</p>
                    <span className="w-2 h-2 bg-[rgb(48,224,0)] rounded-full"></span>
                  </div>
                )}
              </button>
            ))}
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </>
  );
};
