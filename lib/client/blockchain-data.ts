import { Dispatch, SetStateAction } from "react";
import { NFTsQueryStatus, getRpcHttpUrlForNetwork } from "./constants";

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
