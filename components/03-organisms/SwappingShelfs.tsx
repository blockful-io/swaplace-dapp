/* eslint-disable react-hooks/exhaustive-deps */
import { NftsShelf } from "@/components/03-organisms";
import {
  SwapContext,
  SwappingShelfID,
  SearchItemsShelf,
  Tab,
} from "@/components/01-atoms/";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import cc from "classcat";

/**
 * SwappingShelfs Component
 *
 * React component that display of nfts swapping shelves.
 *
 * @return The rendered SwappingShelfs component.
 */
export const SwappingShelfs = () => {
  const { chain } = useNetwork();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [activeSwappingShelfID, setActiveSwappingShelfID] =
    useState<SwappingShelfID>(SwappingShelfID.THEIR_ITEMS);

  const {
    validatedAddressToSwap,
    setNftAuthUser,
    setNftInputUser,
    setInputAddress,
  } = useContext(SwapContext);

  useEffect(() => {
    setNftAuthUser([]);
    setNftInputUser([]);
    setInputAddress("");
  }, [chain]);

  return (
    <div className="w-full h-full dark:bg-[#212322] dark:border-[#353836] border rounded-2xl dark:shadow-swap-station">
      <div className="flex items-center justify-between max-h-[48px] border-b dark:border-[#313131] pr-2">
        <div className="flex max-w-[224px]">
          <Tab
            setActiveSwappingShelfID={(input) =>
              setActiveSwappingShelfID(input)
            }
          />
        </div>
        <div>
          <SearchItemsShelf />
        </div>
      </div>
      <div className="p-5">
        <div className={cc([activeSwappingShelfID ? "hidden" : "block"])}>
          <NftsShelf address={validatedAddressToSwap} variant="their" />
        </div>
        <div className={cc([activeSwappingShelfID ? "block" : "hidden"])}>
          <NftsShelf
            address={authenticatedUserAddress?.address ?? null}
            variant="your"
          />
        </div>
      </div>
    </div>
  );
};
