import { CardOffers } from "@/components/02-molecules";
import { TokenOfferDetails, SwapIcon } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import cc from "classcat";

export enum TokenOfferVariant {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

type TokenOfferVariants = TokenOfferVariant | "horizontal" | "vertical";

interface TokenOffersProps {
  variant?: TokenOfferVariants;
}

interface TokenOffersConfig {
  body: React.ReactNode;
}

export const TokenOffers = ({ variant = "horizontal" }: TokenOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const HorizontalVariant = () => {
    return (
      <div className="flex flex-col border border-[#353836] shadow-add-manually-card dark:bg-[#282B29] rounded-lg ">
        <div className="flex flex-row border-b dark:border-[#353836] relative">
          <div className={cc(["border-r dark:border-[#353836] "])}>
            <CardOffers address={authenticatedUserAddress} />
          </div>
          <div>
            <CardOffers address={authenticatedUserAddress} />
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
      <div className="flex flex-col rounded-lg ">
        <div className="flex flex-col relative gap-2">
          <div className=" border border-[#353836] rounded-lg dark:bg-[#282B29]">
            <CardOffers
              address={authenticatedUserAddress}
              variant={"secundary"}
            />
          </div>
          <div className="border border-[#353836] rounded-lg dark:bg-[#282B29]">
            <CardOffers
              address={authenticatedUserAddress}
              variant={"secundary"}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#707572] bg-[#212322] rounded-[100px] w-[36px] h-[36px] items-center flex justify-center">
            <SwapIcon variant={"vertical"} />
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
