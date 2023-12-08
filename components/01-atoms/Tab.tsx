interface ITab {
  setSelectNftsFromOthers: (_: boolean) => void;
}

export const Tab = ({ setSelectNftsFromOthers }: ITab) => {
  return (
    <div className="flex-auto flex items-center justify-between w-[580px] ">
      <div className="flex">
        <button
          onClick={() => {
            setSelectNftsFromOthers(false);
          }}
        >
          Their Items
        </button>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            setSelectNftsFromOthers(true);
          }}
        >
          Your Items
        </button>
      </div>
    </div>
  );
};
