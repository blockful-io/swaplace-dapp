import { encodeFunctionData } from "viem";
import { MockERC721Abi } from "../client/abi";
import { IApproveSwap } from "../client/blockchain-data";
import { publicClientViem } from "../wallet/wallet-config";

export async function approveSwap({
  walletClient,
  spender,
  tokenContractAddress,
  amountOrId,
}: IApproveSwap) {
  const data = encodeFunctionData({
    abi: MockERC721Abi,
    functionName: "approve",
    args: [spender, amountOrId],
  });

  try {
    const transactionHash = await walletClient.sendTransaction({
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
