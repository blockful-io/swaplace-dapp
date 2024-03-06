import { XMarkIcon } from "..";
import { useTheme } from "next-themes";
import cc from "classcat";

interface CloseCTAProps {
  onClick: () => void;
}

export const CloseCTA = ({ onClick }: CloseCTAProps) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full border border-[#353836] hover:bg-[#353836] transition"
    >
      <XMarkIcon
        className={cc([
          "text-white w-[18px] h-[18px]",
          theme == "light" ? "text-black" : "text-white",
        ])}
      />
    </button>
  );
};
