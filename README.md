## Swaplace

This repository contains the core frontend for the Swaplace Protocol; The lightest Swap protocol in the market.

## Setup

ATTENTION: After cloning the repository, you must change the branch into the `develop` branch to get the latest version.  
WARNING: `main` branch is not stable at the moment.

You should install the dependencies using legacy mode and then run the development server.

```bash
 npm i  --legacy-peer-deps
```

After, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Environment Variables

The project comes with a `.env.example` file. You should rename it to `.env` and fill the variables with your values. Most RPC providers offer free testnet nodes. You can use [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) to get a free node. We are currently using Sepolia for testing purposes but you can use any other provider and evm chains to test the application.

Alchemy has two types of keys, one for the HTTP provider and another for the Alchemy SDK. You should use the HTTP key for the `NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP` variable and the SDK key for the `NEXT_PUBLIC_ALCHEMY_SEPOLIA_KEY` variable.

The HTTP key is used to connect to the blockchain and the SDK key is used to connect to the Alchemy API, which allows us to get the user custody tokens easily.

```
NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP=
NEXT_PUBLIC_ALCHEMY_SEPOLIA_KEY=
```

WARNING: The `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=` used in the `.env` file is public. They are not meant to be used in production.

If you want use your own please create your Project ID in the [WalletConnect](https://cloud.walletconnect.com/) website (not mandatory).

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
```

## Contributing

- To know more about how you can contribute [see our notion page](https://blockful.notion.site/Swaplace-Call-for-Contributors-6e4895d2a7264f679439ab2c124603fe).
