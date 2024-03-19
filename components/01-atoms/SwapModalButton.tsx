/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ArrowIcon,
  ArrowIconVariant,
  LoadingIndicator,
  SwapContext,
} from "@/components/01-atoms";
import React, { ButtonHTMLAttributes, useContext } from "react";
import { useTheme } from "next-themes";
import cc from "classcat";

export enum ButtonVariant {
  DEFAULT,
  ALTERNATIVE,
  SECONDARY,
}

type ArrowColorCondition = (
  theme: string,
  tokenApproved: boolean,
) => ArrowColor;

export enum ArrowColor {
  BLACK = "#000000",
  GRAY = "#707572",
  WHITE = "#FFFFFF",
  YELLOW = "#DDF23D",
}

interface ButtonVariantConfig {
  arrowColorInHex: ArrowColorCondition;
  isLoading?: boolean;
  style: string;
}

const ButtonVariantsConfigs: Record<ButtonVariant, ButtonVariantConfig> = {
  [ButtonVariant.DEFAULT]: {
    style:
      "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 p-medium  dark:p-medium-2-small h-9 flex justify-center items-center gap-3",
    arrowColorInHex: (theme, tokenApproved) =>
      !!tokenApproved
        ? theme === "dark"
          ? ArrowColor.BLACK
          : ArrowColor.GRAY
        : theme === "dark"
        ? ArrowColor.GRAY
        : ArrowColor.GRAY,
  },
  [ButtonVariant.ALTERNATIVE]: {
    style:
      "border border-[#353836] bg-[#DDF23D] bg-opacity-20 rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark h-9 flex justify-center items-center gap-2 dark:!text-[#DDF23D] !text-black",
    arrowColorInHex: (theme, tokenApproved) =>
      theme === "dark" && !!tokenApproved
        ? ArrowColor.YELLOW
        : ArrowColor.BLACK,
  },

  [ButtonVariant.SECONDARY]: {
    style:
      "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium-bold !text-[#181A19] p-medium-bold-dark disabled:pointer-events-none shadow justify-center items-center gap-3",
    arrowColorInHex: (theme, tokenApproved) =>
      theme === "dark" && !!tokenApproved ? ArrowColor.BLACK : ArrowColor.GRAY,
  },
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label: string;
  onClick?: () => void;
  aditionalStyle?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function SwapModalButton({
  variant = ButtonVariant.DEFAULT,
  label,
  onClick = () => {},
  aditionalStyle,
  disabled = false,
  isLoading = false,
  ...props
}: Props) {
  const { approvedTokensCount } = useContext(SwapContext);
  const { theme } = useTheme();
  if (theme === undefined) return <></>;

  return (
    <button
      onClick={onClick}
      className={cc([
        ButtonVariantsConfigs[variant].style,
        "flex items-center gap-2",
        aditionalStyle,
        disabled
          ? "p-medium-bold dark:p-medium-bold cursor-not-allowed pointer-events-none bg-[#DDF23D]"
          : "p-medium-bold-dark bg-[#DDF23D]",
      ])}
      {...props}
      disabled={disabled}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : variant === ButtonVariant.DEFAULT ? (
        <>
          {label}
          <ArrowIcon
            variant={ArrowIconVariant.RIGHT}
            props={{
              className: ButtonVariantsConfigs[variant].arrowColorInHex(
                theme,
                !!approvedTokensCount,
              ),
            }}
          />
        </>
      ) : variant === ButtonVariant.ALTERNATIVE ? (
        <>
          <ArrowIcon
            variant={ArrowIconVariant.LEFT}
            props={{
              className: ButtonVariantsConfigs[variant].arrowColorInHex(
                theme,
                !!approvedTokensCount,
              ),
            }}
          />
          {label}
        </>
      ) : (
        <>{label}</>
      )}
    </button>
  );
}
