import { SVGProps } from "react";

export const SwapIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Swap" filter="url(#filter0_i_565_513)">
        <path
          id="Vector"
          d="M1.83435 9.53489C1.53153 9.83564 1.53153 10.3241 1.83435 10.6248L4.16007 12.9346C4.4629 13.2353 4.95469 13.2353 5.25751 12.9346C5.56034 12.6338 5.56034 12.1454 5.25751 11.8447L4.25455 10.8486H11.6847C12.1135 10.8486 12.46 10.5045 12.46 10.0787C12.46 9.65279 12.1135 9.30873 11.6847 9.30873H4.25455L5.25751 8.31264C5.56034 8.01189 5.56034 7.52346 5.25751 7.22271C4.95469 6.92196 4.4629 6.92196 4.16007 7.22271L1.83435 9.53249V9.53489ZM9.90894 1.06572C9.60612 0.764968 9.11432 0.764968 8.8115 1.06572C8.50867 1.36647 8.50867 1.85489 8.8115 2.15564L9.81204 3.14933L2.38187 3.14933C1.95306 3.14933 1.60663 3.49339 1.60663 3.91925C1.60663 4.34512 1.95306 4.68918 2.38187 4.68918L9.81204 4.68918L8.80907 5.68527C8.50625 5.98602 8.50625 6.47444 8.80907 6.77519C9.1119 7.07595 9.60369 7.07595 9.90652 6.77519L12.2322 4.46542C12.5351 4.16467 12.5351 3.67625 12.2322 3.37549L9.90652 1.06572H9.90894Z"
          fill="#F7F7F7"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_565_513"
          x="0"
          y="0"
          width="14"
          height="15"
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
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_565_513"
          />
        </filter>
      </defs>
    </svg>
  );
};
