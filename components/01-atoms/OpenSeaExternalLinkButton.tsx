import { ExternalLinkIcon } from "@/components/01-atoms";
import { EthereumAddress } from "@/lib/shared/types";
import { useNetwork } from "wagmi";

export const OpenSeaExternalLinkButton = ({
  contractAddress,
  tokenId,
  label,
}: {
  contractAddress: EthereumAddress;
  tokenId: number;
  label?: string;
}) => {
  const { chain } = useNetwork();

  if (!contractAddress) return null;

  const displayEllipsedAddress = tokenId.toString();

  const openSeaExplorer = `https://testnets.opensea.io/assets/${chain?.name.toLowerCase()}/${contractAddress.toString()}/${tokenId}`;

  return (
    <div className="flex">
      <a
        href={openSeaExplorer}
        target="_blank"
        className="flex gap-1 items-center justify-start"
      >
        <h3 className="text-md">{label || `#${displayEllipsedAddress}`}</h3>
        <div className="p-1">
          <ExternalLinkIcon className="p-medium dark:text-white" />
        </div>
      </a>
    </div>
  );
};
