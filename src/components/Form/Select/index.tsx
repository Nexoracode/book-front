import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import IconDownOpen from "../../Icons/IconDownOpen";
import usePopup from "../../../hooks/usePopup";

type SelectItem = {
  label: string;
  value: string | number | null;
};
export type SelectProps = {
  items: SelectItem[];
  label: string;
  isLoading?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  defaultValue?: string | number | undefined;
  initOption?: boolean;
  name: string;
};

export default function Select({
  items,
  label,
  isLoading,
  onChange,
  className,
  defaultValue = "null",
  initOption = true,
  name = "select-field",
}: SelectProps) {
  var [inputValue, setInputValue] = useState<string | number | undefined>();
  var { open, setOpen, wrapperRef } = usePopup();

  var handleChange = (selectedValue: any) => {
    setInputValue(() => selectedValue);
    onChange?.(selectedValue);
  };

  useEffect(() => {
    setInputValue(() => defaultValue);
  }, [defaultValue]);

  var { watch } = useFormContext();

  var selectedValue = watch(name);

  useEffect(() => {
    handleChange(selectedValue);
  }, [selectedValue]);
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className={clsx(
          `relative flex min-h-9 min-w-[200px] items-center justify-between pl-12 bg-hgray-200 w-full p-1 px-2 rounded-lg outline-2 outline-hgray-300 focus:outline-primary-50`,
          className,
        )}
      >
        {isLoading ? (
          <p>دریافت اطلاعات...</p>
        ) : inputValue ? (
          [
            ...(initOption ? [{ label: "انتخاب کنید", value: "null" }] : []),
            ...items,
          ]?.find((i) => i.value === inputValue)?.label
        ) : (
          label
        )}

        {
          <IconDownOpen
            className={`absolute left-1 top-[50%] translate-y-[-50%] ${
              open && "rotate-180"
            }`}
            width={22}
            height={22}
          />
        }
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute left-0 right-0 top-[100%] max-h-[300px] overflow-auto z-50 translate-y-2 rounded-lg bg-white p-1.5 px-2 shadow-md"
        >
          {[
            ...(initOption ? [{ label: "انتخاب کنید", value: "null" }] : []),
            ...items,
          ]?.map((item) => (
            <span
              key={item.label}
              className="border:bg-mdark-400 block cursor-pointer border-b border-hgray-300 py-2 text-sm font-medium text-hgray-600 hover:bg-hgray-200"
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
