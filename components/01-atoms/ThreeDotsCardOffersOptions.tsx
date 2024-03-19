import { ShareIcon, ThreeDotsIcon, XMarkIcon } from "@/components/01-atoms";
import { useState } from "react";
import cc from "classcat";

export const ThreeDotsCardOffersOptions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="p-1 dark:hover:bg-[#353836] hover:bg-[#e0e0e0] group rounded-[100px] w-[24px] h-[24px] flex justify-center items-center"
      role="button"
      onClick={toggleDropdown}
    >
      <div className="relative inline-block text-left">
        <div>
          <ThreeDotsIcon
            className={cc([
              "dark:group-hover:text-[#F6F6F1] dark:text-[#A3A9A5]",
              { isOpen: "dark:text-[#F6F6F1] text-[#A3A9A5]" },
            ])}
          />
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-[-5px] mt-2  border border-[#353836] rounded-lg w-[124px] shadow-lg dark:bg-[#282B29] bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none shadow-three-dots">
            <div
              className=" "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                type="button"
                className="flex items-center gap-3 w-full px-4 py-2 text-sm dark:p-small-dark-variant-grey rounded-lg  dark:hover:bg-[#353836] hover:bg-[#e4e4e4] hover:text-gray-900"
                role="menuitem"
              >
                <ShareIcon /> <p>Share</p>
              </button>
              <button
                type="button"
                className=" flex items-center gap-3 w-full px-4 py-2 text-sm dark:p-small-dark-variant-grey rounded-lg dark:hover:bg-[#353836] hover:bg-[#e4e4e4] hover:text-gray-900"
                role="menuitem"
              >
                <XMarkIcon /> <p>Cancel</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
