import cc from "classcat";

interface ProgressBarProps {
  currentStep: number;
  numberOfItems: number;
}

export const ProgressBar = ({
  currentStep,
  numberOfItems,
}: ProgressBarProps) => {
  return (
    <div className="flex w-full">
      {Array(numberOfItems)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className={cc([
                "h-2 flex w-full",
                {
                  "bg-[#DDF23D]": currentStep > index,
                  "bg-[#353836]": currentStep <= index,
                },
              ])}
            />
          );
        })}
    </div>
  );
};
