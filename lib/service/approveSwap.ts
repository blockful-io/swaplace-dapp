import { MockERC20Abi, MockERC721Abi } from "../client/abi";
import { IApproveTokenSwap } from "../client/blockchain-utils";
import { TokenType } from "../shared/types";
import { publicClient } from "../wallet/wallet-config";
import { type Hash, type TransactionReceipt } from "viem";

export interface ApproveSwapResponse {
  receipt: TransactionReceipt | null;
  errorMessage: string | null;
  success: boolean;
}

export async function approveSwap({
  walletClient,
  spender,
  tokenContractAddress,
  amountOrId,
  chainId,
  token,
  onWalletConfirmation,
}: IApproveTokenSwap): Promise<ApproveSwapResponse> {
  const abi =
    token.tokenType === TokenType.ERC20 ? MockERC20Abi : MockERC721Abi;
  const functionName = "approve";

  try {
    const { request } = await publicClient({ chainId }).simulateContract({
      account: walletClient.account.address as `0x${string}`,
      address: tokenContractAddress,
      args: [spender, amountOrId],
      functionName,
      abi,
    });

    const transactionHash: Hash = await walletClient.writeContract(request);
    onWalletConfirmation();

    let txReceipt = {} as TransactionReceipt;

    while (typeof txReceipt.blockHash === "undefined") {
      /*
        It is guaranteed that at some point we'll have a valid TransactionReceipt in here.
        If we had a valid transaction sent (which is confirmed at this point by the try/catch block),
        it is a matter of waiting the transaction to be mined in order to know whether it was successful or not.
        
        So why are we using a while loop here?
        - Because it is possible that the transaction was not yet mined by the time
        we reach this point. So we keep waiting until we have a valid TransactionReceipt.
      */

      const transactionReceipt = await publicClient({
        chainId,
      }).waitForTransactionReceipt({
        hash: transactionHash,
      });

      if (transactionReceipt) {
        txReceipt = transactionReceipt;
      }
    }

    return {
      success: true,
      receipt: txReceipt,
      errorMessage: null,
    };
  } catch (error) {
    console.error(error);
    return {
      receipt: null,
      success: false,
      errorMessage: String(error),
    };
  }
}
