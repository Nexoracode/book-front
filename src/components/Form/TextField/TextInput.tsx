import React, { useState } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import EmptyButton from "../../Assets/EmptyButton";
import IconEyeSlash from "../../Icons/IconEyeSlash";
import IconEye from "../../Icons/IconEye";

type Props = {
  field?: Omit<ControllerRenderProps<FieldValues, string>, "ref">;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  error?: FieldError | undefined;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
var TextInput = React.forwardRef((props: Props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  var { field, className, multiple, Icon, error, ...allProps } = props;

  var inputProps = {
    className: twMerge(
      error ? "!outline-rose-500" : "",
      `bg-hgray-200 w-full p-1.5 px-2 rounded-lg outline outline-2 outline-hgray-300  focus:outline-primary-50`,
      className
    ),
    ...allProps,
    ...field,
  };
  return (
    <div className="relative">
      {multiple ? (
        <textarea
          ref={ref as any}
          {...inputProps}
          rows={4}
          style={{ resize: "none" }}
        ></textarea>
      ) : (
        <>
          <input
            ref={ref as any}
            {...inputProps}
            type={
              (props?.type === "password" && showPassword) ? "text" : props?.type
            }
          />

          {props?.type === "password" && (
            <EmptyButton
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute left-2 top-2.5 text-hgray-400"
            >
              {showPassword ? (
                <IconEyeSlash width={20} height={20} />
              ) : (
                <IconEye width={20} height={20} />
              )}
            </EmptyButton>
          )}
        </>
      )}

      {Icon ? (
        <Icon
          width={24}
          height={24}
          className="text-primary-400  absolute top-2 left-2"
        />
      ) : null}
    </div>
  );
});

export default TextInput;
