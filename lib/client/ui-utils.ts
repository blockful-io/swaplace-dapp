import { TimeStampDate } from "./swap-utils";
import {
  ERC20,
  ERC20WithTokenAmountSelection,
  ERC721,
  Token,
  TokenType,
} from "../shared/types";

export const WIDE_SCREEN_SIZE = 1279;
export const DESKTOP_SCREEN_SIZE = 1023;
export const TABLET_SCREEN_SIZE = 768;

export interface ExpireOption {
  label: string;
  value: TimeStampDate;
}

export enum SwapModalSteps {
  APPROVE_TOKENS,
  CREATE_SWAP,
  CREATING_SWAP,
  CREATED_SWAP,
}

export const ExpireDate: ExpireOption[] = [
  { label: "1 Day", value: TimeStampDate.ONE_DAY },
  { label: "7 Days", value: TimeStampDate.ONE_WEEK },
  { label: "1 Month", value: TimeStampDate.ONE_MONTH },
  { label: "6 Month", value: TimeStampDate.SIX_MONTH },
  { label: "1 Year", value: TimeStampDate.ONE_YEAR },
];

export const getTokenName = (
  token: Token,
  prefix = {
    withAmountPrefix: false,
    displayTokenAmount: false,
  },
): string => {
  if (token.tokenType === TokenType.ERC20) {
    const erc20balancePrefix = prefix.withAmountPrefix
      ? prefix.displayTokenAmount
        ? (token as ERC20WithTokenAmountSelection).tokenAmount + " - "
        : (token as ERC20).rawBalance + " - "
      : "";

    return token.name
      ? erc20balancePrefix + token.name
      : erc20balancePrefix + token.tokenType;
  } else if (token.tokenType === TokenType.ERC721) {
    return (token as ERC721).metadata
      ? (token as ERC721).metadata?.name
      : token.name
      ? `${token.name} - ${token.tokenType}`
      : token.tokenType;
  } else {
    return `${token.tokenType} - Token Name Not Found`;
  }
};
