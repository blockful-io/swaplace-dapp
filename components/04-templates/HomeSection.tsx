import cc from "classcat";
import { CardHome } from "@/components/02-molecules";
import { SearchBar } from "@/components/01-atoms";

export const HomeSection = () => {
  return (
    <section className={cc(["w-full h-full flex flex-col items-center"])}>
      <div>
        <CardHome />
        <SearchBar />
      </div>
    </section>
  );
};
