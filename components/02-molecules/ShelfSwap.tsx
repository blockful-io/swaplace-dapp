import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { NftCard } from "@/components/01-atoms/NftCard";
import { ADDRESS_ZERO, NFT, NFTLoadingStatus } from "@/lib/client/constants";

/**
 *
 * The Shelf component display the NFTs of given address.
 *
 * @returns Shelf Nfts based in status of given address
 */

export const ShelfSwap = ({ address }: any) => {
  const [nftData, setNftData] = useState<NFT[]>();
  const [nftStatus, setNftStatus] = useState<NFTLoadingStatus>(
    NFTLoadingStatus.NULL
  );

  const baseURL = process.env.NEXT_PUBLIC_ALCHEMY_HTTP;
  const url = `${baseURL}/getNFTs/?owner=${address}`;

  var requestOptions = {
    method: "get",
  };

  const nft: any[] = [];
  const fetchNft = async () => {
    fetch(url, requestOptions)
      .then(async (response) => {
        if (address == ADDRESS_ZERO) {
          setNftStatus(NFTLoadingStatus.NONE);
        }
        setNftStatus(NFTLoadingStatus.LOADING);
        const data = await response.json();
        for (let i = 0; i < data.ownedNfts.length; i++) {
          nft.push(data.ownedNfts[i].metadata);
        }
        if (nft.length == 0) {
          setNftStatus(NFTLoadingStatus.NONE);
        }
        if (nft.length > 0) {
          setNftStatus(NFTLoadingStatus.COMPLETED);
        }
        setNftData(nft);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchNft();
  }, [address]);

  return (
    <div className="flex">
      <div className="w-[580px] h-[500px] bg-[#e5e5e5] ">
        <div className="flex items-center ">
          {nftStatus == "NULL" ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>Select a user to start swapping</div>
              </div>
            </div>
          ) : nftStatus == "NONE" ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>
                  Given address has no NFTs associated in the given network
                </div>
              </div>
            </div>
          ) : nftStatus == "LOADING" ? (
            <div className="flex justify-center w-[580px] h-[500px] bg-[#e5e5e5] p-4">
              <div className="flex items-center">
                <div>Loading..</div>
              </div>
            </div>
          ) : (
            nftStatus == "COMPLETED" &&
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
