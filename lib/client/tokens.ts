import { ERC721, Token, TokenType } from "../shared/types";

export const getTokenName = (token: Token) => {
  if (token.tokenType === TokenType.ERC20) {
    return token.name ? token.name : token.tokenType;
  } else if (token.tokenType === TokenType.ERC721) {
    return (token as ERC721).metadata
      ? (token as ERC721).metadata?.name
      : token.name
      ? token.name
      : token.tokenType;
  }
};
