import { SwaplaceAbi } from "../client/abi";
import { Swapping } from "../client/blockchain-data";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "../client/constants";
import { hexToNumber } from "viem";

export function creatingSwap({
  walletClient,
  expireDate,
  nftInputUser,
  nftAuthUser,
  validatedAddressToSwap,
  authenticatedUserAddress,
  chain,
}: Swapping) {
  return walletClient?.writeContract({
    abi: SwaplaceAbi,
    functionName: "createSwap",
    args: [
      {
        owner: authenticatedUserAddress.address as `0x${string}`,
        allowed: validatedAddressToSwap as `0x${string}`,
        expiry: expireDate,
        biding: [
          {
            addr: nftAuthUser.contract.address,
            amountOrId: hexToNumber(nftAuthUser.id.tokenId),
          },
        ],
        asking: [
          {
            addr: nftInputUser.contract.address,
            amountOrId: hexToNumber(nftInputUser.id.tokenId),
          },
        ],
      },
    ],
    address: SWAPLACE_SMART_CONTRACT_ADDRESS[chain] as `0x${string}`,
  });
}
