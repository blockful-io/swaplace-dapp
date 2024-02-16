import { LoadingIndicator } from ".";
import {
  ENSAvatarQueryStatus,
  useEnsData,
} from "@/lib/client/hooks/useENSData";
import { EthereumAddress } from "@/lib/shared/types";
import BoringAvatar from "boring-avatars";
import cc from "classcat";

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
  const { avatarQueryStatus, avatarSrc } = useEnsData({
    ensAddress: avatarENSAddress,
  });

  return (
    <div>
      {avatarQueryStatus === ENSAvatarQueryStatus.LOADING ? (
        <div
          className={cc([
            ENSAvatarClassName[size],
            "flex justify-center items-center",
          ])}
        >
          <LoadingIndicator />
        </div>
      ) : avatarQueryStatus === ENSAvatarQueryStatus.ERROR ? (
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
      ) : /* 
          Below condition will always be true since we only have 3 possible values 
          for avatarQueryStatus, being the third one ENSAvatarQueryStatus.SUCCESS:
          
          When the query is successful, avatarSrc will be defined
        */
      avatarSrc ? (
        <img
          src={avatarSrc}
          placeholder="empty"
          className={ENSAvatarClassName[size]}
          alt={`ENS Avatar for ${avatarENSAddress}`}
        />
      ) : null}
    </div>
  );
};
