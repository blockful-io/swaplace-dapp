import { Dispatch, SetStateAction } from "react";
import {
  NFT,
  NFTsQueryStatus,
  getApiKeyForNetwork,
  getRpcHttpUrlForNetwork,
} from "./constants";
import { getTimestamp } from "./utils";
import { hexToNumber } from "viem";

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

export function ComposeNftSwap(nftUser: NFT[]): INftSwappingInfo[] {
  let nftTokenContractArray: INftSwappingInfo[] = [];

  for (let i = 0; i < nftUser.length; i += 2) {
    const amountOrId = BigInt(hexToNumber(nftUser[i]?.id?.tokenId));
    const addr = nftUser[i]?.contract?.address as `0x${string}`;
    if (amountOrId !== undefined && addr !== undefined) {
      nftTokenContractArray.push({ addr, amountOrId });
    }

    if (i + 1 < nftUser.length) {
      const nextAmountOrId = BigInt(hexToNumber(nftUser[i + 1]?.id?.tokenId));
      const nextAddr = nftUser[i + 1]?.contract?.address as `0x${string}`;

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

export function getNftsInfoToSwap(userNfts: NFT[]): NftSwappingInfo[] {
  let nftsInfoArray: NftSwappingInfo[] = [];

  for (let i = 0; i < userNfts.length; i++) {
    const nftAmountOrTokenId = BigInt(hexToNumber(userNfts[i]?.id?.tokenId));
    const nftContractAddress = userNfts[i]?.contract?.address as `0x${string}`;

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

export const getNftsFrom = async (
  address: string,
  chainId: number,
  stateSetter: Dispatch<SetStateAction<NFTsQueryStatus>>,
) => {
  const baseUrl = getRpcHttpUrlForNetwork.get(chainId);

  if (!baseUrl) throw new Error("No RPC URL defined for connected chain");

  const requestOptions = {
    method: "get",
  };

  const url = `${baseUrl}/getNFTsForOwner?owner=${address}&withMetadata=true`;

  stateSetter(NFTsQueryStatus.LOADING);

  return fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();

      if (!data.ownedNfts.length) {
        stateSetter(NFTsQueryStatus.NO_RESULTS);
      } else {
        stateSetter(NFTsQueryStatus.WITH_RESULTS);
      }

      return data.ownedNfts;
    })
    .catch((error) => {
      console.error(error);
      stateSetter(NFTsQueryStatus.ERROR);
      return error;
    });
};

export const getTokensFrom = async (address: string, chainId: number) => {
  const { Alchemy } = require("alchemy-sdk");

  const config = {
    apiKey: getApiKeyForNetwork.get(chainId),
    network: getRpcHttpUrlForNetwork
      .get(chainId)
      ?.split("https://")[1]
      .split(".")[0], // The network from alchemy needs to be like 'eth-sepolia' | 'eth-goerli'
  };
  const alchemy = new Alchemy(config);

  const main = async () => {
    const ownerAddress = address;

    let response = await alchemy.core.getTokensForOwner(ownerAddress);

    return response.tokens;
  };
  return main();
};

export interface Swap {
  owner: string;
  config: any;
  biding: NFT[];
  asking: NFT[];
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
  biding: NFT[],
  asking: NFT[],
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
