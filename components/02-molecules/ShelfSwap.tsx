import fetch from "node-fetch";
import { useContext, useEffect, useState } from "react";
import { NftCard } from "@/components/01-atoms/NftCard";
import {
  ADDRESS_ZERO,
  ChainID,
  NFT,
  NFTsQueryState,
  getRpcHttpUrlForNetwork,
} from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useWalletClient } from "wagmi";
import { SwapContext } from "../01-atoms";

/**
 *
 * The Shelf component display the NFTs of given address.
 *
 * @returns Shelf Nfts based in status of given address
 */

interface IShelfSwapProps {
  address: string | null;
}

export const ShelfSwap = ({ address }: IShelfSwapProps) => {
  const { preferredChainId } = useAuthenticatedUser();
  const [nftData, setNftData] = useState<NFT[]>();
  const [nftStatus, setNftStatus] = useState<NFTsQueryState>(
    NFTsQueryState.EMPTY_QUERY
  );

  const { data: walletClient } = useWalletClient();
  console.log("walletchain", walletClient?.chain.id);

  const baseUrl = getRpcHttpUrlForNetwork.get(ChainID[preferredChainId]);

  if (!baseUrl) throw new Error("No RPC URL defined for connected chain");

  const url = `${baseUrl}/getNFTs/?owner=${address}`;

  var requestOptions = {
    method: "get",
  };

  const nftsList: any[] = [];
  const fetchNft = async () => {
    setNftStatus(NFTsQueryState.LOADING);

    fetch(url, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log("data-response", data);

        for (let i = 0; i < data.ownedNfts.length; i++) {
          nftsList.push(data.ownedNfts[i].metadata);
        }

        if (nftsList.length == 0) {
          setNftStatus(NFTsQueryState.NO_RESULTS);
        } else {
          setNftStatus(NFTsQueryState.WITH_RESULTS);
        }

        setNftData(nftsList);
      })
      .catch((error) => {
        console.log("error", error);
        setNftStatus(NFTsQueryState.ERROR);
      });
  };

  useEffect(() => {
    if (address) {
      fetchNft();
    }
  }, [address, preferredChainId]);

  return (
    <div className="flex">
      <div className="w-[580px] h-[500px] bg-[#e5e5e5] ">
        <div className="flex items-center ">
          {nftStatus == NFTsQueryState.EMPTY_QUERY || !address ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>Select a user to start swapping</div>
              </div>
            </div>
          ) : nftStatus == NFTsQueryState.NO_RESULTS ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>
                  Given address has no NFTs associated in the given network
                </div>
              </div>
            </div>
          ) : nftStatus == NFTsQueryState.LOADING ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>Loading..</div>
              </div>
            </div>
          ) : (
            nftStatus == NFTsQueryState.WITH_RESULTS &&
            nftData && (
              <div className="w-full h-full">
                <NftCard nftsOwner={nftData} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
