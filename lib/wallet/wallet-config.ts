import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";
import { configureChains, createConfig } from "wagmi";
import {
  trustWallet,
  ledgerWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { polygonMumbai, sepolia } from "viem/chains";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP ?? "";

// const { preferredChainId } = useAuthenticatedUser();

// const baseUrl =
//   getRpcHttpUrlForNetwork.get(ChainID[preferredChainId]) ?? alchemyApiKey;

export const rpcHttpUrl = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;

const supportedNetworks = [sepolia, polygonMumbai];

export const { chains, webSocketPublicClient, publicClient } = configureChains(
  supportedNetworks,
  [
    jsonRpcProvider({
      rpc: () => ({ http: rpcHttpUrl }),
    }),
    publicProvider(),
  ]
);

const connectorArgs = {
  appName: "Swaplace dApp",
  chains: supportedNetworks,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
};

const connectors = connectorsForWallets([
  {
    groupName: "Which wallet will you use?",
    wallets: [
      injectedWallet(connectorArgs),
      coinbaseWallet(connectorArgs),
      ledgerWallet(connectorArgs),
      trustWallet(connectorArgs),
      rainbowWallet(connectorArgs),
      walletConnectWallet(connectorArgs),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const getSiweMessageOptions = () => ({
  statement: "Swaplace dApp",
});

export interface AccountProps {
  account: {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
  };
}

export { wagmiConfig, getSiweMessageOptions };
