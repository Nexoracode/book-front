;
import clsx from "clsx";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  defaultValue?: string;
};

enum gender {
  male = 1,
  female = 0,
}
var items = [
  {
    label: "آقا",
    value: gender.male,
  },
  {
    label: "خانم",
    value: gender.female,
  },
];
export default function GenderSelect(props: Props) {
  var { name, defaultValue = gender.male } = props;

  var { setValue, control } = useFormContext();
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex bg-white dark:bg-mdark-500 rounded-md items-center">
          {items.map((i) => (
            <label
              className={clsx(
                "text-hgray-500 dark:text-hgray-200 text-base font-normal rounded-md p-1 flex-1 w-24 text-center",
                field.value === i.value && "text-white bg-primary-300"
              )}
              key={i.value}
            >
              <input
                className="hidden"
                type="radio"
                value={i.value}
                name={name}
                defaultChecked={i.value === field.value}
                onChange={(e) => e.target.checked && field.onChange(i.value)}
              />
              {i.label}
            </label>
          ))}
        </div>
      )}
    />
  );
}
