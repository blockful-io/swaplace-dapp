import { SVGProps } from "react";

export const RightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill={props.fill ? props.fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-right">
        <path
          id="Vector"
          d="M10.1131 7.59317C10.4411 7.26515 10.4411 6.73246 10.1131 6.40444L5.07475 1.36613C4.74674 1.03811 4.21404 1.03811 3.88603 1.36613C3.55801 1.69414 3.55801 2.22684 3.88603 2.55486L8.33129 7.00012L3.88865 11.4454C3.56063 11.7734 3.56063 12.3061 3.88865 12.6341C4.21666 12.9621 4.74936 12.9621 5.07738 12.6341L10.1157 7.59579L10.1131 7.59317Z"
          fill={props.fill ? props.fill : "#707572"}
        />
      </g>
    </svg>
  );
};
