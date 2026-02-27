import React, { ComponentProps, useEffect } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
} & ComponentProps<typeof DatePicker>;
function DateField(props: Props) {
  var {
    name,
    rules,
    required,
    label,
    defaultValue,
    className,
    wrapperClassName,
    row,
    range,
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
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div
          className={twMerge(
            `mb-2 w-full gap-1 lg:mb-6 lg:min-w-[265px] lg:flex-row  lg:items-center lg:gap-3`,
            wrapperClassName,
          )}
        >
          {label ? (
            <label className="font-noraml mb-1 inline-block text-sm text-hgray-600 lg:min-w-[80px]">
              {label}
            </label>
          ) : null}
          <div className={`relative`}>
            <DatePicker
              className="w-full"
              inputClass="bg-hgray-200 w-full p-1.5 px-2 rounded-lg outline outline-2 outline-hgray-300  focus:outline-primary-50"
              locale={persian_fa}
              calendar={persian}
              onChange={(date) => {
                if (range) {
                  const dateRange = date as [DateObject, DateObject];
                  dateRange[0] &&
                    dateRange[1] &&
                    onChange(name, [
                      dateRange[0].toDate().toISOString(),
                      dateRange[1].toDate().toISOString(),
                    ]);
                } else {
                  const dateObject = date as DateObject;
                  onChange(name, dateObject.toDate().toISOString());
                }
              }}
              {...allProps}
              range={range}
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

export default React.memo(DateField);
