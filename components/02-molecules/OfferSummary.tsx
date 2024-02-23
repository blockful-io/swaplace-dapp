import { TokenCard } from ".";
import { EthereumAddress } from "@/lib/shared/types";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  PersonIcon,
  TokenCardsPlaceholder,
  SwapContext,
} from "@/components/01-atoms";
import { useEnsName } from "wagmi";
import { useContext } from "react";

interface IOfferSummary {
  forAuthedUser: boolean;
}

export const OfferSummary = ({ forAuthedUser }: IOfferSummary) => {
  const {
    validatedAddressToSwap,
    authenticatedUserTokensList,
    searchedUserTokensList,
  } = useContext(SwapContext);
  const { data } = useEnsName({
    address: validatedAddressToSwap as `0x${string}`,
  });

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const emptySquaresAuthUser = TokenCardsPlaceholder(
    authenticatedUserTokensList.length,
    4,
    8,
    12,
    12,
  );
  const emptySquaresInputUser = TokenCardsPlaceholder(
    searchedUserTokensList.length,
    4,
    8,
    12,
    12,
  );

  const nftUser = forAuthedUser
    ? authenticatedUserTokensList
    : searchedUserTokensList;

  return (
    <div className="w-full flex flex-col gap-4 px-3 pt-2 pb-4 dark:bg-[#212322] dark:border-[#434443] rounded-lg border">
      <div className="flex justify-between items-center h-9 gap-2">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <PersonIcon />
          </div>
          <div className="items-center">
            <p className="font-medium">
              {forAuthedUser
                ? "You give"
                : !forAuthedUser && !validatedAddressToSwap
                ? "Use the search bar!"
                : `${
                    data
                      ? data
                      : new EthereumAddress(
                          validatedAddressToSwap,
                        ).getEllipsedAddress()
                  } gives`}
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

      <div className="w-full h-full min-h-[144px] rounded p-4 overflow-auto max-h-52">
        <div className="w-full grid grid-cols-2 md:grid-cols-6  xl:grid-cols-4 gap-3 ">
          {(forAuthedUser && !authenticatedUserAddress?.address) ||
          (!forAuthedUser && !validatedAddressToSwap) ? null : (
            <>
              {nftUser.map((nft, index) => (
                <TokenCard
                  key={index}
                  withSelectionValidation={false}
                  ownerAddress={
                    forAuthedUser
                      ? authenticatedUserAddress
                        ? authenticatedUserAddress.address
                        : null
                      : validatedAddressToSwap
                  }
                  tokenData={nft}
                />
              ))}

              {forAuthedUser && emptySquaresAuthUser}
              {!forAuthedUser && emptySquaresInputUser}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
