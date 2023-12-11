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
  BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN",
  MUMBAI = "MUMBAI",
}

interface ChainProps {
  id: number;
  name: string;
}

export const ChainInfo: Record<SupportedNetworks, ChainProps> = {
  [SupportedNetworks.BINANCE_SMART_CHAIN]: {
    id: 11155111,
    name: "BINANCE_SMART_CHAIN",
  },
  [SupportedNetworks.MUMBAI]: {
    id: 80001,
    name: "Polygon Mumbai",
  },
};

export let getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [
    ChainInfo.BINANCE_SMART_CHAIN.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BINANCE_SMART_CHAIN_HTTP ?? "",
  ],
  [ChainInfo.MUMBAI.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
]);

export const SWAPLACE_SMART_CONTRACT_ADDRESS = {
  [ChainInfo.BINANCE_SMART_CHAIN.id]:
    "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
  [ChainInfo.MUMBAI.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
};
