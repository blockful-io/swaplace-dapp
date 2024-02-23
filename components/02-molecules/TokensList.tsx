import { TokenCard } from "@/components/02-molecules";
import { TokenCardsPlaceholder } from "@/components/01-atoms";
import { Token } from "@/lib/shared/types";

export interface TokensListProps {
  tokensList: Token[];
  ownerAddress: string | null;
}

/**
 *
 * This component receives the data of multiple tokens and create its cards
 * @param tokensList
 * @param ownerAddress
 *
 * @returns TokensList
 */

export const TokensList = ({ tokensList, ownerAddress }: TokensListProps) => {
  const placeholders = TokenCardsPlaceholder(tokensList.length, 15, 30, 30, 30);
  const tokenCards = tokensList.map((token: Token, index) => (
    <div key={`nft-${index}`}>
      <TokenCard ownerAddress={ownerAddress} tokenData={token} />
    </div>
  ));

  const allSquares = [...tokenCards, ...placeholders];

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 py-6 px-4">
      {allSquares}
    </div>
  );
};
