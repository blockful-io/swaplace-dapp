import { getApiKeyForNetwork, getRpcHttpUrlForNetwork } from "./constants";
import { Asset, makeAsset } from "./swap-utils";
import { Token, ERC20, ERC721, TokenType } from "../shared/types";
import {
  type GetTokensForOwnerResponse,
  type OwnedNftsResponse,
  type OwnedToken,
  type OwnedNft,
  Alchemy,
} from "alchemy-sdk";
import { type WalletClient } from "wagmi";

export interface ICreateSwap {
  walletClient: WalletClient;
  expireDate: bigint;
  searchedUserTokensList: any[];
  authenticatedUserTokensList: any[];
  validatedAddressToSwap: string;
  authenticatedUserAddress: any;
  chain: number;
}

export interface IApproveMulticall {
  abi: any;
  functionName: string;
  address: `0x${string}`;
  args?: [any];
}
export interface IGetApproveSwap {
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
}
export interface IApproveSwap {
  walletClient: any;
  spender: any;
  amountOrId: bigint;
  tokenContractAddress: any;
}

export enum SwapModalSteps {
  APPROVE_TOKENS,
  CREATE_SWAP,
  CREATING_SWAP,
  CREATED_SWAP,
}

export enum ButtonClickPossibilities {
  PREVIOUS_STEP,
  NEXT_STEP,
}

export enum TransactionStatus {
  SEND_TRANSACTION,
  WAITING_WALLET_APPROVAL,
  TRANSACTION_APPROVED,
  SUCCESSFUL_TRANSACTION,
}

export type TokensWithSwapInfo = {
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
};

export async function ComposeTokenUserAssets(
  tokensList: Token[],
): Promise<Asset[]> {
  const tokenAssetArray: Asset[] = [];
  const assetPromisesArray: Promise<void>[] = [];

  for (let i = 0; i < tokensList.length; i += 1) {
    const addr = tokensList[i]?.contract as `0x${string}`;
    let amountOrId = undefined;

    switch (tokensList[i].tokenType) {
      case TokenType.ERC20:
        if ((tokensList[i] as ERC20).rawBalance) {
          amountOrId = BigInt((tokensList[i] as ERC20).rawBalance as string);
        }
      case TokenType.ERC721:
        if (tokensList[i]?.id as unknown as number) {
          amountOrId = tokensList[i]?.id as unknown as number;
        }
    }

    if (amountOrId !== undefined && addr !== undefined) {
      const assetPromise = makeAsset(addr, amountOrId).then((asset) => {
        tokenAssetArray.push(asset);
      });
      assetPromisesArray.push(assetPromise);
    }
  }

  await Promise.all(assetPromisesArray);

  return tokenAssetArray;
}

export function getTokensInfoBeforeSwap(
  tokensList: Token[],
): TokensWithSwapInfo[] {
  const tokensWithInfo: TokensWithSwapInfo[] = [];

  for (let i = 0; i < tokensList.length; i++) {
    let nftAmountOrTokenId = undefined;

    switch (tokensList[i].tokenType) {
      case TokenType.ERC20:
        if ((tokensList[i] as ERC20).rawBalance) {
          nftAmountOrTokenId = (tokensList[i] as ERC20).rawBalance;
        }
      case TokenType.ERC721:
        if (tokensList[i]?.id as unknown as number) {
          nftAmountOrTokenId = tokensList[i]?.id as unknown as number;
        }
    }

    const tokenContractAddress = tokensList[i]?.contract as `0x${string}`;

    if (
      nftAmountOrTokenId !== undefined &&
      tokenContractAddress !== undefined
    ) {
      tokensWithInfo.push({
        tokenAddress: tokenContractAddress,
        amountOrId: BigInt(nftAmountOrTokenId),
      });
    }
  }

  return tokensWithInfo;
}

// Check out the Alchemy Documentation https://docs.alchemy.com/reference/getnfts-sdk-v3
export const getERC721TokensFromAddress = async (
  address: string,
  chainId: number,
) => {
  const networkAPIKey = getApiKeyForNetwork.get(chainId);
  const networkRPCHttpURL = getRpcHttpUrlForNetwork.get(chainId);

  if (!networkAPIKey) {
    throw new Error("No API Key for this network.");
  }

  if (!networkRPCHttpURL) {
    throw new Error("No RPC URL for this network.");
  }

  const config = {
    apiKey: networkAPIKey,
    network: networkRPCHttpURL,
  };

  const alchemy = new Alchemy(config);

  return alchemy.nft
    .getNftsForOwner(address)
    .then((response: OwnedNftsResponse) => {
      return parseAlchemyERC721Tokens(response.ownedNfts);
    })
    .catch((error: any) => {
      console.error("Error getNftsForOwner:", error);
      throw new Error();
    });
};

const parseAlchemyERC721Tokens = (tokens: OwnedNft[]): ERC721[] => {
  return tokens.map((token) => {
    return {
      tokenType: TokenType.ERC721,
      id: token.tokenId,
      name: token.contract.name,
      metadata: token.raw.metadata,
      contract: token.contract.address,
      contractMetadata: token.contract,
    };
  });
};

// Check out the Alchemy Documentation https://docs.alchemy.com/reference/gettokensforowner-sdk-v3
export const getERC20TokensFromAddress = async (
  address: string,
  chainId: number,
): Promise<ERC20[]> => {
  const alchemyApiKey = getApiKeyForNetwork.get(chainId);
  const alchemyRPCHttpURL = getRpcHttpUrlForNetwork.get(chainId);

  if (!alchemyApiKey) {
    throw new Error("No API Key for this network.");
  }
  if (!alchemyRPCHttpURL) {
    throw new Error("No RPC URL for this network.");
  }

  const config = {
    apiKey: alchemyApiKey,
    network: alchemyRPCHttpURL,
  };
  const alchemy = new Alchemy(config);

  const ownerAddress = address;

  return alchemy.core
    .getTokensForOwner(ownerAddress)
    .then((response: GetTokensForOwnerResponse) => {
      return parseAlchemyERC20Tokens(response.tokens);
    });
};

const parseAlchemyERC20Tokens = (tokens: OwnedToken[]): ERC20[] => {
  return tokens.map((token) => {
    return {
      tokenType: TokenType.ERC20,
      /*
        This ID is only used for TokenCard selection, in the Ui of the dApp.
        We want it to be as randomic and unique as possible besides being 
        yet, mathematically possible to have same IDs on two different
        tokens. Possible, but very unlikely to generate non-unique 
        IDs, below maths solve our ID generation goal, today.
      */
      id: ((Date.now() * Math.random()) / Math.random()).toFixed(0),
      name: token.name,
      logo: token.logo,
      symbol: token.symbol,
      rawBalance: token.rawBalance,
      contract: token.contractAddress,
    };
  });
};

// export interface Swap {
//   owner: string;
//   config: any;
//   biding: Token[];
//   asking: Token[];
// }

// export async function makeConfig(
//   Contract: any,
//   allowed: any,
//   destinationChainSelector: any,
//   expiration: any,
// ) {
//   const config = await Contract.packData(
//     allowed,
//     destinationChainSelector,
//     expiration,
//   );
//   return config;
// }

// export async function makeSwap(
//   Contract: any,
//   owner: any,
//   allowed: any,
//   destinationChainSelector: any,
//   expiration: any,
//   biding: Token[],
//   asking: Token[],
//   chainId: number,
// ) {
//   const timestamp = await getTimestamp(chainId);
//   if (expiration < timestamp) {
//     throw new Error("InvalidExpiry");
//   }

//   if (biding.length == 0 || asking.length == 0) {
//     throw new Error("InvalidAssetsLength");
//   }

//   const config = await makeConfig(
//     Contract,
//     allowed,
//     destinationChainSelector,
//     expiration,
//   );

//   const swap: Swap = {
//     owner: owner,
//     config: config,
//     biding: biding,
//     asking: asking,
//   };

//   return swap;
// }

export interface IArrayStatusTokenApproved {
  approved: `0x${string}`;
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
}

export async function packingData(
  Contract: any,
  allowed: any,
  expiration: any,
) {
  const config = await Contract.read.packData([allowed, expiration]);
  return config;
}
