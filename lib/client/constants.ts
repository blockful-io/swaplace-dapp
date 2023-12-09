export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const WIDE_SCREEN_SIZE = 1279;
export const DESKTOP_SCREEN_SIZE = 1023;
export const TABLET_SCREEN_SIZE = 768;

export interface NFT {
  id?: Record<string, any>;
  metadata?: Record<string, any>;
  contract?: Record<string, any>;
}

export enum NFTsQueryStatus {
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
