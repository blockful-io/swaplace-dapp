import { SupportedNetworks } from "@/lib/client/constants";
import arbitrumSepoliaIcon from "@/public/chains/arbitrumSepoliaIcon.png";
import sepoliaIcon from "@/public/chains/sepoliaIcon.png";
import baseGoerliIcon from "@/public/chains/baseGoerliIcon.png";
import FujiIcon from "@/public/chains/FujiIcon.png";
import bnbChainIcon from "@/public/chains/bnbChainIcon.png";
import optimismIcon from "@/public/chains/optimismIcon.png";
import polygonMumbai from "@/public/chains/polygonMumbai.png";
import Image from "next/image";
import { SVGProps } from "react";
import { useTheme } from "next-themes";

export type NetworkVariants = SupportedNetworks | "default";

interface NetworkIconProps {
  props?: SVGProps<SVGSVGElement>;
  variant: NetworkVariants;
}

/**
 * This component will render the network Icons
 * The variants are the Supported Networks by the dApp
 *
 **/
export const NetworkIcon = ({
  props,
  variant = "default",
}: NetworkIconProps) => {
  const { theme } = useTheme();

  const NetworkIcons: Partial<Record<NetworkVariants, React.ReactElement>> = {
    [SupportedNetworks.ARBITRUMSEPOLIA]: (
      <Image src={arbitrumSepoliaIcon} alt={"Arbitrum Sepolia"} />
    ),
    [SupportedNetworks.BASEGOERLI]: (
      <Image src={baseGoerliIcon} alt={"Base Goerli Icon"} />
    ),
    [SupportedNetworks.SEPOLIA]: (
      <Image src={sepoliaIcon} alt={"Sepolia Icon"} />
    ),
    [SupportedNetworks.FUJI]: <Image src={FujiIcon} alt={"Fuji Icon"} />,
    [SupportedNetworks.BNB]: <Image src={bnbChainIcon} alt={"BNB Icon"} />,
    [SupportedNetworks.OPTIMISM]: (
      <Image src={optimismIcon} alt={"Optimism Icon"} />
    ),
    [SupportedNetworks.MUMBAI]: (
      <Image src={polygonMumbai} alt={"Mumbai Icon"} />
    ),
    default: (
      <div className="p-[5px]">
        <svg
          {...props}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Network / Connect">
            <path
              id="Vector"
              d="M11.3278 4.63931C12.1772 4.43959 12.81 3.67681 12.81 2.76484C12.81 1.70128 11.9486 0.839844 10.885 0.839844C9.8407 0.839844 8.99129 1.67 8.96001 2.70469L4.53732 4.47569C4.18842 4.13159 3.71198 3.91984 3.18501 3.91984C2.12145 3.91984 1.26001 4.78128 1.26001 5.84484C1.26001 6.90841 2.12145 7.76984 3.18501 7.76984C3.47857 7.76984 3.7577 7.70487 4.00554 7.58697L7.50904 10.6525C7.45129 10.8354 7.42001 11.0327 7.42001 11.2348C7.42001 12.2984 8.28145 13.1598 9.34501 13.1598C10.4086 13.1598 11.27 12.2984 11.27 11.2348C11.27 10.5683 10.9331 9.98119 10.4182 9.63709L11.3278 4.63931ZM5.02098 6.42716C5.07392 6.26112 5.1052 6.08547 5.11001 5.905L9.5327 4.13641C9.61932 4.22062 9.71076 4.29762 9.81182 4.365L8.90226 9.36038C8.76992 9.39166 8.64239 9.43497 8.52207 9.49272L5.02098 6.42716Z"
              fill={theme === "dark" ? "#707572" : "#A3A9A5"}
            />
          </g>
        </svg>
      </div>
    ),
  };

  return NetworkIcons[variant] || <></>;
};
