import { Network } from "alchemy-sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const SWAPLACE_WEBSITE = "https://swaplace.xyz/";
enum NetworkKakarot {
  ETH_KAKAROT = "eth-kakarot",
}

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
  KAKAROT_SEPOLIA = "KAKAROT_SEPOLIA",
  POLYGON = "POLYGON",
  AMOY = "AMOY",
  OPTIMISM = "OPTIMISM",
  OPGOERLI = "OPGOERLI",
  OPSEPOLIA = "OPTIMISM_SEPOLIA",
  AVALANCHE = "AVALANCHE",
  FUJI = "FUJI",
  BASE = "BASE",
  BASESEPOLIA = "BASE_SEPOLIA",
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
  [SupportedNetworks.KAKAROT_SEPOLIA]: {
    id: 1802203764,
    name: "Kakarot",
  },
  [SupportedNetworks.POLYGON]: {
    id: 137,
    name: "Polygon",
  },
  [SupportedNetworks.AMOY]: {
    id: 80002,
    name: "Polygon Amoy Testnet",
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
  [SupportedNetworks.BASESEPOLIA]: {
    id: 84532,
    name: "Base Sepolia",
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
// Kakarot CHAIN DATA RPC
export const KAKAROT_CHAIN_DATA = {
  chainId: "0x6B6B7274",
  chainName: "Kakarot",
  rpcUrls: ["https://sepolia-rpc.kakarot.org"],
  iconUrls: [
    "https://ipfs.io/ipfs/QmSg36ytguM4b5cjCAnSjPKDBCetDmq9yiPS5GeK19BejA/",
  ],
  nativeCurrency: {
    name: "Kakarot",
    symbol: "KKT",
    decimals: 18,
  },
  blockExplorerUrls: ["https://sepolia.kakarotscan.org/"],
};

export const BNB_TESTNET_DATA = {
  chainId: "0x61",
  chainName: "BNB Chain Testnet",
  rpcUrls: ["https://bsc-testnet-rpc.publicnode.com	"],
  iconUrls: [
    "https://ipfs.io/ipfs/QmVsRNNpMF2DAtzPW7LJYEnN8b3Wou1VVevkZ74ESra48b/",
  ],
  nativeCurrency: {
    name: "Kakarot",
    symbol: "tBNB",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

export const POLYGON_AMOY_DATA = {
  chainId: "0x13882",
  chainName: "Polygon Amoy Testnet",
  rpcUrls: ["https://rpc-amoy.polygon.technology/"],
  iconUrls: [
    "https://ipfs.io/ipfs/QmVsRNNpMF2DAtzPW7LJYEnN8b3Wou1VVevkZ74ESra48b/",
  ],
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://amoy.polygonscan.com/"],
};

// //Workaround to make `getNetwork` to add ETH_KAKAROT as alchemy does not support Kakarot.
const getNetworkKakarot: Map<number, NetworkKakarot> = new Map([
  [ChainInfo.KAKAROT_SEPOLIA.id, NetworkKakarot.ETH_KAKAROT],
]);

export const getNetwork: Map<number, Network> = new Map([
  [ChainInfo.SEPOLIA.id, Network.ETH_SEPOLIA],
  [ChainInfo.AMOY.id, Network.MATIC_MUMBAI],
]);

// //Workaround to make `getNetwork` to add ETH_KAKAROT as alchemy does not support Kakarot.
for (const [key, value] of getNetworkKakarot.entries()) {
  getNetwork.set(key, value as unknown as Network);
}

export const getRpcHttpUrlForNetwork: Map<number, string> = new Map([
  [ChainInfo.HARDHAT.id, "http://127.0.0.1:8545/"],
  [ChainInfo.ETHEREUM.id, process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP ?? ""],
  [ChainInfo.SEPOLIA.id, process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP ?? ""],
  [ChainInfo.KAKAROT_SEPOLIA.id, process.env.NEXT_PUBLIC_KAKAROT_HTTP ?? ""],
  [ChainInfo.POLYGON.id, process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_HTTP ?? ""],
  [ChainInfo.AMOY.id, process.env.NEXT_PUBLIC_ALCHEMY_AMOY_HTTP ?? ""],
  [ChainInfo.OPTIMISM.id, process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_HTTP ?? ""],
  [ChainInfo.OPGOERLI.id, process.env.NEXT_PUBLIC_ALCHEMY_OPGOERLI_HTTP ?? ""],
  [
    ChainInfo.OPTIMISM_SEPOLIA.id,
    process.env.NEXT_PUBLIC_ALCHEMY_OPSEPOLIA_HTTP ?? "",
  ],
  [
    ChainInfo.AVALANCHE.id,
    process.env.NEXT_PUBLIC_ALCHEMY_AVALANCHE_HTTP ?? "",
  ],
  [ChainInfo.FUJI.id, process.env.NEXT_PUBLIC_ALCHEMY_FUJI_HTTP ?? ""],
  [ChainInfo.BASE.id, process.env.NEXT_PUBLIC_ALCHEMY_BASE_HTTP ?? ""],
  [
    ChainInfo.BASE_SEPOLIA.id,
    process.env.NEXT_PUBLIC_ALCHEMY_BASESEPOLIA_HTTP ?? "",
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
  [ChainInfo.AMOY.id, process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY],
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
  [ChainInfo.SEPOLIA.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.KAKAROT_SEPOLIA.id]: "0x12Fe1E060B0B1c4Efc6d7A8dC9394ffC53842b78",
  [ChainInfo.POLYGON.id]: "0x1F501af9a03A10DF4E2525085b2B3a487934a30c",
  [ChainInfo.AMOY.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.OPTIMISM.id]: "0x1F501af9a03A10DF4E2525085b2B3a487934a30c",
  [ChainInfo.OPGOERLI.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318", //Deprecated network
  [ChainInfo.OPTIMISM_SEPOLIA.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.AVALANCHE.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.FUJI.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.BASE.id]: " 0x1F501af9a03A10DF4E2525085b2B3a487934a30c",
  [ChainInfo.BASE_SEPOLIA.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.BNB.id]: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  [ChainInfo.BNB_TESTNET.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
  [ChainInfo.ARBITRUM_ONE.id]: "0x1F501af9a03A10DF4E2525085b2B3a487934a30c",
  [ChainInfo.ARBITRUM_SEPOLIA.id]: "0x7819d778dB1b5309dfcbe1A67553aC89Ae1cA53f",
};

export const SWAPLACE_MOCK_TOKENS = {
  [ChainInfo.SEPOLIA.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
  [ChainInfo.KAKAROT_SEPOLIA.id]: {
    ERC721: "0xF9529A99BE87C9DfAFec2961aa718274A0f11349",
    ERC20: "0x5Bac3737Aaf9a3be0b79D55691646d613428Bcb1",
  },
  [ChainInfo.AMOY.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
  [ChainInfo.OPTIMISM_SEPOLIA.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
  [ChainInfo.FUJI.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
  [ChainInfo.BASE_SEPOLIA.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
  [ChainInfo.BNB_TESTNET.id]: {
    ERC721: "0x87D61D022E48eA30Ee4b64f1897761B4092f600d",
    ERC20: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
  },
  [ChainInfo.ARBITRUM_SEPOLIA.id]: {
    ERC721: "0x699bE3a1A1e39E9e3bDF159724224e33b05038Ad",
    ERC20: "0xFF17ffBD2Ac1C516eF92a7a45bEf8dD40Aaba015",
  },
};
//SEPOLIA MOCKS   // ToDo: Refactor this function to use SWAPLACE_MOCK_TOKENS instead
export const MOCKERC721 = "0xE6fE918bB0aFBd155e39bdE40A2B4274e6ae4730";
export const MOCKERC20 = "0xF85dd40c9941643ea0c5D5bf9cea0Ae5fd82E163";
