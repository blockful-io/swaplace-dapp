import React, { SVGProps } from "react";

export const LeftIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill={props.fill ? props.fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-left">
        <path
          id="Vector"
          d="M3.88596 7.59317C3.55794 7.26515 3.55794 6.73246 3.88596 6.40444L8.92427 1.36613C9.25229 1.03811 9.78498 1.03811 10.113 1.36613C10.441 1.69414 10.441 2.22684 10.113 2.55486L5.66774 7.00012L10.1104 11.4454C10.4384 11.7734 10.4384 12.3061 10.1104 12.6341C9.78236 12.9621 9.24966 12.9621 8.92165 12.6341L3.88333 7.59579L3.88596 7.59317Z"
          fill={props.fill ? props.fill : "#DDF23D"}
        />
      </g>
    </svg>
  );
};
