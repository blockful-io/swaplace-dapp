import { createPublicClient, http } from "viem";
import { useEffect, useState } from "react";
import { mainnet } from "viem/chains";
import { EthereumAddress } from "@/lib/shared/types";

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

  useEffect(() => {
    if (ensAddress) {
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      mainnetClient
        .getEnsName({
          address: ensAddress.address as `0x${string}`,
        })
        .then((name) => {
          console.log(name);
          setPrimaryName(name);
        })
        .catch(() => {
          setPrimaryName(null);
        });
    } else {
      setPrimaryName(null);
    }
  }, [ensAddress]);

  return {
    primaryName,
    avatarQueryStatus: ENSAvatarQueryStatus.LOADING,
    avatarSrc: primaryName
      ? `https://metadata.ens.domains/mainnet/avatar/${primaryName}`
      : null,
  };
};
