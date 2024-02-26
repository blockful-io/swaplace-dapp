/* eslint-disable prefer-const */
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const WIDE_SCREEN_SIZE = 1279;
export const DESKTOP_SCREEN_SIZE = 1023;
export const TABLET_SCREEN_SIZE = 768;

export interface NFT {
  id?: Record<string, any>;
  metadata?: Record<string, any>;
  contract?: Record<string, any>;
  contractMetadata?: Record<string, any>;
}

export enum NFTsQueryStatus {
  EMPTY_QUERY = "EMPTY_QUERY",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NO_RESULTS = "NO_RESULTS",
  WITH_RESULTS = "WITH_RESULTS",
}

export enum SupportedNetworks {
  HARDHAT = "HARDHAT",
  ETHEREUM = "ETHEREUM",
  SEPOLIA = "SEPOLIA",
  POLYGON = "POLYGON",
  MUMBAI = "MUMBAI",
  OPTIMISM = "OPTIMISM",
  OPGOERLI = "OPGOERLI",
  OPSEPOLIA = "OPSEPOLIA",
  AVALANCHE = "AVALANCHE",
  FUJI = "FUJI",
  BASE = "BASE",
  BASEGOERLI = "BASEGOERLI",
  BNB = "BNB",
  BNBTESTNET = "BNBTESTNET",
  ARBITRUMONE = "ARBITRUMONE",
  ARBITRUMSEPOLIA = "ARBITRUMSEPOLIA",
}

interface ChainProps {
  id: number;
  name: string;
}

export const ChainInfo: Record<SupportedNetworks, ChainProps> = {
  [SupportedNetworks.HARDHAT]: {
    id: 31337,
    name: "Hardhat",
  },
  [SupportedNetworks.ETHEREUM]: {
    id: 1,
    name: "Ethereum",
  },
  [SupportedNetworks.SEPOLIA]: {
    id: 11155111,
    name: "Sepolia",
  },
  [SupportedNetworks.POLYGON]: {
    id: 137,
    name: "Polygon",
  },
  [SupportedNetworks.MUMBAI]: {
    id: 80001,
    name: "Polygon Mumbai",
  },
  [SupportedNetworks.OPTIMISM]: {
    id: 10,
    name: "Optimism",
  },
  [SupportedNetworks.OPGOERLI]: {
    id: 420,
    name: "Optimism Goerli",
  },
  [SupportedNetworks.OPSEPOLIA]: {
    id: 11155420,
    name: "Optimism Sepolia",
  },
  [SupportedNetworks.AVALANCHE]: {
    id: 43114,
    name: "Avalanche",
  },
  [SupportedNetworks.FUJI]: {
    id: 43113,
    name: "Fuji",
  },
  [SupportedNetworks.BASE]: {
    id: 8453,
    name: "Base",
  },
  [SupportedNetworks.BASEGOERLI]: {
    id: 84531,
    name: "Base Goerli",
  },
  [SupportedNetworks.BNB]: {
    id: 56,
    name: "Bnb",
  },
  [SupportedNetworks.BNBTESTNET]: {
    id: 97,
    name: "Bnb Testnet",
  },
  [SupportedNetworks.ARBITRUMONE]: {
    id: 42161,
    name: "Arbitrum",
  },
  [SupportedNetworks.ARBITRUMSEPOLIA]: {
    id: 421614,
    name: "Arbitrum Sepolia",
  },
};

export const getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [ChainInfo.HARDHAT.id, "http://127.0.0.1:8545/"],
  [ChainInfo.ETHEREUM.id, process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP ?? ""],
  [ChainInfo.SEPOLIA.id, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [ChainInfo.POLYGON.id, process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_HTTP ?? ""],
  [ChainInfo.MUMBAI.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? ""],
  [ChainInfo.OPTIMISM.id, process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_HTTP ?? ""],
  [ChainInfo.OPGOERLI.id, process.env.NEXT_PUBLIC_ALCHEMY_OPGOERLI_HTTP ?? ""],
  [
    ChainInfo.OPSEPOLIA.id,
    process.env.NEXT_PUBLIC_ALCHEMY_OPSEPOLIA_HTTP ?? "",
  ],
  [
    ChainInfo.AVALANCHE.id,
    process.env.NEXT_PUBLIC_ALCHEMY_AVALANCHE_HTTP ?? "",
  ],
  [ChainInfo.FUJI.id, process.env.NEXT_PUBLIC_ALCHEMY_FUJI_HTTP ?? ""],
  [ChainInfo.BASE.id, process.env.NEXT_PUBLIC_ALCHEMY_BASE_HTTP ?? ""],
  [
    ChainInfo.BASEGOERLI.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BASEGOERLI_HTTP ?? "",
  ],
  [ChainInfo.BNB.id, process.env.NEXT_PUBLIC_ALCHEMY_BNB_HTTP ?? ""],
  [
    ChainInfo.BNBTESTNET.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BNBTESTNET_HTTP ?? "",
  ],
  [
    ChainInfo.ARBITRUMONE.id,
    process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUMONE_HTTP ?? "",
  ],
  [
    ChainInfo.ARBITRUMSEPOLIA.id,
    process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUMSEPOLIA_HTTP ?? "",
  ],
]);

export const SWAPLACE_SMART_CONTRACT_ADDRESS = {
  [ChainInfo.HARDHAT.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ETHEREUM.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.SEPOLIA.id]: "0xD8E3580C1b6f117c5b35DdD01dd9e50d9487501D",
  [ChainInfo.POLYGON.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.MUMBAI.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
  [ChainInfo.OPTIMISM.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.OPGOERLI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.OPSEPOLIA.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.AVALANCHE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.FUJI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BASE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BASEGOERLI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BNB.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BNBTESTNET.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ARBITRUMONE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ARBITRUMSEPOLIA.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
};

//SEPOLIA MOCKS
export const MOCKERC721 = "0x83dB434Db5014e24AdF5962457334122F1d4ab13";
export const MOCKERC20 = "0x31a59e0f7fD0724545fCD912bcC2c5A1debddd0C";

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
