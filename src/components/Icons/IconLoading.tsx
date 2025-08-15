import * as React from "react";
var IconLoading = (props : React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width={198}
    height={198}
    style={{
      shapeRendering: "auto",
      display: "inline-block",
      background: "transparent",
    }}
    {...props}
  >
    <g>
      <circle
        strokeLinecap="round"
        fill="none"
        strokeDasharray="59.690260418206066 59.690260418206066"
        stroke="currentColor"
        strokeWidth={8}
        r={38}
        cy={50}
        cx={50}
      >
        <animateTransform
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="2.272727272727273s"
          repeatCount="indefinite"
          type="rotate"
          attributeName="transform"
        />
      </circle>
      <g />
    </g>
  </svg>
);
export default IconLoading;