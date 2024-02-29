import { EthereumAddress } from "@/lib/shared/types";
import { createPublicClient, http } from "viem";
import { useEffect, useState } from "react";
import { mainnet } from "viem/chains";

export enum ENSAvatarQueryStatus {
  LOADING,
  SUCCESS,
  ERROR,
}

interface Props {
  ensAddress: EthereumAddress | null;
}

export const useEnsData = ({ ensAddress }: Props) => {
  const [primaryName, setPrimaryName] = useState<string | null | undefined>(
    undefined,
  );
  const [avatarQueryStatus, setAvatarQueryStatus] =
    useState<ENSAvatarQueryStatus>(ENSAvatarQueryStatus.LOADING);

  useEffect(() => {
    if (ensAddress) {
      const mainnetRPCUrl = process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP;

      if (!mainnetRPCUrl)
        throw new Error(
          "No RPC URL was defined for mainnet, cannot get ENS name without it.",
        );

      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      setAvatarQueryStatus(ENSAvatarQueryStatus.LOADING);

      mainnetClient
        .getEnsName({
          address: ensAddress.address as `0x${string}`,
        })
        .then((name) => {
          if (name) {
            setAvatarQueryStatus(ENSAvatarQueryStatus.SUCCESS);
            setPrimaryName(name);
          } else {
            setAvatarQueryStatus(ENSAvatarQueryStatus.ERROR);
            setPrimaryName(null);
          }
        })
        .catch(() => {
          setAvatarQueryStatus(ENSAvatarQueryStatus.ERROR);
          setPrimaryName(null);
        });
    } else {
      setPrimaryName(null);
    }
  }, [ensAddress]);

  return {
    primaryName,
    avatarQueryStatus: avatarQueryStatus,
    avatarSrc: primaryName
      ? `https://metadata.ens.domains/mainnet/avatar/${primaryName}`
      : null,
  };
};
