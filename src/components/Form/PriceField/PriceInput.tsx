import React, { useEffect } from "react";
import { FieldError } from "react-hook-form";

const numberToPersianWords = (num: number): string => {
  if (num === 0) return "صفر";
  const persianNums = [
    "",
    "یک",
    "دو",
    "سه",
    "چهار",
    "پنج",
    "شش",
    "هفت",
    "هشت",
    "نه",
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const units = ["", "هزار", "میلیون", "میلیارد"];

  const getTwoDigit = (n: number) =>
    n < 20
      ? persianNums[n]
      : tens[Math.floor(n / 10)] + (n % 10 ? " و " + persianNums[n % 10] : "");

  const getThreeDigit = (n: number) => {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    return (
      (h > 0 ? hundreds[h] : "") +
      (rest > 0 ? (h > 0 ? " و " : "") + getTwoDigit(rest) : "")
    );
  };

  let result = "";
  let i = 0;
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      result =
        getThreeDigit(chunk) +
        (units[i] ? " " + units[i] : "") +
        (result ? " و " + result : "");
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return result;
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  min?: number;
  value: string;
  onChange: (n: number) => void;
};

const PriceInput: React.FC<Props> = ({
  name,
  placeholder = "مثلاً ۵۰۰۰۰",
  error,
  min = 0,
  value,
  onChange,
}) => {
  const [rawValue, setRawValue] = React.useState<string>(value ?? "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setRawValue(val);
    onChange(Number(val));
  };

  const numericValue = Number(rawValue);

  useEffect(() => {
    if (value && !rawValue) setRawValue(String(value));
  }, [value]);
  return (
    <div className="form-control w-full">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={rawValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        className={`bg-hgray-200 w-full p-1.5 px-2 rounded-lg outline-2 outline-hgray-300  focus:outline-primary-50 ${
          error ? "input-error" : ""
        }`}
        name={name}
        onChange={handleInputChange}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}

      {numericValue >= min && (
        <span className="text-sm text-gray-500 mt-2">
          مبلغ به حروف:{" "}
          <strong>{numberToPersianWords(numericValue)} تومان</strong>
        </span>
      )}
    </div>
  );
};

export default PriceInput;
