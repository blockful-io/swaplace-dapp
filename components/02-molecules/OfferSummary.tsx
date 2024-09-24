import { ForWhom } from "../03-organisms";
import { PersonIcon } from "@/components/01-atoms";
import {
  EtherFieldAddition,
  TokenCardStyleType,
  TokensList,
} from "@/components/02-molecules";
import { ADDRESS_ZERO } from "@/lib/client/constants";
import { SwapContext } from "@/lib/client/contexts";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
/**
 *  @deprecated
 *
 *  import { useEnsData } from "@/lib/client/hooks/useENSData";
 */
import { useContext } from "react";

/**
 * OfferSummary component displays a summary of token offers for a given user.
 *
 * @param {ForWhom} variant - Specifies whether the summary is for the authenticated user or another user.
 *
 *
 * @remarks
 * This component uses the `SwapContext` to fetch the necessary data for rendering the token offers.
 * It also utilizes the `useAuthenticatedUser` hook to get the authenticated user's address.
 *
 * The component conditionally renders different sections based on the `variant` prop:
 * - If `variant` is `ForWhom.Yours`, it displays the authenticated user's token offers.
 * - If `variant` is `ForWhom.Their`, it displays the searched user's token offers.
 *
 * The ENS-related sections are currently commented out due to issues with fetching the correct ENS address.
 * These sections include:
 * - Displaying the ENS avatar for the searched address.
 * - Displaying the ENS name for the searched address.
 *
 * These sections are currently commented out because the `ens-avatar-searched-address` has issues fetching the correct address.
 * Since the ENS are not working properly. We're commenting those sections.
 */
export const OfferSummary = ({ variant }: { variant: ForWhom }) => {
  const {
    validatedAddressToSwap,
    authenticatedUserTokensList,
    searchedUserTokensList,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const tokensList =
    variant === ForWhom.Yours
      ? authenticatedUserTokensList
      : searchedUserTokensList;

  /**
   * const { primaryName: searchedENSName } = useEnsData({
   *  ensAddress: validatedAddressToSwap,
   * });
   * const { primaryName: authenticatedUserENSName } = useEnsData({
   *  ensAddress: authenticatedUserAddress,
   * });
   */

  return (
    <div className="w-full h-full dark:bg-darkGreen border dark:border-darkGray bg-[#F0EEEE] borderlightSilver rounded-lg ">
      <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
        <div className="flex justify-between items-center h-9 gap-2">
          <div className="flex space-x-2 items-center">
            <div className="flex items-center">
              {/* {variant === ForWhom.Their && validatedAddressToSwap ? (
               *<ENSAvatar
               *  avatarENSAddress={validatedAddressToSwap}
               *  size={ENSAvatarSize.SMALL}
               *  />
               *) : variant === ForWhom.Yours && authenticatedUserAddress ? (
               *  <ENSAvatar
               *    avatarENSAddress={authenticatedUserAddress}
               *    size={ENSAvatarSize.SMALL}
               *  />
               *) : ( */}
              <div className="bg-lightSilver dark:bg-darkGray p-[5px] rounded-md">
                <PersonIcon
                  size="14"
                  className="text-sageGray dark:text-mediumGray"
                />
              </div>
              {/* )} */}
            </div>
            <div className="items-center">
              <p className="p-small-variant-black-3 dark:p-small-variant-light-2 contrast-50">
                {variant === ForWhom.Their && validatedAddressToSwap
                  ? `${
                      /**
                       * searchedENSName
                       * ? `${searchedENSName} offers`
                       *
                       *
                       */
                      validatedAddressToSwap
                        ? `${
                            validatedAddressToSwap.address === ADDRESS_ZERO
                              ? "Any user offers"
                              : validatedAddressToSwap.getEllipsedAddress() +
                                " offers"
                          } `
                        : "Use the search bar"
                    }`
                  : variant === ForWhom.Their && !validatedAddressToSwap
                  ? "They offer"
                  : variant === ForWhom.Yours && authenticatedUserAddress
                  ? `${
                      /**
                       * authenticatedUserENSName
                       * ? `${authenticatedUserENSName} offers`
                       */
                      authenticatedUserAddress
                        ? `${authenticatedUserAddress.getEllipsedAddress()} offers`
                        : "Connect your wallet"
                    }`
                  : "You offer"}
              </p>
            </div>
          </div>
          {variant === ForWhom.Yours && authenticatedUserAddress && (
            <EtherFieldAddition variant={ForWhom.Yours} />
          )}
          {variant === ForWhom.Their && validatedAddressToSwap && (
            <EtherFieldAddition variant={ForWhom.Their} />
          )}
        </div>
        <div className="w-full h-full max-h-[156px] rounded overflow-x-hidden overflow-y-auto no-scrollbar">
          {variant === ForWhom.Yours && authenticatedUserAddress ? (
            <TokensList
              withAddTokenCard={false}
              displayERC20TokensAmount={true}
              withSelectionValidation={false}
              ownerAddress={authenticatedUserAddress}
              tokensList={tokensList}
              variant={variant}
              wideScreenTotalCards={10}
              desktopTotalCards={6}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 gap-2 md:gap-3 xl:gap-3 lg:gap-3"
            />
          ) : variant === ForWhom.Their && validatedAddressToSwap ? (
            <TokensList
              withAddTokenCard={false}
              displayERC20TokensAmount={true}
              withSelectionValidation={false}
              ownerAddress={validatedAddressToSwap}
              tokensList={tokensList}
              variant={variant}
              wideScreenTotalCards={10}
              desktopTotalCards={6}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 gap-2 md:gap-3 xl:gap-3 lg:gap-3"
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
              desktopTotalCards={6}
              tabletTotalCards={12}
              mobileTotalCards={6}
              tokenCardStyleType={TokenCardStyleType.MEDIUM}
              gridClassNames="w-full grid grid-cols-3 md:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 gap-2 md:gap-3 xl:gap-3 lg:gap-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
