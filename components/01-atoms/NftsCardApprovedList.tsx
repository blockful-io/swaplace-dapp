import {
  ADDRESS_ZERO,
  ERC20,
  SWAPLACE_SMART_CONTRACT_ADDRESS,
  Token,
} from "@/lib/client/constants";
import { SwapContext } from "@/components/01-atoms";
import {
  NftCard,
  NftCardActionType,
  NftCardStyleType,
} from "@/components/02-molecules";
import cc from "classcat";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork, useWalletClient } from "wagmi";
import { IApproveSwap } from "@/lib/client/blockchain-data";
import { approveSwap } from "@/lib/service/approveSwap";
import { hexToNumber } from "viem";
import { updateNftsToSwapApprovalStatus } from "@/lib/client/swap-utils";

export const NftsCardApprovedList = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  const {
    nftAuthUser,
    authedUserSelectedNftsApprovalStatus,
    setAuthedUserNftsApprovalStatus,
    setAllSelectedNftsAreApproved,
    allSelectedNftsApproved,
  } = useContext(SwapContext);

  useEffect(() => {
    const fetchApprove = async () => {
      await updateNftsToSwapApprovalStatus(
        nftAuthUser,
        setAuthedUserNftsApprovalStatus,
        setAllSelectedNftsAreApproved,
      );
    };
    fetchApprove();
  }, [nftAuthUser, allSelectedNftsApproved]);
  if (!authenticatedUserAddress?.address) {
    return null;
  }
  let chainId: number;
  const handleApprove = async (token: Token) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }

    const swapData: IApproveSwap = {
      walletClient: walletClient,
      spender: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      tokenContractAddress: token.contract?.address,
      amountOrId: BigInt(hexToNumber(token.id?.tokenId)),
    };

    try {
      const transactionReceipt = await approveSwap(swapData);
      if (transactionReceipt != undefined) {
        toast.success("Approval successfully");
        return transactionReceipt;
      } else {
        toast.error("Approval Failed");
      }
    } catch (error) {
      toast.error("Approval Rejected");
      console.error(error);
    }
  };

  const validateApprovalTokens = (arraynftApproval: any[]) => {
    const isValidApproved = !arraynftApproval.some((token) => {
      return token.approved != SWAPLACE_SMART_CONTRACT_ADDRESS[chainId];
    });

    setAllSelectedNftsAreApproved(isValidApproved);
  };

  const approveNftForSwapping = async (token: Token, index: number) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }
    if (
      authedUserSelectedNftsApprovalStatus[index]?.approved ===
      SWAPLACE_SMART_CONTRACT_ADDRESS[chainId]
    ) {
      toast.error("Token already approved.");
    } else {
      await handleApprove(token).then((result) => {
        if (result != undefined) {
          const nftWasApproved = (authedUserSelectedNftsApprovalStatus[
            index
          ].approved = SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as any);

          setAuthedUserNftsApprovalStatus([nftWasApproved]);
        }
        validateApprovalTokens(authedUserSelectedNftsApprovalStatus);
      });
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="grid grid-cols-1 w-[100%] gap-3 relative overflow-y-auto max-h-[370px]">
        {nftAuthUser.map((token, index) => (
          <div
            className={cc([
              "flex p-4 items-center gap-4 h-[68px]",
              authedUserSelectedNftsApprovalStatus[index]?.approved ===
              ADDRESS_ZERO
                ? "bg-[#353836]  rounded-xl"
                : "dark:bg-[#DDF23D] bg-[#97a529] rounded-xl disabled cursor-not-allowed",
            ])}
            role="button"
            onClick={() => approveNftForSwapping(token, index)}
          >
            <div>
              <NftCard
                withSelectionValidation={false}
                onClickAction={NftCardActionType.NFT_ONCLICK}
                ownerAddress={authenticatedUserAddress.address}
                nftData={nftAuthUser[index]}
                styleType={NftCardStyleType.SMALL}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                {authedUserSelectedNftsApprovalStatus[index]?.approved ===
                ADDRESS_ZERO ? (
                  <p className="p-medium-2-dark">
                    {nftAuthUser[index].contractMetadata?.name}
                  </p>
                ) : (
                  <p className="p-medium-2">
                    {nftAuthUser[index].contractMetadata?.name}
                  </p>
                )}
              </div>
              <div className="flex p-semibold-dark">
                {authedUserSelectedNftsApprovalStatus[index]?.approved ===
                ADDRESS_ZERO ? (
                  <p className=" bg-[#505150] px-1 w-fit rounded-[4px] h-5 items-center flex">
                    PENDING APPROVAL
                  </p>
                ) : (
                  <div className="bg-[#505150] px-1 w-fit bg-opacity-30 rounded-[4px] h-5 items-center flex">
                    <p className="text-white">APPROVED</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
