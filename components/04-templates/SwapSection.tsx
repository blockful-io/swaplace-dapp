import cc from "classcat";
import { CardSwap } from "../02-molecules/CardSwap";

export const SwapSection = () => {
  return (
    <section className={cc(["w-full h-full flex flex-col items-center"])}>
      <div>
        <CardSwap />
      </div>
    </section>
  );
};
