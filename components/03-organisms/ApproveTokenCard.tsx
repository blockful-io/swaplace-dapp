/* eslint-disable react-hooks/exhaustive-deps */
import {
  TokenCard,
  TokenCardActionType,
  TokenCardStyleType,
} from "../02-molecules";
import {
  IApproveTokenSwap,
  getTokenAmountOrId,
} from "@/lib/client/blockchain-utils";
import { approveSwap } from "@/lib/service/approveSwap";
import { getTokenName } from "@/lib/client/tokens";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { isTokenSwapApproved } from "@/lib/service/verifyTokensSwapApproval";
import { Token } from "@/lib/shared/types";
import toast from "react-hot-toast";
import { type TransactionReceipt } from "viem";
import { type WalletClient, useNetwork, useWalletClient } from "wagmi";
import cc from "classcat";
import { useEffect, useState } from "react";

interface ApproveTokenCardProps {
  token: Token;
  setTokenWasApprovedForSwap: (token: Token) => void;
}

enum TokenApprovalStatus {
  WAITING_BLOCKCHAIN_CONFIRMATION = "WAITING_BLOCKCHAIN_CONFIRMATION",
  CLICK_TO_APPROVE = "CLICK_TO_APPROVE",
  APPROVED = "APPROVED",
}

export const ApproveTokenCard = ({
  token,
  setTokenWasApprovedForSwap,
}: ApproveTokenCardProps) => {
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  const [isApproved, setIsApproved] = useState(false);
  const [tokenApprovalStatus, setTokenApprovalStatus] = useState(
    TokenApprovalStatus.CLICK_TO_APPROVE,
  );

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const handleTokenApproval = async () => {
    let chainId: number | undefined = undefined;

    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }

    if (!chainId) {
      throw new Error("User is not connected to any network");
    }

    const isApproved = await isTokenSwapApproved({
      token,
      chainId,
    });

    if (isApproved) {
      setIsApproved(true);
      toast.success("Token approved.");
    } else {
      await askForTokenApproval(token).then((isApproved) => {
        if (typeof isApproved !== "undefined") {
          setIsApproved(true);
        }
      });
    }
  };

  useEffect(() => {
    if (isApproved) setTokenWasApprovedForSwap(token);
  }, [isApproved]);

  const askForTokenApproval = async (
    token: Token,
  ): Promise<TransactionReceipt | undefined> => {
    let chainId: number | undefined = undefined;

    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }

    if (!chainId || !walletClient) {
      throw new Error("User's wallet is not connected");
    }

    if (!token.contract)
      throw new Error(`Token contract is not defined for: ${token}`);

    const swapData: IApproveTokenSwap = {
      walletClient: walletClient as WalletClient,
      spender: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      tokenContractAddress: token.contract as `0x${string}`,
      amountOrId: getTokenAmountOrId(token),
      chainId,
      token,
      onWalletConfirmation: () =>
        setTokenApprovalStatus(
          TokenApprovalStatus.WAITING_BLOCKCHAIN_CONFIRMATION,
        ),
    };

    try {
      const transactionReceipt = await approveSwap(swapData);

      if (transactionReceipt != undefined) {
        toast.success("Approved successfully");
        setTokenWasApprovedForSwap(token);
        return transactionReceipt;
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      // TODO: map error scenarios and create corresponding error triggers
      toast.error("Approval rejected");
      console.error(error);
    }
  };

  if (!authenticatedUserAddress) return null;

  return (
    <div
      className={cc([
        "flex p-4 items-center gap-4 h-[68px]",
        !isApproved
          ? "bg-[#353836]  rounded-xl"
          : "dark:bg-[#DDF23D] bg-[#97a529] rounded-xl disabled cursor-not-allowed",
      ])}
      onClick={() => handleTokenApproval()}
      role="button"
    >
      <div>
        <TokenCard
          withSelectionValidation={false}
          onClickAction={TokenCardActionType.APPROVE_TOKEN_SWAP}
          ownerAddress={authenticatedUserAddress.address}
          tokenData={token}
          styleType={TokenCardStyleType.SMALL}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <p className={!isApproved ? "p-medium-2-dark" : "p-medium-2"}>
            {getTokenName(token)}
          </p>
        </div>
        <div className="flex p-semibold-dark">
          {tokenApprovalStatus ===
          TokenApprovalStatus.WAITING_BLOCKCHAIN_CONFIRMATION ? (
            <p className="bg-[#505150] px-1 w-fit rounded-[4px] h-5 items-center flex">
              WAITING BLOCKCHAIN CONFIRMATION
            </p>
          ) : tokenApprovalStatus === TokenApprovalStatus.CLICK_TO_APPROVE ? (
            <p className=" bg-[#505150] px-1 w-fit rounded-[4px] h-5 items-center flex">
              CLICK TO APPROVE
            </p>
          ) : TokenApprovalStatus.APPROVED ? (
            <div className="bg-[#505150] px-1 w-fit bg-opacity-30 rounded-[4px] h-5 items-center flex">
              <p className="text-white">APPROVED</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
