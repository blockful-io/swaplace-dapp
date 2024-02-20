import { EnsNameAndAddressWallet } from "./EnsNameAndAddressWallet";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import React from "react";

export const UserInfo = () => {

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { avatarQueryStatus, avatarSrc, primaryName } = useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  console.log("avatarQueryStatus ", avatarQueryStatus)
  console.log("avatarSrc ", avatarSrc)
  console.log("primaryName ", primaryName)

  return (
    <div className="">
      <EnsNameAndAddressWallet />
    </div>
  );
};
