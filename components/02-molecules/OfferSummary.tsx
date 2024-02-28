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
  const emptySquaresDefault = EmptyNftsCards(0, 4, 8, 12, 12);
  const emptySquaresAuthUser = EmptyNftsCards(nftAuthUser.length, 4, 8, 12, 12);
  const emptySquaresInputUser = EmptyNftsCards(
    nftInputUser.length,
    4,
    8,
    12,
    12,
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
    <div className="w-full flex flex-col gap-4 px-3 pt-2 pb-4 dark:bg-[#212322] dark:border-[#434443] rounded-lg border">
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

      <div className="w-full h-full min-h-[144px] rounded p-4 overflow-auto max-h-52 no-scrollbar">
        <div className="w-full grid grid-cols-2 md:grid-cols-6  xl:grid-cols-4 gap-3 ">
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
  );
};
