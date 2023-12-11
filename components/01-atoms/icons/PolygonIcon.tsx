import Image from "next/image";
import { SVGProps } from "react";

export const PolygonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <Image
      alt="Polygon Icon"
      src={"/matic-logo.png"}
      width={props.width ? Number(props.width) : 24}
      height={props.height ? Number(props.height) : 24}
    />
  );
};
