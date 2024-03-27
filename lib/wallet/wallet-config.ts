import { getCurrentNetworkHttpUrl } from "../client/constants";
import { sepolia } from "@wagmi/core/chains";
import { configureChains, createConfig } from "wagmi";
import {
  trustWallet,
  ledgerWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const { chains, webSocketPublicClient, publicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: getCurrentNetworkHttpUrl(chain.id),
      }),
    }),
  ],
);

const connectorArgs = {
  appName: "Swaplace dApp",
  chains: [sepolia],
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
