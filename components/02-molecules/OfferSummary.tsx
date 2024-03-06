import { TokensList } from ".";
import { TokensShelfVariant } from "../03-organisms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { PersonIcon, SwapContext } from "@/components/01-atoms";
import { useContext } from "react";

interface IOfferSummary {
  variant: TokensShelfVariant;
}

export const OfferSummary = ({ variant }: IOfferSummary) => {
  const {
    validatedAddressToSwap,
    authenticatedUserTokensList,
    searchedUserTokensList,
    inputAddress,
    userJustValidatedInput,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const tokensList =
    variant === TokensShelfVariant.Your
      ? authenticatedUserTokensList
      : searchedUserTokensList;

  return (
    <div className="w-full flex flex-grow h-max flex-col gap-4 pt-2 pb-4 dark:bg-[#212322] dark:border-[#434443] rounded-lg border">
      <div className="w-full flex-shrink px-3 sm:px-4 flex justify-between items-center h-9 gap-2">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <PersonIcon />
          </div>
          <div className="items-center">
            <p className="font-medium">
              {variant === TokensShelfVariant.Your && authenticatedUserAddress
                ? "You give"
                : variant === TokensShelfVariant.Your &&
                  !authenticatedUserAddress
                ? "Connect your wallet"
                : variant === TokensShelfVariant.Their &&
                  validatedAddressToSwap &&
                  inputAddress
                ? `${
                    userJustValidatedInput
                      ? validatedAddressToSwap.getEllipsedAddress() + " gives"
                      : "Use the search bar"
                  }`
                : "Use the search bar"}
            </p>
          </div>
        </div>
        {(variant === TokensShelfVariant.Their && !validatedAddressToSwap) ||
        (variant === TokensShelfVariant.Your &&
          !authenticatedUserAddress) ? null : (
          <div className="h-5">
            {tokensList.length} item
            {tokensList.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="w-full h-max flex flex-grow min-h-[144px] rounded overflow-y-auto no-scrollbar px-4">
        {variant === TokensShelfVariant.Your && authenticatedUserAddress ? (
          <TokensList
            withAddTokenCard={false}
            withPlaceholders={false}
            displayERC20TokensAmount={true}
            withSelectionValidation={false}
            ownerAddress={authenticatedUserAddress}
            tokensList={tokensList}
            variant={variant}
          />
        ) : variant === TokensShelfVariant.Their && validatedAddressToSwap ? (
          <TokensList
            withAddTokenCard={false}
            withPlaceholders={false}
            displayERC20TokensAmount={true}
            withSelectionValidation={false}
            ownerAddress={validatedAddressToSwap}
            tokensList={tokensList}
            variant={variant}
          />
        ) : null}
      </div>
    </div>
  );
};
