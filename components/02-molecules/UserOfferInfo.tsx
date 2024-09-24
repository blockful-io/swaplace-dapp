/* import { ENSAvatar, ENSAvatarSize } from "@/components/01-atoms";
 * import { useEnsData } from "@/lib/client/hooks/useENSData"; */

import { ADDRESS_ZERO } from "@/lib/client/constants";
import { SwapContext } from "@/lib/client/contexts";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { PopulatedSwapOfferCard } from "@/lib/client/offers-utils";
import { SwapNativeEther } from "@/lib/client/swap-utils";
import { isInRange } from "@/lib/client/utils";
import { EthereumAddress } from "@/lib/shared/types";
import { useContext, useEffect, useState } from "react";
import { formatEther } from "viem";
import { useNetwork } from "wagmi";

export enum UserOfferVariant {
  /**
   * Only the name of the ENS and avatar.
   */
  NAME_ENS = "NAME_ENS",

  /**
   * The name of the ENS and avatar with the amount of ether being sent (etherValue).
   */
  CREATING_SWAP = "CREATING_SWAP",

  /**
   * The name of the ENS and avatar with the amount of ether in the swap already created.
   */
  SWAP_CREATED = "SWAP_CREATED",

  /**
   * The name of the ENS and avatar with the amount of ether in the swap already created.
   */
  SWAP_CREATED_MARKETPLACE = "SWAP_CREATED_MARKETPLACE",
}

interface UserOfferInfoProps {
  address: EthereumAddress | null;
  variant?: UserOfferVariant;
  nativeEther?: SwapNativeEther;
  swap?: PopulatedSwapOfferCard;
}

/**
 * Renders the user offer information based on the provided props.
 * The component will render the ENS name and avatar of the user.
 * The component variant will render the amount of ether being sent in the swap or the amount of ether in the swap already created.
 *
 * @param {EthereumAddress | null} address - The Ethereum address of the user.
 * @param {UserOfferVariant} variant - The variant of the user offer information to display. Defaults to UserOfferVariant.NAME_ENS
 * @param {SwapNativeEther} nativeEther - The native ether details for the swap.
 * @param {PopulatedSwapOfferCard} swap - The populated swap offer card details.
 *
 *
 * @remarks
 * The ENS name and avatar rendering sections are commented out due to issues with the ENS data retrieval.
 * Specifically, the ENS avatar is not working properly because the searched address by ENS is not functioning correctly.
 * For more details, refer to the `useENSData` file.
 *
 * @deprecated
 * These sections are currently commented out because the `ens-avatar-searched-address` has issues fetching the correct address.
 * Since the ENS are not working properly. We're commenting those sections.
 */
export const UserOfferInfo = ({
  address,
  variant = UserOfferVariant.NAME_ENS,
  nativeEther,
  swap,
}: UserOfferInfoProps) => {
  /**
  const { primaryName } = useEnsData({
    ensAddress: address,
  });
   */
  const { etherValue, etherRecipient } = useContext(SwapContext);
  const [isMounted, setIsMounted] = useState(false);
  const { chain } = useNetwork();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const displayAddress =
    address?.address === ADDRESS_ZERO
      ? "Acceptor"
      : address?.getEllipsedAddress();

  useEffect(() => {
    /* Only render the chain symbol after the component has mounted */
    setIsMounted(true);
  }, []);

  let displayNativeEther = 0;

  if (nativeEther) {
    displayNativeEther = Number(nativeEther.value) / 1e6;
  }

  const UserOfferInfoConfig: Record<UserOfferVariant, JSX.Element> = {
    [UserOfferVariant.NAME_ENS]: (
      <div>
        <div className="flex gap-2">
          <div>
            {/* {address && (
              <ENSAvatar
                avatarENSAddress={address}
                size={ENSAvatarSize.SMALL}
              />
            )} */}
          </div>
          <div className="flex ">
            {/* {primaryName ? <p>{primaryName}</p> :<p>{displayAddress}</p> } */}
            <p>{displayAddress}</p>
          </div>
        </div>
      </div>
    ),
    [UserOfferVariant.CREATING_SWAP]: (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              {/* {address && (
                <ENSAvatar
                  avatarENSAddress={address}
                  size={ENSAvatarSize.SMALL}
                />
              )} */}
            </div>
            <div className="flex ">
              {/* {primaryName ? (
                <p>{primaryName} gets</p>
              ) : ( */}
              <p>{displayAddress} gets</p>
              {/* )} */}
            </div>
          </div>
          {address?.address !== authenticatedUserAddress?.address &&
          etherRecipient === 0 ? (
            <div className="flex-row flex items-center gap-1">
              <p className="flex dark:p-small-dark p-small-variant-black">
                {formatEther(etherValue).toString()}
              </p>
              <p className="flex dark:p-small-dark p-small-variant-black">
                {isMounted && chain ? chain.nativeCurrency.symbol : ""}
              </p>
            </div>
          ) : address?.address === authenticatedUserAddress?.address &&
            isInRange(etherRecipient, 1, 255) ? (
            <div className="flex-row flex items-center gap-1">
              <p className="flex dark:p-small-dark p-small-variant-black">
                {formatEther(etherValue).toString()}
              </p>
              <p className="flex dark:p-small-dark p-small-variant-black">
                {isMounted && chain ? chain.nativeCurrency.symbol : ""}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    ),
    [UserOfferVariant.SWAP_CREATED]: (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              {/* {address && (
                <ENSAvatar
                  avatarENSAddress={address}
                  size={ENSAvatarSize.SMALL}
                />
              )} */}
            </div>
            <div className="flex ">
              {/* {primaryName ? (
                <p>{primaryName} gets</p>
              ) : ( */}
              <p>{displayAddress} gets</p>
              {/* )} */}
            </div>
          </div>
          {nativeEther &&
          nativeEther.recipient === BigInt(0) &&
          address === swap?.askerTokens.address ? (
            <div className="flex-row flex items-center gap-1">
              <p className="flex dark:p-small-dark p-small-variant-black">
                {displayNativeEther.toString()}
              </p>
              <p className="flex dark:p-small-dark p-small-variant-black">
                {isMounted && chain ? chain.nativeCurrency.symbol : ""}
              </p>
            </div>
          ) : nativeEther &&
            nativeEther.recipient !== BigInt(0) &&
            address !== swap?.askerTokens.address ? (
            <div className="flex-row flex items-center gap-1">
              <p className="flex dark:p-small-dark p-small-variant-black">
                {displayNativeEther.toString()}
              </p>
              <p className="flex dark:p-small-dark p-small-variant-black">
                {isMounted && chain ? chain.nativeCurrency.symbol : ""}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    ),
    [UserOfferVariant.SWAP_CREATED_MARKETPLACE]: (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              {/* {address && (
                <ENSAvatar
                  avatarENSAddress={address}
                  size={ENSAvatarSize.SMALL}
                />
              )} */}
            </div>
            <div className="flex">
              {/* {primaryName ? (
                <p>{primaryName} gets</p>
              ) : ( */}
              <p>{displayAddress} gets</p>
              {/* )} */}
            </div>
          </div>
          {address?.address !== ADDRESS_ZERO &&
          nativeEther &&
          nativeEther.recipient !== BigInt(0) ? (
            <>
              <div className="flex-row flex items-center gap-1">
                <p className="flex dark:p-small-dark p-small-variant-black">
                  {displayNativeEther.toString()}
                </p>
                <p className="flex dark:p-small-dark p-small-variant-black">
                  {isMounted && chain ? chain.nativeCurrency.symbol : ""}
                </p>
              </div>
            </>
          ) : address?.address === ADDRESS_ZERO &&
            nativeEther &&
            nativeEther.recipient === BigInt(0) ? (
            <>
              <div className="flex-row flex items-center gap-1">
                <p className="flex dark:p-small-dark p-small-variant-black">
                  {displayNativeEther.toString()}
                </p>
                <p className="flex dark:p-small-dark p-small-variant-black">
                  {isMounted && chain ? chain.nativeCurrency.symbol : ""}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    ),
  };

  return UserOfferInfoConfig[variant];
};
