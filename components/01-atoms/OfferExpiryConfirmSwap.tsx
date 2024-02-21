interface OfferExpiryConfirmSwapProps {
  expireTime: string;
}

export const OfferExpiryConfirmSwap = ({
  expireTime
}: OfferExpiryConfirmSwapProps) => {
  return (
    <>
      <div className="flex justify-between items-center self-stretch px-3 py-2 h-10 border rounded-lg border-solid dark:border-[#353836] border-[#353836] dark:bg-[#282B29] bg-[#DDF23D]">
        <p
          className="text-sm font-onest font-normal dark:text-[#A3A9A5] text-[#505150]"
        >
          Offer expires in
        </p>
        <p
          className="text-sm font-onest font-normal dark:text-[#F6F6F6] text-[#707572]"
        >
          {expireTime}
        </p>
      </div>
    </>
  );
};
