/**
 * Component that displays the authenticated user's ENS name and address wallet.
 *
 * This component utilizes the `useAuthenticatedUser` hook to retrieve the authenticated user's address.
 * It also includes commented sections that are intended for future use with ENS (Ethereum Name Service) data.
 *
 * The commented sections include:
 * - `useEnsData` hook: This hook is used to fetch ENS data, such as the primary name associated with an address.
 * - `ENSAvatar` component: This component is used to display the ENS avatar for a given address.
 *
 * @deprecated
 * These sections are currently commented out because the `ens-avatar-searched-address` has issues fetching the correct address.
 *
 * The component renders a copy address button and a block explorer external link button if the authenticated user's address is available.
 *
 * import { useEnsData } from "@/lib/client/hooks/useENSData";
 * import { ENSAvatar  } from "@/components/01-atoms";
 */

import { CopyAdressButton } from "@/components/02-molecules";
import { BlockExplorerExternalLinkButton } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const EnsNameAndAddressWallet = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  /**
  const { primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });
  */

  if (!authenticatedUserAddress) return null;

  const displayAddress = authenticatedUserAddress?.getEllipsedAddress();

  return (
    <div className="flex gap-3 pb-5">
      {authenticatedUserAddress && (
        <>
          {/**
           * @deprecated
           * The Ethereum address related ENS primary name getter function is
           * under refactoring, thus, this feature is currently commented out.
           *
           * <ENSAvatar avatarENSAddress={authenticatedUserAddress} />
           */}
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-2">
              {/* {primaryName && (
                <>
                  <h3 className="text-sm ">{`${primaryName}`}</h3>
                  <h3 className="text-sm text-softGray dark:text-mediumGray">
                    |
                  </h3>
                </>
              )} */}
              <CopyAdressButton
                authenticatedUserAddress={authenticatedUserAddress.toString()}
                displayAddress={displayAddress}
              />
            </div>
            <BlockExplorerExternalLinkButton
              address={authenticatedUserAddress}
              label="View on explorer"
            />
          </div>
        </>
      )}
    </div>
  );
};
