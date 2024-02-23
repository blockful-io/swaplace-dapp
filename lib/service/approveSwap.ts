import { MockERC721Abi } from "../client/abi";
import { IApproveSwap } from "../client/blockchain-data";
import { publicClientViem } from "../wallet/wallet-config";
import { type Hash, type TransactionReceipt, encodeFunctionData } from "viem";

export async function approveSwap({
  walletClient,
  spender,
  tokenContractAddress,
  amountOrId,
}: IApproveSwap): Promise<TransactionReceipt | undefined> {
  const data = encodeFunctionData({
    abi: MockERC721Abi,
    functionName: "approve",
    args: [spender, amountOrId],
  });

  try {
    const transactionHash: Hash = await walletClient.sendTransaction({
      data: data,
      to: tokenContractAddress,
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
