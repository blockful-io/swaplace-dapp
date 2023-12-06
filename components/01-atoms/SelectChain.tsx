import { ChainIdName } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export const SelectChain = () => {
  const { setPreferredChainId } = useAuthenticatedUser();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChain = event.target.value;
    setPreferredChainId(selectedChain);
  };

  return (
    <div>
      <select
        name="SelectChain"
        className="bg-slate-50"
        onChange={handleSelectChange}
      >
        {Object.keys(ChainIdName).map((key) => (
          <option key={key} value={key}>
            {ChainIdName[key as unknown as keyof typeof ChainIdName]}
          </option>
        ))}
      </select>
    </div>
  );
};
