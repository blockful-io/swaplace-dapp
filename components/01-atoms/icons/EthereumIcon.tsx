import Image from "next/image";
import { SVGProps } from "react";

export const EthereumIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <Image
      alt="Ethereum Icon"
      src={"/ethereum-circle-logo.png"}
      width={props.width ? Number(props.width) : 24}
      height={props.height ? Number(props.height) : 24}
    />
  );
};
