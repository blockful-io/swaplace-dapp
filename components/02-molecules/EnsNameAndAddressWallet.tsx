import { CopyAdressButton } from "@/components/02-molecules";
import {
  BlockExplorerExternalLinkButton,
  ENSAvatar,
} from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";

export const EnsNameAndAddressWallet = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  if (!authenticatedUserAddress) return null;

  const displayAddress = authenticatedUserAddress?.getEllipsedAddress();

  return (
    <div className="flex gap-3 pb-5">
      {authenticatedUserAddress && (
        <>
          <ENSAvatar avatarENSAddress={authenticatedUserAddress} />
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-2">
              {primaryName && (
                <>
                  <h3 className="text-sm ">{`${primaryName}`}</h3>
                  <h3 className="text-sm text-[#D6D5D5] dark:text-[#707572]">
                    |
                  </h3>
                </>
              )}
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
