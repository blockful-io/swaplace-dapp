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
  ["POLYGON", 137],
  ["SEPOLIA", 11155111],
  ["MUMBAI", 80001],
];

export let getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [1, process.env.NEXT_PUBLIC_ALCHEMY_HTTP ?? ""],
  [137, process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_HTTP ?? ""],
  [11155111, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [80001, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
]);
