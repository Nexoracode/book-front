import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function Paper(props: Props) {
  var { children, className, ...allProps } = props;
  return (
    <div
      className={twMerge("bg-white shadow-[0px_0px_1px_1px_rgba(0,0,0,0.1)]  rounded-xl p-3", className)}
      {...allProps}
    >
      {children}
    </div>
  );
}
