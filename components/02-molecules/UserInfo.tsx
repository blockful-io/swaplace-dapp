import { AccountBalanceWalletSidebar } from "./AccountBalanceWalletSidebar";
import { EnsNameAndAddressWallet } from "@/components/02-molecules";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import React from "react";

export const UserInfo = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  useEnsData({
    ensAddress: authenticatedUserAddress,
  });

  return (
    <div>
      <EnsNameAndAddressWallet />
      <AccountBalanceWalletSidebar   />
    </div>
  );
};
