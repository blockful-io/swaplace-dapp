/* eslint-disable react-hooks/exhaustive-deps */
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "@/lib/client/constants";
import { SwapContext } from "@/components/01-atoms";
import { TokenCard, NftCardStyleType } from "@/components/02-molecules";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  IApproveTokenSwap,
  getTokenAmountOrId,
} from "@/lib/client/blockchain-utils";
import { approveSwap } from "@/lib/service/approveSwap";
import { isTokenSwapApproved } from "@/lib/service/verifyTokensSwapApproval";
import { getTokenName } from "@/lib/client/tokens";
import { Token } from "@/lib/shared/types";
import cc from "classcat";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type WalletClient, useNetwork, useWalletClient } from "wagmi";
import { type TransactionReceipt } from "viem";

export const ApprovedTokenCards = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const [tokensBeingApproved, setTokensBeingApproved] = useState<Token[]>([]);
  const [tokensApprovedForSwap, setTokensApprovedForSwap] = useState<Token[]>(
    [],
  );

  const {
    authenticatedUserTokensList,
    setApprovedTokensCount,
    approvedTokensCount,
  } = useContext(SwapContext);

  useEffect(() => {
    setApprovedTokensCount(0);
  }, [authenticatedUserTokensList]);

  if (!authenticatedUserAddress?.address) {
    return null;
  }

  let chainId: number;

  const handleApprove = async (
    token: Token,
    loadingCallback: (token: Token) => void,
  ): Promise<TransactionReceipt | undefined> => {
    if (!chain?.id || !walletClient) {
      throw new Error("User's wallet is not connected");
    }

    if (!token.contract)
      throw new Error(`Token contract is not defined for: ${token}`);

    const swapData: IApproveTokenSwap = {
      walletClient: walletClient as WalletClient,
      spender: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      tokenContractAddress: token.contract as `0x${string}`,
      amountOrId: getTokenAmountOrId(token),
      chainId: chain.id,
      token,
      onConfirm: loadingCallback,
    };

    try {
      const transactionReceipt = await approveSwap(swapData);

      if (transactionReceipt != undefined) {
        toast.success("Approved successfully");
        setTokensApprovedForSwap([...tokensApprovedForSwap, token]);
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

  const addTokenToLoadingState = (token: Token) => {
    setTokensBeingApproved([...tokensBeingApproved, token]);
  };

  const handleTokenApproval = async (token: Token) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    } else {
      throw new Error("User is not connected to any network");
    }

    const isApproved = await isTokenSwapApproved({
      token,
      chainId,
    });

    if (isApproved) {
      setTokensApprovedForSwap([...tokensApprovedForSwap, token]);
      toast.success("Token approved.");
    } else {
      await handleApprove(token, addTokenToLoadingState).then((isApproved) => {
        if (typeof isApproved !== "undefined") {
          setApprovedTokensCount(approvedTokensCount + 1);
        }

        setTokensBeingApproved(
          tokensBeingApproved.filter((tk) => tk === token),
        );
      });
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="grid grid-cols-1 w-[100%] gap-3 relative overflow-y-auto max-h-[370px]">
        {authenticatedUserTokensList.map((token, index) => (
          <div
            key={index}
            className={cc([
              "flex p-4 items-center gap-4 h-[68px]",
              !tokensApprovedForSwap.includes(token)
                ? "bg-[#353836]  rounded-xl"
                : "dark:bg-[#DDF23D] bg-[#97a529] rounded-xl disabled cursor-not-allowed",
              {
                "disabled cursor-wait": tokensBeingApproved.includes(token),
              },
            ])}
            role="button"
            onClick={() => handleTokenApproval(token)}
          >
            <div>
              <TokenCard
                withSelectionValidation={false}
                ownerAddress={authenticatedUserAddress.address}
                tokenData={authenticatedUserTokensList[index]}
                styleType={NftCardStyleType.SMALL}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                {!tokensApprovedForSwap.includes(token) ? (
                  <p className="p-medium-2-dark">
                    {getTokenName(authenticatedUserTokensList[index])}
                  </p>
                ) : (
                  <p className="p-medium-2">
                    {getTokenName(authenticatedUserTokensList[index])}
                  </p>
                )}
              </div>
              <div className="flex p-semibold-dark">
                {tokensBeingApproved.includes(token) ? (
                  <p className="bg-[#505150] px-1 w-fit rounded-[4px] h-5 items-center flex">
                    WAITING BLOCKCHAIN CONFIRMATION
                  </p>
                ) : !tokensApprovedForSwap.includes(token) ? (
                  <p className=" bg-[#505150] px-1 w-fit rounded-[4px] h-5 items-center flex">
                    CLICK TO APPROVE
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
