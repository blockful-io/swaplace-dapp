import { StatusOffers } from "@/components/01-atoms";

export const FilterOffers = () => {
  return (
    <div className="flex">
      <div className="w-[342px] xl:h-[656px] h-[500px] xl:gap-6 flex flex-col mr-10">
        <div className="dark:title-h2-medium-dark  title-h2-medium ">
          <h2>Your offers</h2>
        </div>
        <div>
          <StatusOffers />
        </div>
      </div>
    </div>
  );
};
