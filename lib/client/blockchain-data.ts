import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { NFT, NFTsQueryStatus, getRpcHttpUrlForNetwork } from "./constants";
import { publicClient } from "../wallet/wallet-config";
import { getTimestamp } from "./utils";

export const getNftsFrom = async (
  address: string,
  chainId: number,
  stateSetter: Dispatch<SetStateAction<NFTsQueryStatus>>
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
      console.log(data);

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
  expiration: any
) {
  const config = await Contract.packData(
    allowed,
    destinationChainSelector,
    expiration
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
  chainId: number
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
    expiration
  );

  const swap: Swap = {
    owner: owner,
    config: config,
    biding: biding,
    asking: asking,
  };

  return swap;
}
