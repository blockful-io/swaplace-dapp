import { ICreateSwap } from "../client/blockchain-data";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { publicClientViem } from "../wallet/wallet-config";
import { encodeFunctionData } from "viem";

export async function createSwap({
  walletClient,
  expireDate,
  nftInputUser,
  nftAuthUser,
  validatedAddressToSwap,
  authenticatedUserAddress,
  chain,
}: ICreateSwap) {
  const data = encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            components: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "allowed",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "expiry",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amountOrId",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISwap.Asset[]",
                name: "biding",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amountOrId",
                    type: "uint256",
                  },
                ],
                internalType: "struct ISwap.Asset[]",
                name: "asking",
                type: "tuple[]",
              },
            ],
            internalType: "struct ISwap.Swap",
            name: "swap",
            type: "tuple",
          },
        ],
        name: "createSwap",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: [
      {
        owner: authenticatedUserAddress.address as `0x${string}`,
        allowed: validatedAddressToSwap as `0x${string}`,
        expiry: expireDate,
        biding: nftAuthUser,
        asking: nftInputUser,
      },
    ],
  });

  try {
    const transactionHash = await walletClient.sendTransaction({
      data: data,
      to: SWAPLACE_SMART_CONTRACT_ADDRESS[chain],
    });

    const transactionReceipt = await publicClientViem.waitForTransactionReceipt(
      {
        hash: transactionHash,
      },
    );

    return transactionReceipt;
  } catch (error) {
    console.error(error);
  }
}
