import { SVGProps } from "react";

export function ImageGalleryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          width="10.5"
          height="8.5"
          x="3"
          y="4"
          rx="1"
          transform="rotate(180 8.25 8.25)"
        ></rect>
        <path d="M.5 10V2.5a1 1 0 0 1 1-1h9M3.6 12.42l3.93-4.15A1 1 0 0 1 9 8.26l3.95 4.14"></path>
      </g>
    </svg>
  );
}
