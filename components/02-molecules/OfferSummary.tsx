import { EthereumAddress } from "@/lib/shared/types";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { NftCard } from "@/components/02-molecules";
import {
  ENSAvatar,
  EmptyNftsCards,
  PersonIcon,
  SwapContext,
} from "@/components/01-atoms";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { useContext, useEffect, useState } from "react";

interface IOfferSummary {
  forAuthedUser: boolean;
}

export const OfferSummary = ({ forAuthedUser }: IOfferSummary) => {
  const {
    validatedAddressToSwap,
    nftAuthUser,
    nftInputUser,
    inputAddress,
    userJustValidatedInput,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const emptySquaresDefault = EmptyNftsCards(0, 6, 10, 8, 12, "medium");
  const emptySquaresAuthUser = EmptyNftsCards(
    nftAuthUser.length,
    6,
    10,
    8,
    12,
    "medium",
  );
  const emptySquaresInputUser = EmptyNftsCards(
    nftInputUser.length,
    6,
    10,
    8,
    12,
    "medium",
  );

  const nftUser = forAuthedUser ? nftAuthUser : nftInputUser;
  const [searchedEthereumAdress, setSearchedEthereumAddress] =
    useState<EthereumAddress | null>(null);

  const { primaryName: walletENSName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });
  const { primaryName: searchedENSName } = useEnsData({
    ensAddress: searchedEthereumAdress as unknown as EthereumAddress,
  });

  useEffect(() => {
    if (validatedAddressToSwap && userJustValidatedInput && inputAddress) {
      const newAddress = new EthereumAddress(validatedAddressToSwap);
      setSearchedEthereumAddress(newAddress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatedAddressToSwap]);

  return (
    <div className="w-full h-full dark:bg-[#282B29] border dark:border-[#353836] rounded-lg ">
      <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
        <div className="flex justify-between items-center h-9 gap-2">
          <div className="flex space-x-2">
            <div className="flex items-center">
              {!forAuthedUser && authenticatedUserAddress && walletENSName ? (
                <ENSAvatar
                  avatarENSAddress={authenticatedUserAddress}
                  size="small"
                />
              ) : forAuthedUser && validatedAddressToSwap ? (
                <ENSAvatar
                  avatarENSAddress={new EthereumAddress(validatedAddressToSwap)}
                  size="small"
                />
              ) : (
                <PersonIcon />
              )}
            </div>
            <div className="items-center">
              <p className="font-medium">
                {!forAuthedUser && authenticatedUserAddress && walletENSName
                  ? `${walletENSName} gets`
                  : !forAuthedUser && authenticatedUserAddress
                  ? `${new EthereumAddress(
                      authenticatedUserAddress.address,
                    ).getEllipsedAddress()} gets`
                  : !forAuthedUser
                  ? `You Get`
                  : forAuthedUser &&
                    validatedAddressToSwap &&
                    inputAddress &&
                    searchedENSName
                  ? `${searchedENSName} gets`
                  : forAuthedUser && validatedAddressToSwap && inputAddress
                  ? `${new EthereumAddress(
                      validatedAddressToSwap,
                    ).getEllipsedAddress()} gets`
                  : (forAuthedUser && !validatedAddressToSwap) || !inputAddress
                  ? `They get`
                  : `Use the search bar`}
              </p>
            </div>
          </div>
          {!forAuthedUser && !validatedAddressToSwap ? null : (
            <div>
              {nftUser.length} item
              {nftUser.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="w-full h-full max-h-[156px] rounded overflow-auto no-scrollbar">
          <div className="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 gap-3  ">
            {(forAuthedUser && !authenticatedUserAddress?.address) ||
            (!forAuthedUser && !validatedAddressToSwap) ? null : (
              <>
                {nftUser.map((nft, index) => (
                  <NftCard
                    key={index}
                    withSelectionValidation={false}
                    ownerAddress={
                      forAuthedUser
                        ? authenticatedUserAddress
                          ? authenticatedUserAddress.address
                          : null
                        : validatedAddressToSwap
                    }
                    nftData={nft}
                    styleType="medium"
                  />
                ))}
              </>
            )}

            {forAuthedUser
              ? emptySquaresAuthUser
              : !forAuthedUser
              ? emptySquaresInputUser
              : emptySquaresDefault}
          </div>
        </div>
      </div>
    </div>
  );
};
