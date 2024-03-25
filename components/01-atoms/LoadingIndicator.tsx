import { HTMLProps } from "react";

export const LoadingIndicator = (props: HTMLProps<HTMLDivElement>) => (
  <div
    {...props}
    className="animate-spin rounded-full h-4 w-4 border-t-2 dark:border-white border-black"
  />
);
