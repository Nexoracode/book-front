import { useEffect } from "react";
import Select, { SelectProps } from ".";
import { Controller, useFormContext } from "react-hook-form";
import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";

type Props = {
  name: string;
  required?: boolean;
} & SelectProps;

export default function SelectField(props: Props) {
  var { required, name, label, ...allProps } = props;
  var { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, allProps.defaultValue);
  }, [allProps.defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `انتخاب فیلد ${label} الزامی است.` : undefined,
        validate: required
          ? (val) => val !== "null" || `انتخاب فیلد ${label} الزامی است.`
          : undefined,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="pb-8">
          {label ? (
            <label className="font-noraml text-sm mb-1 inline-block text-hgray-600 lg:min-w-[80px]">
              {label}
            </label>
          ) : null}
          <div className="relative">
            <Select
              {...allProps}
              className={error ? "outline-red-500" : ""}
              value={value}
              name={name}
              onChange={onChange}
              label={""}
            />
            <p className="absolute -bottom-5 right-0 text-xs font-semibold text-rose-500">
              {error ? error.message : ""}
            </p>

            {error ? (
              <span className="absolute text-rose-500 left-6 top-1.5">
                <IconAlertCircleOutline width={26} height={26} />
              </span>
            ) : null}
          </div>
        </div>
      )}
    />
  );
}
