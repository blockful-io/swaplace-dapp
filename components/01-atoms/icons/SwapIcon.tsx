import { SVGProps } from "react";

export const SwapIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_35_481)" filter="url(#filter0_i_35_481)">
        <path
          d="M91.6666 50C91.6666 27 72.9999 8.33331 49.9999 8.33331C26.9999 8.33331 8.33325 27 8.33325 50C8.33325 73 26.9999 91.6667 49.9999 91.6667C72.9999 91.6667 91.6666 73 91.6666 50ZM62.4999 27.0833L77.0833 41.6666L62.4999 56.25V45.8333H45.8333V37.5H62.4999V27.0833ZM37.4999 72.9166L22.9166 58.3333L37.4999 43.75V54.1666H54.1666V62.5H37.4999V72.9166Z"
          fill="#D7D7D7"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_35_481"
          x="0"
          y="0"
          width="100"
          height="102"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_35_481"
          />
        </filter>
        <clipPath id="clip0_35_481">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
