import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

enum BtnColor {
  green = "green",
  gray = "gray",
  error = "error",
}

enum BtnSize {
  large = "large",
  medium = "medium",
  small = "small",
}

enum BtnRounded {
  md = "md",
  lg = "lg",
}

export type ButtonProps = {
  color?: keyof typeof BtnColor;
  size?: keyof typeof BtnSize;
  rounded?: keyof typeof BtnRounded;
  fullWidth?: boolean;
  outlined?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget | undefined;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function Button(props: ButtonProps) {
  var {
    children,
    color = BtnColor.green,
    size = BtnSize.medium,
    fullWidth,
    rounded = BtnRounded.lg,
    outlined,
    className,
    href,
    target,
    ...allProps
  } = props;

  var getColor = () => {
    switch (color) {
      case BtnColor.green:
        return outlined
          ? "border border-solid border-2 border-green-500 bg-white text-green-500"
          : "text-white bg-green-500";
      case BtnColor.gray:
        return outlined
          ? "border border-solid border-2 border-gray-300 text-gray-600 hover:border-green-500 hover:text-white hover:bg-green-500"
          : "text-white bg-gray-500";
      case BtnColor.error:
        return outlined
          ? "border border-solid border-2 border-rose-500 text-rose-500 hover:border-rose-300 hover:text-white hover:bg-rose-300"
          : "text-white bg-rose-300";
      default:
    }
  };

  var getSize = () => {
    switch (size) {
      case BtnSize.small:
        return "p-1 text-sm font-normal";
      case BtnSize.medium:
        return "p-2 text-base font-medium";
      case BtnSize.large:
        return "p-3 text-lg font-medium";

      default:
        break;
    }
  };

  var getRounded = () => {
    switch (rounded) {
      case BtnRounded.lg:
        return "rounded-lg";

      case BtnRounded.md:
        return "rounded-md";

      default:
        break;
    }
  };
  return (
    <>
      {href ? (
        <Link
          target={target}
          to={href}
          className={twMerge(
            getColor(),
            getSize(),
            getRounded(),
            fullWidth && "w-full",
            className
          )}
        >
          {children}
        </Link>
      ) : (
        <button
          className={twMerge(
            getColor(),
            getSize(),
            getRounded(),
            fullWidth && "w-full",
            "inline-block transition-colors cursor-pointer",
            className
          )}
          {...allProps}
        >
          {children}
        </button>
      )}
    </>
  );
}
