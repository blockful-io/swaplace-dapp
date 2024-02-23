import { ENSAvatar } from "@/components/01-atoms";
import { useEnsData } from "@/lib/client/hooks/useENSData";
import { collapseAddress } from "@/lib/client/utils";
import { EthereumAddress } from "@/lib/shared/types";

interface UserOfferInfoProps {
  address: EthereumAddress | null;
}

export const UserOfferInfo = ({ address }: UserOfferInfoProps) => {
  const { primaryName } = useEnsData({
    ensAddress: address,
  });
  const displayAddress = collapseAddress(address?.toString() ?? "") || "";
  return (
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
  );
};
