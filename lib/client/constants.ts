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
export const ChainName: [string, number][] = [
  ["ETHEREUM", 1],
  ["GOERLI", 5],
  ["POLYGON", 137],
];
