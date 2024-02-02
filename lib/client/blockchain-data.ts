import { Dispatch, SetStateAction } from "react";
import {
  ERC20,
  ERC721,
  NFTsQueryStatus,
  Token,
  getApiKeyForNetwork,
  getRpcHttpUrlForNetwork,
} from "./constants";
import { getTimestamp } from "./utils";
import { hexToNumber } from "viem";
import {
  GetTokensForOwnerResponse,
  OwnedNftsResponse,
  OwnedToken,
} from "alchemy-sdk";

export interface ICreateSwap {
  walletClient: any;
  expireDate: bigint;
  nftInputUser: any[];
  nftAuthUser: any[];
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

export interface INftSwappingInfo {
  addr: `0x${string}`;
  amountOrId: bigint;
}

export enum SwapModalSteps {
  APPROVE_NFTS,
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

export type NftSwappingInfo = {
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
};

export function ComposeNftSwap(nftUser: Token[]): INftSwappingInfo[] {
  let nftTokenContractArray: INftSwappingInfo[] = [];

  for (let i = 0; i < nftUser.length; i += 2) {
    const amountOrId = BigInt(hexToNumber(nftUser[i]?.id?.tokenId));
    const addr = nftUser[i]?.contract as `0x${string}`;
    if (amountOrId !== undefined && addr !== undefined) {
      nftTokenContractArray.push({ addr, amountOrId });
    }

    if (i + 1 < nftUser.length) {
      const nextAmountOrId = BigInt(hexToNumber(nftUser[i + 1]?.id?.tokenId));
      const nextAddr = nftUser[i + 1]?.contract as `0x${string}`;

      if (nextAmountOrId !== undefined && nextAddr !== undefined) {
        nftTokenContractArray.push({
          addr: nextAddr,
          amountOrId: nextAmountOrId,
        });
      }
    }
  }

  return nftTokenContractArray;
}

export function getNftsInfoToSwap(userNfts: Token[]): NftSwappingInfo[] {
  let nftsInfoArray: NftSwappingInfo[] = [];

  for (let i = 0; i < userNfts.length; i++) {
    const nftAmountOrTokenId = BigInt(hexToNumber(userNfts[i]?.id?.tokenId));
    const nftContractAddress = userNfts[i]?.contract as `0x${string}`;

    if (nftAmountOrTokenId !== undefined && nftContractAddress !== undefined) {
      nftsInfoArray.push({
        tokenAddress: nftContractAddress,
        amountOrId: nftAmountOrTokenId,
      });
    }

    // if (i + 1 < userNfts.length) {
    //   const nextAmountOrId = BigInt(hexToNumber(userNfts[i + 1]?.id?.tokenId));
    //   const nextAddr = userNfts[i + 1]?.contract?.address as `0x${string}`;

    //   if (nextAmountOrId !== undefined && nextAddr !== undefined) {
    //     nftsInfoArray.push([nextAddr, nextAmountOrId]);
    //   }
    // }
  }

  return nftsInfoArray;
}

export const getERC721TokensFromAddress = async (
  address: string,
  chainId: number,
  stateSetter: Dispatch<SetStateAction<NFTsQueryStatus>>,
) => {
  const { Alchemy } = require("alchemy-sdk");

  const config = {
    apiKey: getApiKeyForNetwork.get(chainId),
    network: getRpcHttpUrlForNetwork
      .get(chainId)
      ?.split("https://")[1]
      .split(".")[0], // The network from alchemy needs to be like 'eth-sepolia' | 'eth-goerli'
  };
  const alchemy = new Alchemy(config);

  const ownerAddress = address;

  return alchemy.core
    .getNFTsForOwner(ownerAddress)
    .then((response: OwnedNftsResponse) => {
      return parseAlchemyERC721Tokens(response.ownedNfts);
    });
};

const parseAlchemyERC721Tokens = (tokens: any[]): ERC721[] => {
  return tokens.map((token) => {
    return {
      id: token.id,
      metadata: token.metadata,
      contract: token.contractAddress,
      contractMetadata: token.contractMetadata,
    };
  });
};

export const getERC20TokensFromAddress = async (
  address: string,
  chainId: number,
): Promise<ERC20[]> => {
  const { Alchemy } = require("alchemy-sdk");

  const config = {
    apiKey: getApiKeyForNetwork.get(chainId),
    network: getRpcHttpUrlForNetwork
      .get(chainId)
      ?.split("https://")[1]
      .split(".")[0], // The network from alchemy needs to be like 'eth-sepolia' | 'eth-goerli'
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
      name: token.name,
      logo: token.logo,
      symbol: token.symbol,
      rawBalance: token.rawBalance,
      contract: token.contractAddress,
    };
  });
};

export interface Swap {
  owner: string;
  config: any;
  biding: Token[];
  asking: Token[];
}

export async function makeConfig(
  Contract: any,
  allowed: any,
  destinationChainSelector: any,
  expiration: any,
) {
  const config = await Contract.packData(
    allowed,
    destinationChainSelector,
    expiration,
  );
  return config;
}

export async function makeSwap(
  Contract: any,
  owner: any,
  allowed: any,
  destinationChainSelector: any,
  expiration: any,
  biding: Token[],
  asking: Token[],
  chainId: number,
) {
  const timestamp = await getTimestamp(chainId);
  if (expiration < timestamp) {
    throw new Error("InvalidExpiry");
  }

  if (biding.length == 0 || asking.length == 0) {
    throw new Error("InvalidNFTsLength");
  }

  const config = await makeConfig(
    Contract,
    allowed,
    destinationChainSelector,
    expiration,
  );

  const swap: Swap = {
    owner: owner,
    config: config,
    biding: biding,
    asking: asking,
  };

  return swap;
}

export interface IArrayStatusTokenApproved {
  approved: `0x${string}`;
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
}
