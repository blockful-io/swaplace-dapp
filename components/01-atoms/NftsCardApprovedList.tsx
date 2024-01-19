import {
  ADDRESS_ZERO,
  NFT,
  SWAPLACE_SMART_CONTRACT_ADDRESS,
} from "@/lib/client/constants";
import { NftCard, NftCardActionType, NftCardStyleType } from "../02-molecules";
import cc from "classcat";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { SwapContext } from ".";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork, useWalletClient } from "wagmi";
import {
  IApproveSwap,
  CreateApprovalStatus,
  CreateSwapStatus,
} from "@/lib/client/blockchain-data";
import { approveSwap } from "@/lib/service/approveSwap";
import { hexToNumber } from "viem";
import { useSwaplace } from "@/lib/client/hooks/useSwaplace";

export const NftsCardApprovedList = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  const {
    nftAuthUser,
    authedUserSelectedNftsApprovalStatus,
    setAuthedUserNftsApprovalStatus,
    setAllSelectedNftsAreApproved,
    allSelectedNftsAproved,
    createApprovalStatus,
    setCreateApprovalStatus,
    createSwapStatus,
    setCreateSwapStatus,
  } = useContext(SwapContext);

  const { updateNftsToSwapApprovalStatus } = useSwaplace();

  //   useEffect(() => {
  //     if (!open) {
  //       setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
  //     }
  //   }, [open]);

  useEffect(() => {
    if (createSwapStatus === CreateSwapStatus.WALLET_APPROVED) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
    }

    const fetchApprove = async () => {
      await updateNftsToSwapApprovalStatus();
    };
    fetchApprove();
  }, [nftAuthUser, allSelectedNftsAproved]);
  if (!authenticatedUserAddress?.address) {
    return null;
  }
  let chainId: number;
  const handleApprove = async (nft: NFT) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }

    const swapData: IApproveSwap = {
      walletClient: walletClient,
      spender: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      tokenContractAddress: nft.contract?.address,
      amountOrId: BigInt(hexToNumber(nft.id?.tokenId)),
    };

    try {
      setCreateApprovalStatus(CreateApprovalStatus.WAITING_WALLET_APPROVAL);
      const transactionReceipt = await approveSwap(swapData);
      if (transactionReceipt != undefined) {
        setCreateApprovalStatus(CreateApprovalStatus.WALLET_APPROVED);
        setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
        return transactionReceipt;
      } else {
        setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
        toast.error("Approval Failed");
      }
    } catch (error) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      console.error(error);
    }
  };

  const validateApprovalTokens = (arraynftApproval: any[]) => {
    const isValidApproved = !arraynftApproval.some((token) => {
      return token.approved != SWAPLACE_SMART_CONTRACT_ADDRESS[chainId];
    });

    console.log("isValidApproved", isValidApproved);
    setAllSelectedNftsAreApproved(isValidApproved);
  };

  const approveNftForSwapping = async (nft: NFT, index: number) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }
    if (
      authedUserSelectedNftsApprovalStatus[index]?.approved ===
      SWAPLACE_SMART_CONTRACT_ADDRESS[chainId]
    ) {
      toast.error("Token already approved.");
    } else {
      await handleApprove(nft).then((result) => {
        if (result != undefined) {
          setAuthedUserNftsApprovalStatus(
            (authedUserSelectedNftsApprovalStatus[index].approved =
              SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as any),
          );
        }
        validateApprovalTokens(authedUserSelectedNftsApprovalStatus);
      });
    }
  };

  return (
    <div className="flex justify-center items-center overflow-y-auto max-h-[250px] relative">
      <div className="grid grid-cols-1 w-[100%] gap-3 relative ">
        {nftAuthUser.map((nft, index) => (
          <div
            className={cc([
              "flex p-4 items-center gap-4 h-[68px]",
              authedUserSelectedNftsApprovalStatus[index]?.approved ===
              ADDRESS_ZERO
                ? "bg-[#353836]  rounded-xl"
                : "dark:bg-[#DDF23D] bg-[#97a529]  rounded-xl disabled cursor-not-allowed",
            ])}
            role="button"
            onClick={() => approveNftForSwapping(nft, index)}
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
                  <p className=" bg-[#505150] px-1 w-fit flex rounded-[4px]">
                    PENDING APPROVAL
                  </p>
                ) : (
                  <div className="bg-[#505150] px-1 w-fit opacity-30 rounded-[4px]">
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
