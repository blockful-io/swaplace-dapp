import { ENSAvatar } from "@/components/01-atoms";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { collapseAddress } from "@/lib/client/utils";
import { EthereumAddress } from "@/lib/shared/types";

export enum UserOfferVariant {
  DEFAULT = "default",
  SECUNDARY = "secundary",
}

type UserOfferVariants = UserOfferVariant | "default" | "secundary";

interface UserOfferInfoProps {
  address: EthereumAddress | null;
  variant?: UserOfferVariants;
}

export const UserOfferInfo = ({
  address,
  variant = "default",
}: UserOfferInfoProps) => {
  const { primaryName } = useEnsData({
    ensAddress: address,
  });
  const displayAddress = collapseAddress(address?.toString() ?? "") || "";
  return variant == UserOfferVariant.DEFAULT ? (
    <div>
      <div className="flex gap-2">
        <div>
          {address && <ENSAvatar avatarENSAddress={address} size="small" />}
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
  ) : (
    variant === UserOfferVariant.SECUNDARY && (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              {address && <ENSAvatar avatarENSAddress={address} size="small" />}
            </div>
            <div className="flex ">
              {primaryName ? (
                <p>{primaryName} gets</p>
              ) : (
                <p>{displayAddress} gets</p>
              )}
            </div>
          </div>
          <div className="flex-row flex">
            <p className="dark:p-small-dark p-small-variant-black">
              0.1639 ETH {/* Should change to retrieve the value */}
            </p>
            <p className="dark:p-small-dark dark:!text-[#A3A9A5] p-small-variant-black">
              &nbsp; ($252.15)
            </p>
          </div>
        </div>
      </div>
    )
  );
};
