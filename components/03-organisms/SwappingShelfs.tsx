/* eslint-disable react-hooks/exhaustive-deps */
import { NftsShelf } from "@/components/03-organisms";
import { SwapContext, SwappingShelfID, Tab } from "@/components/01-atoms/";
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
    setAuthenticatedUsedTokensList,
    setSearchedUserTokensList,
    setInputAddress,
  } = useContext(SwapContext);

  useEffect(() => {
    setAuthenticatedUsedTokensList([]);
    setSearchedUserTokensList([]);
    setInputAddress("");
  }, [chain]);

  return (
    <div className="w-[95%] mb-20 dark:bg-[#212322] dark:border-[#353836] border rounded-2xl ">
      <Tab
        setActiveSwappingShelfID={(input) => setActiveSwappingShelfID(input)}
      />
      <div className={cc([activeSwappingShelfID ? "hidden" : "block"])}>
        <NftsShelf address={validatedAddressToSwap} />
      </div>
      <div className={cc([activeSwappingShelfID ? "block" : "hidden"])}>
        <NftsShelf address={authenticatedUserAddress?.address ?? null} />
      </div>
    </div>
  );
};
