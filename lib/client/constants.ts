import { Network } from "alchemy-sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export enum TokensQueryStatus {
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
  BASEGOERLI = "BASE_GOERLI",
  BNB = "BNB",
  BNBTESTNET = "BNB_TESTNET",
  ARBITRUMONE = "ARBITRUM_ONE",
  ARBITRUMSEPOLIA = "ARBITRUM_SEPOLIA",
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

export const getNetwork: Map<number, Network> = new Map([
  [ChainInfo.SEPOLIA.id, Network.ETH_SEPOLIA],
  [ChainInfo.MUMBAI.id, Network.MATIC_MUMBAI],
]);

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
    ChainInfo.BASE_GOERLI.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BASEGOERLI_HTTP ?? "",
  ],
  [ChainInfo.BNB.id, process.env.NEXT_PUBLIC_ALCHEMY_BNB_HTTP ?? ""],
  [
    ChainInfo.BNB_TESTNET.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BNBTESTNET_HTTP ?? "",
  ],
  [
    ChainInfo.ARBITRUM_ONE.id,
    process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUMONE_HTTP ?? "",
  ],
  [
    ChainInfo.ARBITRUM_SEPOLIA.id,
    process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUMSEPOLIA_HTTP ?? "",
  ],
]);

export const getAPIKeyForNetwork: Map<number, string | undefined> = new Map([
  [ChainInfo.SEPOLIA.id, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_KEY],
  [ChainInfo.MUMBAI.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY],
]);

export const ALCHEMY_PUBLIC_RPC = "https://eth-mainnet.g.alchemy.com/v2/demo";

export const getCurrentNetworkHttpUrl = (chainId: number) => {
  const httpUrl = getRpcHttpUrlForNetwork.get(chainId);

  if (!httpUrl) {
    throw new Error(`No RPC URL was defined for chain ID: ${chainId}`);
  }

  return httpUrl;
};

export const SWAPLACE_SMART_CONTRACT_ADDRESS = {
  [ChainInfo.HARDHAT.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ETHEREUM.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.SEPOLIA.id]: "0xb7A42919ae66745Ffa69940De9d3DD99703eACb1",
  [ChainInfo.POLYGON.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.MUMBAI.id]: "0xcB003ed4Df4679D15b8863BB8F7609855A6a380d",
  [ChainInfo.OPTIMISM.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.OPGOERLI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.OPSEPOLIA.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.AVALANCHE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.FUJI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BASE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BASE_GOERLI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BNB.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BNB_TESTNET.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ARBITRUM_ONE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.ARBITRUM_SEPOLIA.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
};

//SEPOLIA MOCKS
export const MOCKERC721 = "0x83dB434Db5014e24AdF5962457334122F1d4ab13";
export const MOCKERC20 = "0x31a59e0f7fD0724545fCD912bcC2c5A1debddd0C";
