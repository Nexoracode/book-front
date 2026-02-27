import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";
import { PatternFormat } from "react-number-format";

type Props = {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
};

export var mobilePattern = /^09\d{2}\d{3}\d{4}$/g;
var MobileField = (props: Props) => {
  var { name, label, className, required = true } = props;
  var { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={{
        required: required ? "ورود شماره موبایل الزامی است." : undefined,
        pattern: {
          value: mobilePattern,
          message: "شماره وارد شده صحیح نیست",
        },
      }}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label ? (
            <label className="text-hgray-600 dark:text-text-dark-3 font-medium  text-sm mb-2 block">
              {label}
            </label>
          ) : null}
          <div className="relative lg:items-center">
            <PatternFormat
              {...field}
              lang="fa-IR"
              autoComplete={name}
              className={clsx(
                className,
                "bg-hgray-200 p-1.5 px-2  text-hgray-400 ltr pl-7 rounded-lg !border-none !shadow-none outline-2 outline-hgray-300  focus:outline-primary-50",
                error ? "!outline-red-500 " : "",
              )}
              format="###########"
              allowEmptyFormatting
              mask="_"
            />
            <p className="text-hgray-350 text-sm pt-1">مثال: 09123456789</p>
            <p className="absolute -bottom-3 right-0 text-xs font-semibold text-rose-500">
              {error ? error.message : ""}
            </p>

            {error ? (
              <span className="absolute text-rose-500 left-1 top-1">
                <IconAlertCircleOutline width={26} height={26} />
              </span>
            ) : null}
          </div>
        </div>
      )}
    />
  );
};

export default MobileField;
