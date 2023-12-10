import { Listbox, Transition } from "@headlessui/react";
import { useContext } from "react";
import { SwapContext } from ".";
import { SupportedNetworks } from "@/lib/client/constants";

export const SelectDestinyChain = () => {
  const { destinyChain, setDestinyChain } = useContext(SwapContext);

  return (
    <Listbox value={destinyChain} onChange={setDestinyChain}>
      {({ open }) => (
        <>
          <Listbox.Button>{destinyChain}</Listbox.Button>
          {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/*
              Don't forget to add `static` to your `Listbox.Options`!
            */}
            <Listbox.Options static>
              {Object.keys(SupportedNetworks).map((chain) => (
                <Listbox.Option key={chain} value={chain}>
                  {chain}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};
