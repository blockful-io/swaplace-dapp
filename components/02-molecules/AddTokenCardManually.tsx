import {
  AddTokenOrSwapManuallyModal,
  AddTokenOrSwapManuallyModalVariant,
} from "@/components/02-molecules";
import { PlusIcon, Tooltip } from "@/components/01-atoms";
import { useState } from "react";

export const AddTokenCardManually = () => {
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
        <Tooltip content="Add Token" position="top" />
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full h-full items-center justify-center"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <AddTokenOrSwapManuallyModal
        variant={AddTokenOrSwapManuallyModalVariant.TOKEN}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};
