import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

type QuantityInputProps = {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  name,
  label = "تعداد دریافتی",
  min = 1,
  max = 99,
  register,
  error,
}) => {
  const [value, setValue] = React.useState(min);

  const handleChange = (val: number) => {
    if (val >= min && val <= max) {
      setValue(val);
    }
  };

  return (
    <div className="form-control  w-full rounded-md">
      <label className="label block">
        <span className="label-text">{label}</span>
      </label>
      <div className="join w-full">
        <button
          type="button"
          className="btn text-xl join-item rounded-r-xl"
          onClick={() => handleChange(value - 1)}
        >
          -
        </button>
        <input
          type="number"
          {...register(name, {
            min,
            max,
            valueAsNumber: true,
            onChange: (e) => setValue(Number(e.target.value)),
          })}
          className="input input-bordered text-xl join-item w-20 text-center"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
        <button
          type="button"
          className="btn text-xl join-item rounded-l-xl"
          onClick={() => handleChange(value + 1)}
        >
          +
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default QuantityInput;
