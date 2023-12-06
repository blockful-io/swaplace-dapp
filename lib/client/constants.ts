export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export interface NFT {
  name: string;
}

export enum NFTLoadingStatus {
  NULL = "NULL",
  NONE = "NONE",
  LOADING = "LOADING",
  COMPLETED = "COMPLETED",
}

export enum ChainId {
  ETHEREUM = 1,
  GOERLI = 2,
  SEPOLIA = 3,
}

export const ChainIdName: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "Ethereum",
  [ChainId.GOERLI]: "Goerli",
  [ChainId.SEPOLIA]: "Sepolia",
};
