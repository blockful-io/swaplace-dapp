import cc from "classcat";
import { useContext, useEffect, useState } from "react";
import { SwapContext, SwappingShelfID, Tab } from "@/components/01-atoms/";
import { NftsShelf } from "@/components/03-organisms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork } from "wagmi";

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
