import cc from "classcat";
import { useContext, useState } from "react";
import { ShelfSwap } from "@/components/02-molecules";
import { SwapContext, Tab } from "@/components/01-atoms/";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const ShelfTabSwap = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [selectNftsFromOthers, setSelectNftsFromOthers] = useState(false);

  const { validatedAddressToSwap } = useContext(SwapContext);

  return (
    <div className={cc(["rounded border"])}>
      <Tab
        setSelectNftsFromOthers={(input) => setSelectNftsFromOthers(input)}
      />
      <div className={cc([selectNftsFromOthers ? "hidden" : "block"])}>
        <ShelfSwap address={validatedAddressToSwap} />
      </div>
      <div className={cc([!selectNftsFromOthers ? "hidden" : "block"])}>
        <ShelfSwap address={authenticatedUserAddress?.address ?? null} />
      </div>
    </div>
  );
};
