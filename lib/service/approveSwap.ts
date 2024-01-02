import { encodeFunctionData } from "viem";
import { MockERC721Abi } from "../client/abi";
import { IApproveSwap } from "../client/blockchain-data";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { publicClientViem } from "../wallet/wallet-config";

export async function approveSwap({
  walletClient,
  chain,
  nftUser,
  amountOrId,
}: IApproveSwap) {
  const data = encodeFunctionData({
    abi: MockERC721Abi,
    functionName: "approve",
    args: [SWAPLACE_SMART_CONTRACT_ADDRESS[chain] as `0x${string}`, amountOrId],
  });

  try {
    const transactionHash = await walletClient.sendTransaction({
      data: data,
      to: nftUser,
    });

    const transactionReceipt = await publicClientViem.waitForTransactionReceipt(
      {
        hash: transactionHash,
      },
    );

    return transactionReceipt;
  } catch (error) {
    console.error(error);
  }
}
