import PropTypes from "prop-types";
import cc from "classcat";

enum ToolTipPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

type Position = ToolTipPosition | "top" | "bottom" | "left" | "right";

interface TooltipProps {
  position: Position;
  content: string;
  children?: React.ReactNode;
}

export const Tooltip = ({ position, content, children }: TooltipProps) => (
  <div className="relative group">
    <div>{children ? children : null}</div>
    <div className="pointer-events-none">
      <span
        className={cc([
          "absolute hidden group-hover:inline-block bg-[#212322] border border-[#353836] dark:p-small-dark p-small-dark text-xs p-2 whitespace-nowrap rounded-lg",
          {
            "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]":
              position === ToolTipPosition.TOP,
          },
          {
            "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]":
              position === ToolTipPosition.BOTTOM,
          },
          {
            "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]":
              position === ToolTipPosition.LEFT,
          },
          {
            "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]":
              position === ToolTipPosition.RIGHT,
          },
        ])}
      >
        {content}
      </span>
      <span
        className={cc([
          "absolute hidden group-hover:inline-block border-[6px]",
          {
            "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-[#353836]":
              position === ToolTipPosition.TOP,
          },
          {
            "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-[#353836]":
              position === ToolTipPosition.BOTTOM,
          },
          {
            "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-[#353836]":
              position === ToolTipPosition.LEFT,
          },
          {
            "top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-[#353836]":
              position === ToolTipPosition.RIGHT,
          },
        ])}
      ></span>
    </div>
  </div>
);

Tooltip.propTypes = {
  position: PropTypes.oneOf([
    ToolTipPosition.TOP,
    ToolTipPosition.BOTTOM,
    ToolTipPosition.LEFT,
    ToolTipPosition.RIGHT,
  ]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
