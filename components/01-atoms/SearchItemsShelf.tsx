import { MagnifyingGlassIcon } from "@/components/01-atoms";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useTheme } from "next-themes";
import cc from "classcat";

export const SearchItemsShelf = () => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();

  return (
    <div className="relative flex-grow">
      <input
        id="search"
        name="search"
        type="search"
        className={cc([
          "flex items-center text-ellipsis pr-1 pl-9 rounded-lg max-w-[216px] h-8 gap-3 font-normal leading-5 text-sm not-italic placeholder-[#707572] border border-[#353836] opacity-80 bg-[#282B29] transition duration-300 ease-in-out focus:outline-none",
          theme == "light"
            ? "bg-[#F6F6F6] hover:bg-[#F0EEEE] border-[#E4E4E4] hover:border-[#D6D5D5] focus:border-[#AABE13] hover:shadow-[0_0_6px_1px_#00000014] focus:shadow-[0_0_6px_1px_#00000014] focus:border-opacity-100"
            : "hover:dark:bg-[#353836] hover:dark:border-[#505150] hover:dark:shadow-[0_0_6px_1px_#00000066] focus:dark:shadow-[0_0_6px_1px_#00000066] focus:dark:border-[#AABE13]",
        ])}
        placeholder={isMobile ? "Search" : "Search for items"}
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="w-4"
          fill={cc([theme == "light" ? "#E4E4E4" : "#353836"])}
        />
      </div>
    </div>
  );
};
