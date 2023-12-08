export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export interface NFT {
  name: string;
}

export enum NFTsQueryState {
  EMPTY_QUERY = "EMPTY_QUERY",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NO_RESULTS = "NO_RESULTS",
  WITH_RESULTS = "WITH_RESULTS",
}

export enum SupportedNetworks {
  SEPOLIA = "SEPOLIA",
  MUMBAI = "MUMBAI",
}

export const ChainID: Record<SupportedNetworks, number> = {
  [SupportedNetworks.SEPOLIA]: 11155111,
  [SupportedNetworks.MUMBAI]: 80001,
};

export let getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [ChainID.SEPOLIA, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [ChainID.MUMBAI, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
]);
