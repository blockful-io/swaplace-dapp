import { useContext, useEffect, useState } from "react";
import { NFT, ChainInfo, NFTsQueryStatus } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { NftsList } from "../02-molecules";
import { getNftsFrom } from "@/lib/client/blockchain-data";
import { SwapContext, SwapIcon } from "../01-atoms";
import { EthereumAddress } from "@/lib/shared/types";
import { useNetwork } from "wagmi";

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
  const { chain } = useNetwork();
  const [nftsList, setNftsList] = useState<NFT[]>();
  const [nftsQueryStatus, setNftsQueryStatus] = useState<NFTsQueryStatus>(
    NFTsQueryStatus.EMPTY_QUERY
  );

  const { validatedAddressToSwap } = useContext(SwapContext);

  useEffect(() => {
    if (address && chain) {
      getNftsFrom(address, chain.id, setNftsQueryStatus)
        .then((nftsList) => {
          setNftsList(nftsList);
        })
        .catch(() => {
          setNftsList([]);
        });
    }
  }, [address, chain]);

  useEffect(() => {
    if (!validatedAddressToSwap) {
      setNftsQueryStatus(NFTsQueryStatus.EMPTY_QUERY);
    }
  }, [validatedAddressToSwap]);

  return (
    <div className="flex border-2 border-gray-200 border-t-0 rounded rounded-t-none">
      <div className="w-[100%] max-w-[580px] h-[500px] bg-[#f8f8f8] ">
        <div className="flex items-center ">
          {nftsQueryStatus == NFTsQueryStatus.WITH_RESULTS && nftsList ? (
            <div className="w-full h-full">
              <NftsList ownerAddress={address} nftsList={nftsList} />
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
                <p className="text-[#4F4F4F]">
                  Given address has no NFTs associated in the given network
                </p>
              </div>
            </div>
          ) : nftsQueryStatus == NFTsQueryStatus.LOADING ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#f8f8f8] p-4">
              <div className="flex items-center">
                <p className="text-[#4F4F4F]">
                  Loading NFTs of{" "}
                  {new EthereumAddress(address).getEllipsedAddress()}...
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
