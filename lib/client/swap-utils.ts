import {
  IArrayStatusTokenApproved,
  getNftsInfoToSwap,
} from "./blockchain-data";
import { ADDRESS_ZERO, NFT } from "./constants";
import { getMultipleNftsApprovalStatus } from "../service/verifyTokensSwapApproval";
import { Dispatch, SetStateAction } from "react";

export const updateNftsToSwapApprovalStatus = async (
  nftsList: NFT[],
  setNftsApprovalStatus: Dispatch<SetStateAction<IArrayStatusTokenApproved[]>>,
  setNftsAreAllApproved: (areApproved: boolean) => void,
) => {
  const nftsToSwapFromAuthedUser = getNftsInfoToSwap(nftsList);
  try {
    const result = await getMultipleNftsApprovalStatus(
      nftsToSwapFromAuthedUser,
    );

    const nftsApprovalStatus = result.map((approved, index) => ({
      tokenAddress: nftsToSwapFromAuthedUser[index].tokenAddress,
      amountOrId: nftsToSwapFromAuthedUser[index].amountOrId,
      approved: approved as `0x${string}`,
    }));

    const someNftIsNotApprovedForSwapping = !result.some(
      (approved) => approved === ADDRESS_ZERO,
    );

    setNftsApprovalStatus(nftsApprovalStatus);
    setNftsAreAllApproved(someNftIsNotApprovedForSwapping);
  } catch (error) {
    console.error("error ", error);
  }
};
