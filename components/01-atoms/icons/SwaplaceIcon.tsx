import { SVGProps } from "react";

export const SwaplaceIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      fill={props.fill ? props.fill : "none"}
      viewBox="0 0 37 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <path
          id="Vector"
          d="M2.25775 23.1115L0.00238643 20.8419L0 8.21563L8.23947 0H12.0683L2.70596 9.34093L2.70835 20.4056H13.6276L26.3754 7.74596H28.3017V9.64371L14.7433 23.1115H2.25775Z"
          fill={props.fill ? props.fill : "#4F4F4F"}
        />
        <path
          id="Vector_2"
          d="M23.9699 23.1115L33.3275 13.7706L33.3251 2.70596H22.4059L9.14555 15.8781H7.2168V13.9804L21.2902 0H33.7781L36.0311 2.26967L36.0335 14.8935L27.7988 23.1115H23.9699Z"
          fill={props.fill ? props.fill : "#4F4F4F"}
        />
      </g>
    </svg>
  );
};
