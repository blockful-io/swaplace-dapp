import { CopyIcon, ENSAvatar, ExternalLinkIcon } from "../01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { collapseAddress } from "@/lib/client/utils";
import React from "react";

export const EnsNameAndAddressWallet = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { avatarQueryStatus, avatarSrc, primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  console.log("avatarQueryStatus ", avatarQueryStatus);
  console.log("avatarSrc ", avatarSrc);
  console.log("primaryName ", primaryName);

  const displayAddress =
    collapseAddress(authenticatedUserAddress?.toString() ?? "") || "";

  return (
    <div className="flex gap-3">
      {authenticatedUserAddress && (
        <>
          <ENSAvatar avatarENSAddress={authenticatedUserAddress} />

          <div className="flex flex-col">
            <div>
              {primaryName && (
                <h3 className="text-sm">{`${primaryName} | `}</h3>
              )}
              <div className="flex items-center justify-start gap-1">
                <h3 className="text-sm">{displayAddress}</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(authenticatedUserAddress.toString());
                  }}
                >
                  <CopyIcon className="text-[#AABE13] w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <h3 className="text-sm font-medium text-[#A3A9A5]">
                View on explorer
              </h3>
              <ExternalLinkIcon className="text-[#AABE13] font-medium" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
