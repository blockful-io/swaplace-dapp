interface ITab {
  setIsYourItem: (_: boolean) => void;
}

export const Tab = ({ setIsYourItem }: ITab) => {
  return (
    <div className="flex-auto flex items-center justify-between w-[580px] ">
      <div className="flex ">
        <button
          onClick={() => {
            setIsYourItem(false);
          }}
        >
          Their Items
        </button>
      </div>
      <div className="flex  ">
        <button
          onClick={() => {
            setIsYourItem(true);
          }}
        >
          Your Items
        </button>
      </div>
    </div>
  );
};
