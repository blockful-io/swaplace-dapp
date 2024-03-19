import { ENSAvatar, ENSAvatarSize } from "@/components/01-atoms";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { EthereumAddress } from "@/lib/shared/types";

export enum UserOfferVariant {
  DEFAULT = "default",
  SECONDARY = "secondary",
}
interface UserOfferInfoProps {
  address: EthereumAddress | null;
  variant?: UserOfferVariant;
}

export const UserOfferInfo = ({
  address,
  variant = UserOfferVariant.DEFAULT,
}: UserOfferInfoProps) => {
  const { primaryName } = useEnsData({
    ensAddress: address,
  });
  const displayAddress = address?.getEllipsedAddress();

  return variant == UserOfferVariant.DEFAULT ? (
    <div>
      <div className="flex gap-2">
        <div>
          {address && (
            <ENSAvatar avatarENSAddress={address} size={ENSAvatarSize.SMALL} />
          )}
        </div>
        <div className="flex ">
          {primaryName ? (
            <p>{primaryName} gets</p>
          ) : (
            <p>{displayAddress} gets</p>
          )}
        </div>
      </div>
    </div>
  ) : variant === UserOfferVariant.SECONDARY ? (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>
            {address && (
              <ENSAvatar
                avatarENSAddress={address}
                size={ENSAvatarSize.SMALL}
              />
            )}
          </div>
          <div className="flex ">
            {primaryName ? (
              <p>{primaryName} gets</p>
            ) : (
              <p>{displayAddress} gets</p>
            )}
          </div>
        </div>
        {/* TODO > Include logic to calculate tokens value */}
        {/* <div className="flex-row flex">
            <p className="dark:p-small-dark p-small-variant-black">
              0.1639 ETH
            </p>
            <p className="dark:p-small-dark dark:!text-[#A3A9A5] p-small-variant-black">
              &nbsp; ($252.15)
            </p>
          </div> */}
      </div>
    </div>
  ) : (
    <></>
  );
};
