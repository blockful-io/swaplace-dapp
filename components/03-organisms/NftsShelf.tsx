/* eslint-disable react-hooks/exhaustive-deps */
import { NFT, ChainInfo, NFTsQueryStatus } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress } from "@/lib/shared/types";
import { SelectUserIcon, SwapContext } from "@/components/01-atoms";
import { NftsList } from "@/components/02-molecules";
import { getNftsFrom } from "@/lib/client/blockchain-data";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useNetwork } from "wagmi";

interface INftsShelfProps {
  address: string | null;
  variant: "your" | "their";
}

/**
 *
 * The Shelf component display the NFTs of given address.
 * @param address
 *
 * @returns Shelf Nfts based in status of given address
 */
export const NftsShelf = ({ address, variant }: INftsShelfProps) => {
  const { chain } = useNetwork();
  const [nftsList, setNftsList] = useState<NFT[]>();
  const [nftsQueryStatus, setNftsQueryStatus] = useState<NFTsQueryStatus>(
    NFTsQueryStatus.EMPTY_QUERY,
  );
  const { theme } = useTheme();

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { validatedAddressToSwap, inputAddress, destinyChain } =
    useContext(SwapContext);

  const showUserItems = async () => {
    const chainId =
      address === authenticatedUserAddress?.address
        ? chain?.id
        : ChainInfo[destinyChain].id;

    if (address && chainId) {
      getNftsFrom(address, chainId, setNftsQueryStatus)
        .then((nftsList) => {
          setNftsList(nftsList);
        })
        .catch(() => {
          setNftsList([]);
        });
    }
  };

  useEffect(() => {
    showUserItems();
  }, [address, chain, destinyChain]);

  useEffect(() => {
    if (
      authenticatedUserAddress &&
      address &&
      authenticatedUserAddress.equals(new EthereumAddress(address)) &&
      variant === "their"
    ) {
      setNftsList([]);
      setNftsQueryStatus(NFTsQueryStatus.EMPTY_QUERY);
    }
  }, [destinyChain]);

  useEffect(() => {
    if (address !== authenticatedUserAddress?.address && variant === "their") {
      setNftsList([]);
      setNftsQueryStatus(NFTsQueryStatus.EMPTY_QUERY);
    }
  }, [chain]);

  useEffect(() => {
    if (
      authenticatedUserAddress &&
      address &&
      new EthereumAddress(address) &&
      variant === "their"
    ) {
      setNftsList([]);
      setNftsQueryStatus(NFTsQueryStatus.EMPTY_QUERY);
    }
  }, [inputAddress]);

  useEffect(() => {
    if (!validatedAddressToSwap && variant === "their") {
      setNftsQueryStatus(NFTsQueryStatus.EMPTY_QUERY);
    }
  }, [validatedAddressToSwap]);

  return (
    <div className="w-full flex rounded-t-none overflow-y-auto lg:max-w-[600px] h-[356px] no-scrollbar">
      {nftsQueryStatus == NFTsQueryStatus.WITH_RESULTS && nftsList ? (
        <div className="flex h-full w-full justify-center items-center no-scrollbar ">
          <NftsList
            ownerAddress={address}
            nftsList={nftsList}
            variant={variant}
          />
        </div>
      ) : nftsQueryStatus == NFTsQueryStatus.EMPTY_QUERY || !address ? (
        <div className="flex w-full h-full bg-[#f8f8f8] dark:bg-[#212322]  justify-center items-center ">
          <div className="flex-col flex  items-center space-y-4">
            <div className="w-[80px] h-[80px] flex items-center border-[3px] rounded-full dark:border-[#DDF23D] border-[#A3A9A5] ">
              <SelectUserIcon
                className="w-[100px]"
                fill={theme == "dark" ? "#DDF23D" : "#A3A9A5"}
              />
            </div>
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              No user selected yet
            </p>
            <p className="dark:text-[#A3A9A5] font-onest font-normal text-[14px] leading-[20px]">
              Search for a user to start swapping items
            </p>
          </div>
        </div>
      ) : nftsQueryStatus == NFTsQueryStatus.NO_RESULTS ? (
        <div className="flex justify-center w-full h-full bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Given address has no NFTs associated in the given network
            </p>
          </div>
        </div>
      ) : nftsQueryStatus == NFTsQueryStatus.LOADING ? (
        <div className="flex justify-center w-full h-full bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Loading NFTs of{" "}
              {new EthereumAddress(address).getEllipsedAddress()}...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
