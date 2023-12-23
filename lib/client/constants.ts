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
  HARDHAT = "HARDHAT",
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
  [SupportedNetworks.HARDHAT]: {
    id: 31337,
    name: "Hardhat",
  },
};

export let getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [ChainInfo.SEPOLIA.id, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [ChainInfo.MUMBAI.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
  [ChainInfo.HARDHAT.id, "http://127.0.0.1:8545/"],
]);

export const SWAPLACE_SMART_CONTRACT_ADDRESS = {
  [ChainInfo.HARDHAT.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.SEPOLIA.id]: "0xD8E3580C1b6f117c5b35DdD01dd9e50d9487501D",
  [ChainInfo.MUMBAI.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
};

export enum TimeStampDate {
  ONE_DAY = 24 * 60 * 60 * 1000,
  ONE_WEEK = ONE_DAY * 7,
  ONE_MONTH = ONE_WEEK * 4,
  SIX_MONTH = ONE_MONTH * 6,
  ONE_YEAR = SIX_MONTH * 2,
}

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_MONTH = ONE_WEEK * 4;
export const SIX_MONTH = ONE_MONTH * 6;
export const ONE_YEAR = SIX_MONTH * 2;

export interface ExpireOption {
  label: string;
  value: TimeStampDate;
}

export const ExpireDate: ExpireOption[] = [
  { label: "1 Day", value: ONE_DAY },
  { label: "7 Days", value: ONE_WEEK },
  { label: "1 Month", value: ONE_MONTH },
  { label: "6 Month", value: SIX_MONTH },
  { label: "1 Year", value: ONE_YEAR },
];
