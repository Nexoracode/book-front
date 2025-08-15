import { SVGProps } from "react";
export default function LayoutLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={200}
        height={200}
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "transparent",
        }}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <g>
          <circle
            strokeWidth={2}
            stroke="#e90c59"
            fill="none"
            r={0}
            cy={50}
            cx={50}
          >
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;40"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            />
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            />
          </circle>
          <circle
            strokeWidth={2}
            stroke="#46dff0"
            fill="none"
            r={0}
            cy={50}
            cx={50}
          >
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;40"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            />
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            />
          </circle>
          <g />
        </g>
      </svg>
    </div>
  );
}
