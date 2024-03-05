import {
  TokenApprovalData,
  getTokenInfoBeforeSwap,
} from "../client/blockchain-utils";
import { publicClient } from "../wallet/wallet-config";
import { MockERC721Abi } from "../client/abi";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { Token, TokenType } from "../shared/types";

export async function isTokenSwapApproved({
  token,
  chainId,
}: {
  token: Token;
  chainId: number;
}): Promise<boolean> {
  try {
    const tokenSwapInfo = getTokenInfoBeforeSwap(token);

    let data;
    if (token.tokenType === TokenType.ERC20) {
      // Todo: implement ERC20 approval amount checker
      return false;
    } else if (token.tokenType === TokenType.ERC721) {
      const tokenTypeAbi = MockERC721Abi;
      const getApprovedStatusMethod = "getApproved";
      data = await publicClient({ chainId }).readContract({
        abi: tokenTypeAbi,
        functionName: getApprovedStatusMethod,
        address: tokenSwapInfo.tokenAddress,
        args: [tokenSwapInfo.amountOrId.toString()],
      });
    }

    /* 
      Whenever a token is approved to be exchanged by a given Smart-Contract,
      the returned string of 'getApproved()' informs the given Smart-Contract 
      address. If the token is not approved to be swap by this given
      Smart-Contract, 'getApproved()' returns 'ADDRESS_ZERO'
    */
    return data === SWAPLACE_SMART_CONTRACT_ADDRESS[chainId];
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getMultipleTokensApprovalStatus(
  tokensList: Token[],
  chainId: number,
): Promise<TokenApprovalData[]> {
  const promises = tokensList.map(async (token) => {
    const tokenSwapInfo = getTokenInfoBeforeSwap(token);

    return {
      ...tokenSwapInfo,
      approved: await isTokenSwapApproved({ token, chainId }),
    };
  });

  const tokensListWithApprovalStatus = Promise.all(promises);

  return tokensListWithApprovalStatus;
}
