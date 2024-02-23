import { PlusIcon } from "./icons/PlusIcon";
import { SwapAddManuallyModalLayout } from "@/components/01-atoms";
import { useState } from "react";

const Tooltip = ({ message }: { message: string }) => {
  return (
    <div
      className="absolute 
    left-1/2 top-[-40px] 
    ml-auto mr-auto min-w-max 
    -translate-x-1/2 scale-0 
    transform rounded-lg 
    px-3 py-2 text-xs 
    font-medium transition-all 
    duration-500 group-hover:scale-100"
    >
      <div className="flex max-w-xs flex-col items-center ">
        <div className="rounded bg-gray-800 p-2 text-center text-xs text-white shadow-lg">
          {message}
        </div>
        <div
          className="
            w-0 h-0 
            border-l-[8px] border-l-transparent
            border-t-[12px] border-t-gray-800
            border-r-[8px] border-r-transparent 
            shadow-lg"
        ></div>
      </div>
    </div>
  );
};

export const AddTokenCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          group shadow-inner 
          mx-auto w-[90px] h-[90px] 
          lg:w-[80px] lg:h-[80px] 
          relative rounded-xl 
          border-2 border-[#E0E0E0] 
          dark:border-[#212322] 
          flex flex-col 
          bg-[#DDF23D10] 
          hover:bg-[#DDF23D20]
          transition-all duration-200
        "
        >
        <Tooltip message="Add Tokens" />
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full h-full items-center justify-center"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <SwapAddManuallyModalLayout
        variant="token"
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
