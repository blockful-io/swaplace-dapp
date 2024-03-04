import { SVGProps } from "react";

enum ArrowIconVariant {
  UP = "up",
  DOWN = "down",
}

type ArrowVariant = ArrowIconVariant | "down" | "up";

interface ArrowIconProps {
  props?: SVGProps<SVGSVGElement>;
  variant?: ArrowVariant;
}

export const ArrowIcon = ({
  props,
  variant = ArrowIconVariant.DOWN,
}: ArrowIconProps) => {
  const ArrowIcons: Partial<Record<ArrowIconVariant, React.ReactElement>> = {
    [ArrowIconVariant.DOWN]: (
      <svg
        {...props}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron-down-solid">
          <path
            id="Vector"
            d="M5.47036 9.52949C5.76333 9.82246 6.23911 9.82246 6.53208 9.52949L11.0321 5.02949C11.325 4.73652 11.325 4.26074 11.0321 3.96777C10.7391 3.6748 10.2633 3.6748 9.97036 3.96777L6.00005 7.93809L2.02974 3.97012C1.73677 3.67715 1.26099 3.67715 0.968018 3.97012C0.675049 4.26309 0.675049 4.73887 0.968018 5.03184L5.46802 9.53184L5.47036 9.52949Z"
            fill={"currentColor"}
          />
        </g>
      </svg>
    ),
    [ArrowIconVariant.UP]: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron-down-solid">
          <path
            id="Vector"
            d="M6.5297 2.47051C6.23673 2.17754 5.76095 2.17754 5.46798 2.47051L0.96798 6.97051C0.675012 7.26348 0.675012 7.73926 0.96798 8.03223C1.26095 8.3252 1.73673 8.3252 2.0297 8.03223L6.00001 4.06191L9.97032 8.02988C10.2633 8.32285 10.7391 8.32285 11.032 8.02988C11.325 7.73691 11.325 7.26113 11.032 6.96816L6.53204 2.46816L6.5297 2.47051Z"
            fill="#505150"
          />
        </g>
      </svg>
    ),
  };

  return ArrowIcons[variant];
};
