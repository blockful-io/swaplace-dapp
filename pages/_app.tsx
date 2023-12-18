import "@rainbow-me/rainbowkit/styles.css";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

import {
  chains,
  getSiweMessageOptions,
  wagmiConfig,
} from "../lib/wallet/wallet-config";

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SwapContextProvider } from "@/components/01-atoms";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import cc from "classcat";
import { ThemeProvider } from "next-themes";

const onest = localFont({
  src: "../public/fonts/Onest-VariableFont_wght.woff2",
  variable: "--font-onest",
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <SwapContextProvider>
          <SessionProvider session={session}>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                  theme={{
                    lightMode: lightTheme({
                      accentColor: "black",
                      borderRadius: "small",
                      overlayBlur: "small",
                    }),
                    darkMode: darkTheme({
                      accentColor: "#888888",
                      borderRadius: "small",
                      overlayBlur: "small",
                    }),
                  }}
                  chains={chains}
                >
                  <Toaster />
                  <ThemeProvider enableSystem={true} attribute="class">
                    <main className={cc([onest.className])}>
                      <Component {...pageProps} />
                    </main>
                  </ThemeProvider>
                </RainbowKitProvider>
              </WagmiConfig>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </SwapContextProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
