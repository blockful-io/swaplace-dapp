import cc from "classcat";
import { useContext, useEffect, useState } from "react";
import { NftsShelf } from "@/components/02-molecules";
import { SwapContext, SwappingShelfID, Tab } from "@/components/01-atoms/";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const SwappingShelfs = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [activeSwappingShelfID, setActiveSwappingShelfID] =
    useState<SwappingShelfID>(SwappingShelfID.THEIR_ITEMS);

  const { validatedAddressToSwap } = useContext(SwapContext);

  return (
    <div className="w-[95%] mb-20">
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
