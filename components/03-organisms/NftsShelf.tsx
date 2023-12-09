import fetch from "node-fetch";
import { useEffect, useState } from "react";
import {
  NFT,
  ChainID,
  NFTsQueryStatus,
  getRpcHttpUrlForNetwork,
} from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { NftsList } from "../02-molecules";
import { getNftsFrom } from "@/lib/client/blockchain-data";
import { SwapIcon } from "../01-atoms";

/**
 *
 * The Shelf component display the NFTs of given address.
 *
 * @returns Shelf Nfts based in status of given address
 */

interface INftsShelfProps {
  address: string | null;
}

export const NftsShelf = ({ address }: INftsShelfProps) => {
  const { preferredChainId } = useAuthenticatedUser();
  const [nftsList, setNftsList] = useState<NFT[]>();
  const [nftsQueryStatus, setNftsQueryStatus] = useState<NFTsQueryStatus>(
    NFTsQueryStatus.EMPTY_QUERY
  );

  useEffect(() => {
    if (address && preferredChainId) {
      getNftsFrom(address, ChainID[preferredChainId], setNftsQueryStatus)
        .then((nftsList) => {
          setNftsList(nftsList);
        })
        .catch(() => {
          setNftsList([]);
        });
    }
  }, [address, preferredChainId]);

  return (
    <div className="flex border-2 border-gray-200 border-t-0 rounded rounded-t-none">
      <div className="w-[100%] max-w-[580px] h-[500px] bg-[#f8f8f8] ">
        <div className="flex items-center ">
          {nftsQueryStatus == NFTsQueryStatus.WITH_RESULTS && nftsList ? (
            <div className="w-full h-full">
              <NftsList nftsList={nftsList} />
            </div>
          ) : nftsQueryStatus == NFTsQueryStatus.EMPTY_QUERY || !address ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#f8f8f8] p-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <SwapIcon className="w-[100px]" />
                <p className="text-[#4F4F4F]">
                  Select a user to start swapping
                </p>
              </div>
            </div>
          ) : nftsQueryStatus == NFTsQueryStatus.NO_RESULTS ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#f8f8f8] p-4">
              <div className="flex items-center">
                <div>
                  Given address has no NFTs associated in the given network
                </div>
              </div>
            </div>
          ) : nftsQueryStatus == NFTsQueryStatus.LOADING ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#f8f8f8] p-4">
              <div className="flex items-center">
                <div>Loading..</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
