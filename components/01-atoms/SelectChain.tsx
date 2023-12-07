import { ChainName } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useEffect } from "react";
import { useWalletClient } from "wagmi";

export const SelectChain = () => {
  const { setPreferredChainId, preferredChainId } = useAuthenticatedUser();
  const { data: walletClient } = useWalletClient();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChain = event.target.value as unknown as number;
    setPreferredChainId(selectedChain);
  };

  const fetchSwitchChain = async () => {
    await walletClient?.switchChain({ id: preferredChainId ?? 1 });
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
        {Object.keys(ChainName).map((key, index) => (
          <option key={key} value={ChainName[index][1]}>
            {ChainName[index][0]}
          </option>
        ))}
      </select>
    </div>
  );
};
