import { CopyIcon, ENSAvatar, ExternalLinkIcon } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { collapseAddress } from "@/lib/client/utils";
import React from "react";

export const EnsNameAndAddressWallet = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  const displayAddress =
    collapseAddress(authenticatedUserAddress?.toString() ?? "") || "";

  return (
    <div className="flex gap-3">
      {authenticatedUserAddress && (
        <>
          <ENSAvatar avatarENSAddress={authenticatedUserAddress} />

          <div className="flex flex-col">
            <div className="flex gap-2">
              {primaryName && (
                <>
                  <h3 className="text-sm ">{`${primaryName}`}</h3>
                  <h3 className="text-sm text-[#D6D5D5] dark:text-[#707572]">
                    |
                  </h3>
                </>
              )}
              <div className="flex items-center justify-start gap-1">
                <h3 className="text-sm">{`  ${displayAddress}`}</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      authenticatedUserAddress.toString(),
                    );
                  }}
                >
                  <div className="p-1">
                    <CopyIcon className="dark:text-[#F6F6F6] text-[#AABE13] w-4 h-4 " />
                  </div>
                </button>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-start">
              <h3 className="text-sm font-medium text-[#A3A9A5] ">
                View on explorer
              </h3>
              <div className="p-1">
                <ExternalLinkIcon className="dark:text-[#A3A9A5] text-[#AABE13] font-medium" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
