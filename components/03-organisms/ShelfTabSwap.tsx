import cc from "classcat";
import { ShelfSwap } from "@/components/02-molecules";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const ShelfTabSwap = ({ input }: any) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  return (
    <div>
      <div className={cc([])}>
        <ShelfSwap address={input} />
      </div>
      <div>
        <ShelfSwap address={authenticatedUserAddress?.address} />
      </div>
    </div>
  );
};
