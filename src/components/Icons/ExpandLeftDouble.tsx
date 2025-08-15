import { SVGProps } from "react";

export function ExpandLeftDouble(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="m12 18l-6-6l6-6m6 12l-6-6l6-6"
        ></path>
      </svg>
    )
  }
  