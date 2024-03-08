import { ENSAvatar, PersonIcon, SwapContext } from "@/components/01-atoms";
import { TokenCardStyleType, TokensList } from "@/components/02-molecules";
import { TokensShelfVariant } from "@/components/03-organisms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
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
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const tokensList =
    variant === TokensShelfVariant.Your
      ? authenticatedUserTokensList
      : searchedUserTokensList;

  const { primaryName: searchedENSName } = useEnsData({
    ensAddress: validatedAddressToSwap,
  });

  return (
    <div className="w-full h-full dark:bg-[#282B29] border dark:border-[#353836] bg-[#F0EEEE] border-[#E4E4E4] rounded-lg ">
      <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
        <div className="flex justify-between items-center h-9 gap-2">
          <div className="flex space-x-2 items-center">
            <div className="flex items-center">
              {variant === TokensShelfVariant.Your &&
              authenticatedUserAddress ? (
                <ENSAvatar
                  avatarENSAddress={authenticatedUserAddress}
                  size="small"
                />
              ) : variant === TokensShelfVariant.Their &&
                validatedAddressToSwap ? (
                <ENSAvatar
                  avatarENSAddress={validatedAddressToSwap}
                  size="small"
                />
              ) : (
                <PersonIcon />
              )}
            </div>
            <div className="items-center">
              <p className="p-small-variant-black-3 dark:p-small-variant-light-2 contrast-50">
                {variant === TokensShelfVariant.Your && authenticatedUserAddress
                  ? "You give"
                  : variant === TokensShelfVariant.Your &&
                    !authenticatedUserAddress
                  ? "Connect your wallet"
                  : variant === TokensShelfVariant.Their &&
                    validatedAddressToSwap &&
                    inputAddress
                  ? `${
                      searchedENSName
                        ? searchedENSName + " gives"
                        : validatedAddressToSwap
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
            <div className="contrast-50">
              {tokensList.length} item
              {tokensList.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
        <div className="w-full h-full max-h-[156px] rounded overflow-auto no-scrollbar">
          {variant === TokensShelfVariant.Your && authenticatedUserAddress ? (
            <TokensList
              withAddTokenCard={false}
              displayERC20TokensAmount={true}
              withSelectionValidation={false}
              ownerAddress={authenticatedUserAddress}
              tokensList={tokensList}
              variant={variant}
              wideScreenTotalCards={10}
              desktopTotalCards={8}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 gap-3"
            />
          ) : variant === TokensShelfVariant.Their && validatedAddressToSwap ? (
            <TokensList
              withAddTokenCard={false}
              displayERC20TokensAmount={true}
              withSelectionValidation={false}
              ownerAddress={validatedAddressToSwap}
              tokensList={tokensList}
              variant={variant}
              wideScreenTotalCards={10}
              desktopTotalCards={8}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 gap-3"
            />
          ) : (
            <TokensList
              withAddTokenCard={false}
              displayERC20TokensAmount={true}
              withSelectionValidation={false}
              ownerAddress={null}
              tokensList={tokensList}
              variant={variant}
              wideScreenTotalCards={10}
              desktopTotalCards={8}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 gap-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
