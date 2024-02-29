import { SVGProps } from "react";

export const DoneIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Done">
        <path
          id="Vector"
          d="M13.1706 2.64938C13.5299 3.00872 13.5299 3.59228 13.1706 3.95161L5.81138 11.3108C5.45204 11.6701 4.86848 11.6701 4.50915 11.3108L0.82956 7.6312C0.470225 7.27187 0.470225 6.68831 0.82956 6.32897C1.18889 5.96964 1.77245 5.96964 2.13179 6.32897L5.1617 9.35601L11.8712 2.64938C12.2305 2.29005 12.8141 2.29005 13.1734 2.64938H13.1706Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
