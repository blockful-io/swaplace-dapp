import { Swap } from "../client/swap-utils";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { publicClientViem } from "../wallet/wallet-config";
import { encodeFunctionData } from "viem";

export interface SwapUserConfiguration {
  walletClient: any;
  chain: number;
}

export async function createSwap(
  swap: Swap,
  configurations: SwapUserConfiguration,
) {
  // const SwaplaceContract = getContract({
  //   address: SWAPLACE_SMART_CONTRACT_ADDRESS[chain] as `0x${string}`,
  //   abi: SwaplaceAbi,
  //   publicClient: publicClientViem,
  // });
  // const config = await packingData(
  //   SwaplaceContract,
  //   validatedAddressToSwap as `0x${string}`,
  //   expireDate,
  // );

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
                internalType: "uint256",
                name: "config",
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
        owner: swap.owner as `0x${string}`,
        config: swap.config as unknown as bigint,
        biding: swap.biding,
        asking: swap.asking,
      },
    ],
  });

  try {
    const transactionHash = await configurations.walletClient.sendTransaction({
      data: data,
      to: SWAPLACE_SMART_CONTRACT_ADDRESS[
        configurations.chain
      ] as `0x${string}`,
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
