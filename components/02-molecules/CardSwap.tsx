import { SearchBar, ShelfSwap } from "@/components/01-atoms";
import cc from "classcat";

export const CardSwap = () => {
  return (
    <div className={cc(["flex flex-col justify-center gap-8"])}>
      <SearchBar />
      <ShelfSwap />
    </div>
  );
};
