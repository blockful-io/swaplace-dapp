import cc from "classcat";
import { CardHome } from "@/components/02-molecules";

export const HomeSection = () => {
  return (
    <section className={cc(["w-full h-full flex flex-col items-center"])}>
      <div>
        <CardHome />
      </div>
    </section>
  );
};
