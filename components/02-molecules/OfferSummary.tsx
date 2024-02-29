import { TokensList } from ".";
import { TokensShelfVariant } from "../03-organisms";
import { EthereumAddress } from "@/lib/shared/types";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { PersonIcon, SwapContext } from "@/components/01-atoms";
import { useContext } from "react";

interface IOfferSummary {
  forAuthedUser: boolean;
}

export const OfferSummary = ({ forAuthedUser }: IOfferSummary) => {
  const {
    validatedAddressToSwap,
    authenticatedUserTokensList,
    searchedUserTokensList,
    inputAddress,
    userJustValidatedInput,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const tokensList = forAuthedUser
    ? authenticatedUserTokensList
    : searchedUserTokensList;

  return (
    <div className="w-full flex flex-col gap-4 pt-2 pb-4 dark:bg-[#212322] dark:border-[#434443] rounded-lg border">
      <div className="w-full px-3 sm:px-4 flex justify-between items-center h-9 gap-2">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <PersonIcon />
          </div>
          <div className="items-center">
            <p className="font-medium">
              {forAuthedUser && authenticatedUserAddress
                ? "You give"
                : forAuthedUser && !authenticatedUserAddress
                ? "Connect your wallet"
                : !forAuthedUser && validatedAddressToSwap && inputAddress
                ? `${
                    userJustValidatedInput
                      ? new EthereumAddress(
                          validatedAddressToSwap,
                        ).getEllipsedAddress() + " gives"
                      : "Use the search bar"
                  }`
                : "Use the search bar"}
            </p>
          </div>
        </div>
        {(!forAuthedUser && !validatedAddressToSwap) ||
        (forAuthedUser && !authenticatedUserAddress) ? null : (
          <div className="h-5">
            {tokensList.length} item
            {tokensList.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="w-full h-full min-h-[144px] rounded overflow-y-auto max-h-52 no-scrollbar">
        <TokensList
          withAddTokenCard={false}
          mobileTotalCards={tokensList.length}
          tabletTotalCards={tokensList.length}
          desktopTotalCards={tokensList.length}
          wideScreenTotalCards={tokensList.length}
          withSelectionValidation={false}
          ownerAddress={
            forAuthedUser && authenticatedUserAddress
              ? authenticatedUserAddress.address
              : validatedAddressToSwap
          }
          tokensList={tokensList}
          variant={
            forAuthedUser ? TokensShelfVariant.Your : TokensShelfVariant.Their
          }
        />
      </div>
    </div>
  );
};
