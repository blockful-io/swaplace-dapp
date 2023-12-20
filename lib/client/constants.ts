export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const WIDE_SCREEN_SIZE = 1279;
export const DESKTOP_SCREEN_SIZE = 1023;
export const TABLET_SCREEN_SIZE = 768;

export interface NFT {
  id?: Record<string, any>;
  metadata?: Record<string, any>;
  contract?: Record<string, any>;
}

export interface INftsList {
  nftsList: NFT[];
  ownerAddress: string | null;
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

interface ChainProps {
  id: number;
  name: string;
}

export const ChainInfo: Record<SupportedNetworks, ChainProps> = {
  [SupportedNetworks.SEPOLIA]: {
    id: 11155111,
    name: "Sepolia",
  },
  [SupportedNetworks.MUMBAI]: {
    id: 80001,
    name: "Polygon Mumbai",
  },
};

export let getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [ChainInfo.SEPOLIA.id, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [ChainInfo.MUMBAI.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
]);

export const SWAPLACE_SMART_CONTRACT_ADDRESS = {
  [ChainInfo.SEPOLIA.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
  [ChainInfo.MUMBAI.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
};
