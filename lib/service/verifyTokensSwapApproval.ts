import {
  TokenApprovalData,
  getTokenAmountOrId,
} from "../client/blockchain-utils";
import { publicClient } from "../wallet/wallet-config";
import { MockERC20Abi, MockERC721Abi } from "../client/abi";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { EthereumAddress, Token, TokenType } from "../shared/types";
import { getTokenInfoBeforeSwap } from "../client/swap-utils";

export async function isTokenSwapApproved({
  token,
  chainId,
  authedUserAddress,
}: {
  token: Token;
  chainId: number;
  authedUserAddress: EthereumAddress | null;
}): Promise<boolean> {
  if (!authedUserAddress) return false;

  try {
    const tokenSwapInfo = getTokenInfoBeforeSwap(token);

    let abi: Readonly<Array<Record<string, any>>> = [];
    let functionName = "";
    let args: any[] = [];
    if (token.tokenType === TokenType.ERC20) {
      abi = MockERC20Abi;
      functionName = "allowance";
      args = [
        authedUserAddress.address,
        SWAPLACE_SMART_CONTRACT_ADDRESS[chainId],
      ];
    } else if (token.tokenType === TokenType.ERC721) {
      abi = MockERC721Abi;
      functionName = "getApproved";
      args = [getTokenAmountOrId(token).toString()];
    }

    const data = await publicClient({ chainId }).readContract({
      abi,
      functionName,
      address: tokenSwapInfo.tokenAddress,
      args,
    });

    if (token.tokenType === TokenType.ERC20) {
      /*
        ERC20's allowance returns the amount of tokens a user has allowed a given
        Smart-Contract to spend on their behalf. The below comparison checks if
        the amount the user has allowed the given Smart-Contract to spend is
        greater than the amount they are trying to swap.
      */
      const tokenSwapAmount = getTokenAmountOrId(token);
      const allowedAmount = data as number;

      return tokenSwapAmount <= allowedAmount;
    } else if (token.tokenType === TokenType.ERC721) {
      /* 
        Whenever a token is approved to be exchanged by a given Smart-Contract,
        the returned string of 'getApproved()' informs the given Smart-Contract 
        address. If the token is not approved to be swap by this given
        Smart-Contract, 'getApproved()' returns 'ADDRESS_ZERO'
      */
      return data === SWAPLACE_SMART_CONTRACT_ADDRESS[chainId];
    }

    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getMultipleTokensApprovalStatus(
  tokensList: Token[],
  chainId: number,
  authedUserAddress: EthereumAddress | null,
): Promise<TokenApprovalData[]> {
  const promises = tokensList.map(async (token) => {
    const tokenSwapInfo = getTokenInfoBeforeSwap(token);

    return {
      ...tokenSwapInfo,
      approved: await isTokenSwapApproved({
        token,
        chainId,
        authedUserAddress,
      }),
    };
  });

  const tokensListWithApprovalStatus = Promise.all(promises);

  return tokensListWithApprovalStatus;
}
