import { SVGProps } from "react";

export enum SwapIconVariant {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}
interface SwapIconProps {
  props?: SVGProps<SVGSVGElement>;
  variant?: SwapIconVariant;
}

export const SwapIcon = ({
  props,
  variant = SwapIconVariant.HORIZONTAL,
}: SwapIconProps) => {
  const SwapIcons: Partial<Record<SwapIconVariant, React.ReactElement>> = {
    [SwapIconVariant.HORIZONTAL]: (
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
            fill={"currentColor"}
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
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
    ),
    [SwapIconVariant.VERTICAL]: (
      <svg
        {...props}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Swap" filter="url(#filter0_i_2167_3884)">
          <path
            id="Vector"
            d="M5.10312 2.09668C4.7594 1.7506 4.20121 1.7506 3.85749 2.09668L1.21775 4.75464C0.874032 5.10073 0.874032 5.66278 1.21775 6.00887C1.56146 6.35496 2.11966 6.35496 2.46338 6.00887L3.60177 4.86262L3.60177 13.3542C3.60177 13.8443 3.99498 14.2402 4.48168 14.2402C4.96838 14.2402 5.36159 13.8443 5.36159 13.3542L5.36159 4.86262L6.49998 6.00887C6.8437 6.35496 7.40189 6.35496 7.74561 6.00887C8.08933 5.66278 8.08933 5.10073 7.74561 4.75464L5.10587 2.09668H5.10312ZM14.7822 11.3248C15.1259 10.9787 15.1259 10.4166 14.7822 10.0706C14.4385 9.72447 13.8803 9.72447 13.5365 10.0706L12.4009 11.214V2.72241C12.4009 2.23235 12.0077 1.83642 11.521 1.83642C11.0343 1.83642 10.6411 2.23235 10.6411 2.72241V11.214L9.50269 10.0678C9.15897 9.7217 8.60078 9.7217 8.25706 10.0678C7.91334 10.4139 7.91334 10.9759 8.25706 11.322L10.8968 13.98C11.2405 14.3261 11.7987 14.3261 12.1424 13.98L14.7822 11.322V11.3248Z"
            fill={"currentColor"}
          />
        </g>
        <defs>
          <filter
            id="filter0_i_2167_3884"
            x="0"
            y="0"
            width="16"
            height="17"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              result="effect1_innerShadow_2167_3884"
            />
          </filter>
        </defs>
      </svg>
    ),
  };

  return SwapIcons[variant] || <></>;
};
