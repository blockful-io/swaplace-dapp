import { getMultipleNftsApprovalStatus } from "@/lib/service/getApproveSwap";
import { useContext } from "react";
import { ADDRESS_ZERO } from "../constants";
import { SwapContext } from "@/components/01-atoms";
import { getNftsInfoToSwap } from "../blockchain-data";

export const useSwaplace = () => {
  const {
    nftAuthUser,
    setAllSelectedNftsAreApproved,
    setAuthedUserNftsApprovalStatus,
  } = useContext(SwapContext);

  const nftsToSwapFromAuthedUser = getNftsInfoToSwap(nftAuthUser);

  const updateNftsToSwapApprovalStatus = async () => {
    try {
      const result = await getMultipleNftsApprovalStatus(
        nftsToSwapFromAuthedUser,
      );

      const nftsApprovalStatus = result.map((approved, index) => ({
        approved,
        tokenAddress: nftsToSwapFromAuthedUser[index].tokenAddress,
        amountOrId: nftsToSwapFromAuthedUser[index].amountOrId,
      }));

      const someNftIsNotApprovedForSwapping = !result.some(
        (approved) => approved === ADDRESS_ZERO,
      );

      setAuthedUserNftsApprovalStatus(nftsApprovalStatus);
      setAllSelectedNftsAreApproved(someNftIsNotApprovedForSwapping);
    } catch (error) {
      console.error("error ", error);
    }
  };

  return {
    updateNftsToSwapApprovalStatus,
  };
};
