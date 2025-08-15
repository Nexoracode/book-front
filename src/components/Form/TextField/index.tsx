"use client";
import React, { useEffect } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import TextInput from "./TextInput";
import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";

type Props = {
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  label?: string;
  defaultValue?: string;
  row?: boolean;
  wrapperClassName?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
function TextField(props: Props) {
  var {
    name,
    rules,
    required,
    label,
    defaultValue,
    className,
    wrapperClassName,
    row,
    ...allProps
  } = props;
  var { setValue, watch } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);
  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        ...(required
          ? { required: `ورود فیلد ${label ?? "فوق"} الزامی است` }
          : null),
        ...(props?.type === "password"
          ? {
              minLength: {
                value: 5,
                message: `فیلد ${label ?? "فوق"} باید حداقل 5 کاراکتر باشد`,
              },
            }
          : null),
        ...(props?.type === "password" && name === "confirm-password"
          ? {
              validate: (value) =>
                value === watch("password") ||
                "رمز عبور و تکرار آن با یکدیگر مطابقت ندارند.",
            }
          : null),
      }}
      render={({
        field: { ref, onChange, ...allField },
        fieldState: { error },
      }) => (
        <div
          className={twMerge(
            `mb-2 w-full gap-1 lg:mb-6 lg:min-w-[265px] lg:flex-row  lg:items-center lg:gap-3`,
            wrapperClassName
          )}
        >
          {label ? (
            <label className="font-noraml mb-1 inline-block text-sm text-hgray-600 lg:min-w-[80px]">
              {label}
            </label>
          ) : null}
          <div className={`relative`}>
            <TextInput
              error={error}
              field={{
                ...allField,
                onChange: (e) =>
                  props.type === "number"
                    ? onChange(Number(e.target.value))
                    : onChange(e.target.value),
              }}
              {...{ className, ...allProps }}
            />
            <p className="absolute -bottom-5 right-0-0 text-xs font-semibold text-rose-500">
              {error ? error.message : ""}
            </p>

            {error ? (
              <span className={`absolute text-rose-500 left-1 top-1`}>
                <IconAlertCircleOutline width={26} height={26} />
              </span>
            ) : null}
          </div>
        </div>
      )}
    />
  );
}

export default React.memo(TextField);
