export const CardSwap = () => {
  return (
    <div className="flex flex-col gap-4 px-3 pt-3 pb-8">
      <div className="flex items-center h-9 gap-2">
        <div className="w-9 h-9 bg-[#d9d9d9] rounded-full" />
        <div className="items-center">
          <div>Your Collection</div>
          <div>These are the items you'll give</div>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="grid grid-cols-6 gap-3">
          <div className="bg-[#D9D9D9] w-[60px] h-[60px]"></div>
        </div>
      </div>
    </div>
  );
};
