import { getApprovedSwapMulticall } from "@/lib/service/getApproveSwap";
import { useContext } from "react";
import { ADDRESS_ZERO } from "../constants";
import { SwapContext } from "@/components/01-atoms";
import { ComposeNftApproval, createArrayApproved } from "../blockchain-data";

export const useSwaplace = () => {
  const { nftAuthUser, setAllSelectedNftsAproved, setAllTokenApprovalStatus } =
    useContext(SwapContext);

  const nftsAuthUserApproval = ComposeNftApproval(nftAuthUser);
  const arraySelectedNftsToApprove = createArrayApproved(nftsAuthUserApproval);

  const handleApprovedMulticall = async () => {
    try {
      const result = await getApprovedSwapMulticall(arraySelectedNftsToApprove);

      console.log("result = ", result);
      const arrayStatusTokenApproved = result.map((approved, index) => ({
        approved,
        tokenAddress: arraySelectedNftsToApprove[index].tokenAddress,
        amountOrId: arraySelectedNftsToApprove[index].amountOrId,
      }));
      const isInvalidApproved = !result.some(
        (approved) => approved === ADDRESS_ZERO,
      );
      setAllTokenApprovalStatus(arrayStatusTokenApproved);
      setAllSelectedNftsAproved(isInvalidApproved);
    } catch (error) {
      console.error("error ", error);
    }
  };

  return {
    handleApprovedMulticall,
  };
};
