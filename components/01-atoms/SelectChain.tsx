import { ChainID, SupportedNetworks } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEffect } from "react";
import { useWalletClient } from "wagmi";

export const SelectChain = () => {
  const { setPreferredChainId, preferredChainId } = useAuthenticatedUser();
  const { data: walletClient } = useWalletClient();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChain = event.target.value as SupportedNetworks;
    setPreferredChainId(selectedChain);
  };

  const fetchSwitchChain = async () => {
    await walletClient?.switchChain({ id: ChainID[preferredChainId] });
  };

  useEffect(() => {
    fetchSwitchChain();
  }, [preferredChainId]);

  return (
    <div>
      <select
        name="SelectChain"
        className="bg-slate-50"
        onChange={handleSelectChange}
      >
        {Object.keys(ChainID).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
