import { Controller, FieldValues, RegisterOptions } from "react-hook-form";
import PriceInput from "./PriceInput";
import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";

type Props = {
  required?: boolean;
  name: string;
  label: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
};

export default function PriceField(props: Props) {
  const { required, name, rules, label } = props;
  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        ...(required
          ? { required: `ورود فیلد ${label ?? "فوق"} الزامی است` }
          : null),
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="mb-2 w-full gap-1 lg:mb-6 lg:min-w-[265px] lg:flex-row  lg:items-center lg:gap-3">
          {label ? (
            <label className="font-noraml mb-1 inline-block text-sm text-hgray-600 lg:min-w-[80px]">
              {label}
            </label>
          ) : null}
          <div className={`relative`}>
            <PriceInput
              {...props}
              value={value}
              onChange={onChange}
              error={error}
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
