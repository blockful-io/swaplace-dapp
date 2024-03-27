import { LoadingIndicator, WalletIcon } from "@/components/01-atoms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

interface IConnectWallet {
  customStyle?: string;
  walletIcon?: boolean;
}

export const ConnectWallet = ({ customStyle, walletIcon }: IConnectWallet) => {
  const router = useRouter();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className={customStyle}
                    type="button"
                  >
                    {walletIcon ? <WalletIcon /> : <p>Connect Wallet</p>}
                  </button>
                );
              }

              if (router.pathname === "/") return null;

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-3 xl:flex-col">
                  <button
                    onClick={openChainModal}
                    className="bg-[#e8e8e8] dark:bg-[#353836] dark:hover:bg-[#4b514d] dark:border-none shadow-md border-2 border-[#e8e8e8] hover:bg-[#f8f8f8] rounded px-4 hidden md:flex items-center"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="p-4 py-2 bg-[#e8e8e8] dark:bg-[#353836] dark:hover:bg-[#4b514d] dark:border-none shadow-md border-2 border-[#e8e8e8] hover:bg-[#f8f8f8] rounded"
                    type="button"
                  >
                    {account.displayName}

                    <div className="hidden md:block">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
