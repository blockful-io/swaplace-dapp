import { Dispatch, SetStateAction } from "react";
import { NFT, NFTsQueryStatus, getRpcHttpUrlForNetwork } from "./constants";
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

export interface IApproveSwap {
  walletClient: any;
  chain: number;
  spender: any;
  amountOrId: bigint;
  nftUser: any;
}

export interface INftAddressAmount {
  addr: `0x${string}`;
  amountOrId: bigint;
}

export enum CreateApprovalStatus {
  "CREATE_APPROVAL" = "CREATE_APPROVAL",
  "WAITING_WALLET_APPROVAL" = "WAITING_WALLET_APPROVAL",
  "WALLET_APPROVED" = "WALLET_APPROVED",
}

export enum CreateSwapStatus {
  "CREATE_SWAP" = "CREATE_SWAP",
  "WAITING_WALLET_APPROVAL" = "WAITING_WALLET_APPROVAL",
  "WALLET_APPROVED" = "WALLET_APPROVED",
}

export type NftAddressAmount = [`0x${string}`, bigint];

export function ComposeNftSwap(nftUser: NFT[]): INftAddressAmount[] {
  let nftTokenContractArray: INftAddressAmount[] = [];

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

export function ComposeNftApproval(nftUser: NFT[]): NftAddressAmount[] {
  let nftTokenContractArray: NftAddressAmount[] = [];

  for (let i = 0; i < nftUser.length; i += 2) {
    const amountOrId = BigInt(hexToNumber(nftUser[i]?.id?.tokenId));
    const addr = nftUser[i]?.contract?.address as `0x${string}`;
    if (amountOrId !== undefined && addr !== undefined) {
      nftTokenContractArray.push([addr, amountOrId]);
    }

    if (i + 1 < nftUser.length) {
      const nextAmountOrId = BigInt(hexToNumber(nftUser[i + 1]?.id?.tokenId));
      const nextAddr = nftUser[i + 1]?.contract?.address as `0x${string}`;

      if (nextAmountOrId !== undefined && nextAddr !== undefined) {
        nftTokenContractArray.push([nextAddr, nextAmountOrId]);
      }
    }
  }

  return nftTokenContractArray;
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
