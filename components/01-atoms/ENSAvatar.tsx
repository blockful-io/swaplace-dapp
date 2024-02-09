import { mainnet } from "viem/chains";
import { useEffect, useState } from "react";
import { EthereumAddress } from "@/lib/shared/types";
import { publicClient } from "@/lib/wallet/wallet-config";
import BoringAvatar from "boring-avatars";
import { createPublicClient, http } from "viem";

enum ENSAvatarSize {
  SMALL = "small",
  MEDIUM = "medium",
}

const ENSAvatarClassName = {
  [ENSAvatarSize.SMALL]: "ens-avatar-small",
  [ENSAvatarSize.MEDIUM]: "ens-avatar-medium",
};

interface ENSAvatarProps {
  avatarENSAddress: EthereumAddress;
  size?: ENSAvatarSize;
}

export const ENSAvatar = ({
  avatarENSAddress,
  size = ENSAvatarSize.MEDIUM,
}: ENSAvatarProps) => {
  const [primaryName, setPrimaryName] = useState<string | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const mainnetClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    mainnetClient
      .getEnsName({
        address: avatarENSAddress.address as `0x${string}`,
      })
      .then((name) => {
        console.log(name);
        setPrimaryName(name);
      })
      .catch(() => {
        setPrimaryName(null);
      });
  }, []);

  return (
    <div>
      {typeof primaryName === undefined ? (
        <div className={ENSAvatarClassName[size]}>
          <BoringAvatar
            variant="sunset"
            colors={["#A3A9A5"]}
            data-atropos-offset="2"
            name={avatarENSAddress.toString()}
          />
        </div>
      ) : primaryName === null ? (
        <div className={ENSAvatarClassName[size]}>
          <BoringAvatar
            variant="bauhaus"
            data-atropos-offset="2"
            name={avatarENSAddress.toString()}
            square={true}
            colors={[
              "#353836",
              "#212322",
              "#DDF23D",
              "#A3A9A5",
              "#05332B",
              "#F6F6F1",
            ]}
          />
        </div>
      ) : (
        <img
          placeholder="empty"
          className={ENSAvatarClassName[size]}
          alt={`ENS Avatar for ${avatarENSAddress}`}
          src={`https://metadata.ens.domains/mainnet/avatar/${primaryName}`}
        />
      )}
    </div>
  );
};
