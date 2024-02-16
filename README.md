## Swaplace

This repository contains the core frontend for the Swaplace Protocol; The lightest Swap protocol in the market.

## Setup

First, install the dependences:

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

The project comes with a `.env.example` file. You should rename it to `.env` and fill the variables with your values. Most RPC providers offer free testnet nodes. You can use [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) to get a free node.

```
NEXT_PUBLIC_ALCHEMY_SEPOLIA_HTTP=
NEXT_PUBLIC_ALCHEMY_SEPOLIA_KEY=
NEXT_PUBLIC_ALCHEMY_MUMBAI_HTTP=
NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY=
NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP=
```

WARNING: The private keys used in the `.env` file are from hardhat accounts. They are not meant to be used in production.

WARNING: The `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=` used in the `.env` file is public. They are not meant to be used in production.

If you want use your own please create your Project ID in the [WalletConnect](https://cloud.walletconnect.com/)

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

```

## Contributing

- To know more about how you can contribute [see our notion page](https://blockful.notion.site/Swaplace-Call-for-Contributors-6e4895d2a7264f679439ab2c124603fe).
