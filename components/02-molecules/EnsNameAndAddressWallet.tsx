import { CopyAdressButton } from ".";
import { ENSAvatar, ExternalLinkIcon } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { collapseAddress } from "@/lib/client/utils";
import React from "react";
import { useNetwork } from "wagmi";

export const EnsNameAndAddressWallet = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const stringAddress = authenticatedUserAddress?.toString();

  const { primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  const { chain } = useNetwork();

  const blockExplorer = `${chain?.blockExplorers?.default.url}/address/${stringAddress}`;

  const displayAddress = collapseAddress(stringAddress ?? "") || "";

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
            <div className="flex">
              <a
                href={blockExplorer}
                target="_blank"
                className="flex gap-1 items-center justify-start"
              >
                <h3 className="text-sm font-medium text-[#A3A9A5] ">
                  View on explorer
                </h3>
                <div className="p-1">
                  <ExternalLinkIcon className="dark:text-[#A3A9A5] text-[#AABE13] font-medium" />
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
