import { CardOffers } from "@/components/02-molecules";
import {
  TokenOfferDetails,
  SwapIcon,
  SwapContext,
  SwapIconVariant,
} from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { usePonder } from "@/lib/client/hooks/usePonder";
import { Token } from "@/lib/shared/types";
import { getERC721MetadataFromContractAddress } from "@/lib/client/blockchain-utils";
import cc from "classcat";
import { useContext, useState } from "react";
import { sepolia } from "wagmi";

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

  const { erc721AskSwaps } = usePonder();

  const [allTokensListByPonder, setAllTokensListByPonder] = useState<Token[]>(
    [],
  );

  /**
   * The horizonalVariant from TokenOffers get the data from Ponder
   * This variant will handle the offers to the authenticatedUserAddress
   *
   * @returns
   */

  console.log("erc721AskSwaps ", erc721AskSwaps);

  // Transforms to Token the ERC721 | ERC20
  const getUserTokensByPonder = async () => {
    // const chainId = authenticatedUserAddress?.equals(address)
    //   ? chain?.id
    //   : ChainInfo[destinyChain].id;

    const chainId = sepolia.id;
    const address = "0x12a0AA4054CDa340492228B1ee2AF0315276092b";
    let queriedTokens: Token[] = [];

    // ta dando erro essa parada
    if (address && chainId) {
      console.log("erc721AskSwaps", erc721AskSwaps);
      Promise.all([
        getERC721MetadataFromContractAddress(chainId, erc721AskSwaps).then(
          (tokens) => {
            console.log("tokens s s =", tokens);
            // queriedTokens = [...queriedTokens, ...tokens];
          },
        ),
        //  getERC20MetadataFromContractAddress(address, chainId).then(
        //    (tokens) => {
        //      queriedTokens = [...queriedTokens, ...tokens];
        //      tokensCount = tokensCount + tokens.length;
        //    },
        //  ),
      ])
        .catch((err) => {
          console.log(err);
          queriedTokens = [];
        })
        .finally(() => {
          if (chainId) {
          } else {
            setAllTokensListByPonder(queriedTokens);
          }
        });
    }
  };

  getUserTokensByPonder();
  console.log(allTokensListByPonder);
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
