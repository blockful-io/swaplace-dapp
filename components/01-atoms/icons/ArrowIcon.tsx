import { SVGProps } from "react";

export enum ArrowIconVariant {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

interface ArrowIconProps {
  props?: SVGProps<SVGSVGElement>;
  variant?: ArrowIconVariant;
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
            d="M6.5297 2.47051C6.23673 2.17754 5.76095 2.17754 5.46798 2.47051L0.96798 6.97051C0.675012 7.26348 0.675012 7.73926 0.96798 8.03223C1.26095 8.3252 1.73673 8.3252 2.0297 8.03223L6.00001 4.06191L9.97032 8.02988C10.2633 8.32285 10.7391 8.32285 11.032 8.02988C11.325 7.73691 11.325 7.26113 11.032 6.96816L6.53204 2.46816L6.5297 2.47051Z"
            fill="#505150"
          />
        </g>
      </svg>
    ),
    [ArrowIconVariant.LEFT]: (
      <svg
        {...props}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={"currentColor"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron-left">
          <path
            id="Vector"
            d="M3.88596 7.59317C3.55794 7.26515 3.55794 6.73246 3.88596 6.40444L8.92427 1.36613C9.25229 1.03811 9.78498 1.03811 10.113 1.36613C10.441 1.69414 10.441 2.22684 10.113 2.55486L5.66774 7.00012L10.1104 11.4454C10.4384 11.7734 10.4384 12.3061 10.1104 12.6341C9.78236 12.9621 9.24966 12.9621 8.92165 12.6341L3.88333 7.59579L3.88596 7.59317Z"
            fill={"currentColor"} // "#DDF23D"
          />
        </g>
      </svg>
    ),
    [ArrowIconVariant.RIGHT]: (
      <svg
        {...props}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={"currentColor"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron-right">
          <path
            id="Vector"
            d="M10.1131 7.59317C10.4411 7.26515 10.4411 6.73246 10.1131 6.40444L5.07475 1.36613C4.74674 1.03811 4.21404 1.03811 3.88603 1.36613C3.55801 1.69414 3.55801 2.22684 3.88603 2.55486L8.33129 7.00012L3.88865 11.4454C3.56063 11.7734 3.56063 12.3061 3.88865 12.6341C4.21666 12.9621 4.74936 12.9621 5.07738 12.6341L10.1157 7.59579L10.1131 7.59317Z"
            fill={"currentColor"} //"#707572"
          />
        </g>
      </svg>
    ),
  };

  return ArrowIcons[variant] || <></>;
};
