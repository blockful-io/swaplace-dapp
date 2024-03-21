import { CardOffers } from "@/components/02-molecules";
import {
  TokenOfferDetails,
  SwapIcon,
  SwapContext,
  SwapIconVariant,
} from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import cc from "classcat";
import { useContext } from "react";

export enum TokenOfferVariant {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

interface TokenOffersProps {
  variant?: TokenOfferVariant;
}

interface TokenOffersConfig {
  body: React.ReactNode;
}

export const TokenOffers = ({
  variant = TokenOfferVariant.VERTICAL,
}: TokenOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { validatedAddressToSwap } = useContext(SwapContext);

  /**
   * The horizonalVariant from TokenOffers get the data from Ponder
   * This variant will handle the offers to the authenticatedUserAddress
   *
   * @returns
   */
  const HorizontalVariant = () => {
    return (
      <div className="flex flex-col border border-[#353836] dark:shadow-add-manually-card dark:bg-[#282B29] rounded-lg ">
        <div className="flex flex-row border-b dark:border-[#353836] relative">
          <div className={cc(["border-r dark:border-[#353836]"])}>
            <CardOffers address={authenticatedUserAddress} />
          </div>
          <div>
            <CardOffers address={validatedAddressToSwap} />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#707572] bg-[#212322] rounded-[100px] w-[24px] h-[24px] items-center flex justify-center">
            <SwapIcon />
          </div>
        </div>
        <div className="flex-col">
          <TokenOfferDetails />
        </div>
      </div>
    );
  };

  const VerticalVariant = () => {
    return (
      <div className="flex flex-col rounded-lg flex-grow">
        <div className="flex flex-col relative gap-2 flex-grow">
          <div className="p-4 relative flex flex-grow border border-[#353836] rounded-lg dark:bg-[#282B29]">
            <CardOffers
              address={authenticatedUserAddress}
              variant={TokenOfferVariant.VERTICAL}
            />
          </div>

          <div className="w-full relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border dark:border-[#353836] border-[#707572] bg-[#F6F6F6] dark:bg-[#212322] rounded-full w-9 h-9 flex items-center justify-center">
              <SwapIcon variant={SwapIconVariant.VERTICAL} />
            </div>
          </div>

          <div className="p-4 flex flex-grow border border-[#353836] rounded-lg dark:bg-[#282B29]">
            <CardOffers
              address={validatedAddressToSwap}
              variant={TokenOfferVariant.VERTICAL}
            />
          </div>
        </div>
      </div>
    );
  };

  const TokenOffersPropsConfig: Record<TokenOfferVariant, TokenOffersConfig> = {
    [TokenOfferVariant.HORIZONTAL]: {
      body: <HorizontalVariant />,
    },
    [TokenOfferVariant.VERTICAL]: {
      body: <VerticalVariant />,
    },
  };

  return <>{TokenOffersPropsConfig[variant].body}</>;
};
