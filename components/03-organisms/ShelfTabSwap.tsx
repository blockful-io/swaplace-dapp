import cc from "classcat";
import { useState } from "react";
import { Tab } from "@/components/01-atoms/";
import { ShelfSwap } from "@/components/02-molecules";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const ShelfTabSwap = ({ input }: any) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [isYourItem, setIsYourItem] = useState(false);

  return (
    <div>
      <Tab setIsYourItem={(input) => setIsYourItem(input)} />
      <div className={cc([isYourItem ? "hidden" : "block"])}>
        <ShelfSwap address={input} />
      </div>
      <div className={cc([!isYourItem ? "hidden" : "block"])}>
        <ShelfSwap address={authenticatedUserAddress?.address} />
      </div>
    </div>
  );
};
