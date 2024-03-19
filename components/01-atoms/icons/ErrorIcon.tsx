import { SVGProps } from "react";
import cc from "classcat";
import { useTheme } from "next-themes";

export const ErrorIcon = (props: SVGProps<SVGSVGElement>) => {
  const { theme } = useTheme();
  return (
    <div
      className={cc([
        "w-20 h-20 rounded-[100px] shadow border-[3px] dark:border-[#DDF23D] justify-center items-center gap-2.5 inline-flex",
        {
          "border-black": theme === "light",
        },
      ])}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Error Illustration">
          <g id="Vector">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M38 9H10C7.79086 9 6 10.7909 6 13V29C6 31.2091 7.79086 33 10 33H38C40.2091 33 42 31.2091 42 29V13C42 10.7909 40.2091 9 38 9ZM10 5C5.58172 5 2 8.58172 2 13V29C2 33.4183 5.58172 37 10 37H38C42.4183 37 46 33.4183 46 29V13C46 8.58172 42.4183 5 38 5H10Z"
              fill={props.fill ? props.fill : "#DDF23D"}
            />
            <path
              d="M20.8 16.9C20.8 18.2255 19.7255 19.3 18.4 19.3C17.0745 19.3 16 18.2255 16 16.9C16 15.5745 17.0745 14.5 18.4 14.5C19.7255 14.5 20.8 15.5745 20.8 16.9Z"
              fill={props.fill ? props.fill : "#DDF23D"}
            />
            <path
              d="M31.9998 16.9C31.9998 18.2255 30.9253 19.3 29.5998 19.3C28.2744 19.3 27.1998 18.2255 27.1998 16.9C27.1998 15.5745 28.2744 14.5 29.5998 14.5C30.9253 14.5 31.9998 15.5745 31.9998 16.9Z"
              fill={props.fill ? props.fill : "#DDF23D"}
            />
            <path
              d="M16.1498 26.0313C17.7694 23.2258 20.7608 21.5 24 21.5C27.2392 21.5 30.2306 23.2258 31.8502 26.0313C32.1599 26.5712 31.9741 27.2704 31.4342 27.5801C30.8943 27.8899 30.1952 27.704 29.8854 27.1642C28.6729 25.0578 26.4338 23.7657 24 23.7657C21.5662 23.7657 19.3271 25.0578 18.1146 27.1642C17.8048 27.704 17.1057 27.8899 16.5658 27.5801C16.0259 27.2704 15.8401 26.5712 16.1498 26.0313Z"
              fill={props.fill ? props.fill : "#DDF23D"}
            />
            <path
              d="M14 44C14 41.7909 15.7909 40 18 40H31C33.2091 40 35 41.7909 35 44H14Z"
              fill={props.fill ? props.fill : "#DDF23D"}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
