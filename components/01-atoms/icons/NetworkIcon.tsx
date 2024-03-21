import {
  ChainArbitrumSepoliaIcon,
  ChainBaseGoerliIcon,
  ChainBnbIcon,
  ChainEthereumSepoliaIcon,
  ChainFujiIcon,
  ChainNetworkDefaultIcon,
  ChainOptimismIcon,
  ChainPolygonIcon,
} from "@/components/01-atoms";
import { SupportedNetworks } from "@/lib/client/constants";
import { SVGProps } from "react";

export type NetworkVariants = SupportedNetworks | "default";

interface NetworkIconProps {
  props?: SVGProps<SVGSVGElement>;
  variant: NetworkVariants;
}

/**
 * This component will render the network Icons
 * The variants are the Supported Networks by the dApp
 *
 * The default variant is not a supported network.
 * It's only the icon when the user is not logged into the dApp.
 *
 **/
export const NetworkIcon = ({ variant = "default" }: NetworkIconProps) => {
  const NetworkIcons: Partial<Record<NetworkVariants, React.ReactElement>> = {
    [SupportedNetworks.ARBITRUMSEPOLIA]: <ChainArbitrumSepoliaIcon />,
    [SupportedNetworks.BASEGOERLI]: <ChainBaseGoerliIcon />,
    [SupportedNetworks.SEPOLIA]: <ChainEthereumSepoliaIcon />,
    [SupportedNetworks.FUJI]: <ChainFujiIcon />,
    [SupportedNetworks.BNB]: <ChainBnbIcon />,
    [SupportedNetworks.OPTIMISM]: <ChainOptimismIcon />,
    [SupportedNetworks.MUMBAI]: <ChainPolygonIcon />,
    default: (
      <ChainNetworkDefaultIcon className="dark:text-[#707572] text-[#A3A9A5]" />
    ),
  };

  return NetworkIcons[variant];
};
