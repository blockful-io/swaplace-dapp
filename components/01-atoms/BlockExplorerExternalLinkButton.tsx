import { ExternalLinkIcon } from "@/components/01-atoms";
import { EthereumAddress } from "@/lib/shared/types";
import { useNetwork } from "wagmi";

export const BlockExplorerExternalLinkButton = ({
  address,
  label,
}: {
  address: EthereumAddress;
  label?: string;
}) => {
  const { chain } = useNetwork();

  if (!address) return null;

  const displayEllipsedAddress = address.getEllipsedAddress();

  const blockExplorer = `${
    chain?.blockExplorers?.default.url
  }/address/${address.toString()}`;

  return (
    <div className="flex">
      <a
        href={blockExplorer}
        target="_blank"
        className="flex gap-1 items-center justify-start"
      >
        <h3 className="p-medium">{label || displayEllipsedAddress}</h3>
        <div className="p-1">
          <ExternalLinkIcon className="p-medium" />
        </div>
      </a>
    </div>
  );
};
