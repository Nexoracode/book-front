import { useEffect, useState } from "react";
import SelectField from "../../components/Form/Select/SelectField";
import { useFormContext } from "react-hook-form";
import { cities } from "../../data/region";
import TextField from "../../components/Form/TextField";

export default function SelectCity() {
  const [enableTextBox, setEnableTextBox] = useState(false);
  const { watch, setValue } = useFormContext();
  const province = watch("province");

  useEffect(() => {
    if (enableTextBox) setValue("city", null);
  }, [enableTextBox]);
  return (
    <div className="w-full lg:w-[calc(50%-8px)]">
      {enableTextBox ? (
        <div className="relative mb-[-14px]">
          <TextField
            row
            rows={5}
            name="city_name"
            label="نام شهر"
            required
            autoFocus
          />
          <p className="text-primary-400 absolute top-0 left-0 font-semibold text-sm">
            نام شهر خود را در فیلد وارد کنید
          </p>
        </div>
      ) : (
        <div className="mb-[-16px]">
          <SelectField
            items={
              province
                ? cities
                    .filter((i) => i.province_id === province)
                    .map((i) => ({ label: i.name, value: i.name }))
                : [{ label: "ابتدا استان را انتخاب کنید", value: "" }]
            }
            name="city"
            initOption={province?.id}
            required={!enableTextBox}
            label="شهر محل سکونت"
            defaultValue={"null"}
          />
        </div>
      )}

      <label className="label font-semibold text-sm inline-block">
        <input
          type="checkbox"
          checked={enableTextBox}
          onChange={(e) => setEnableTextBox(e.target.checked)}
          className="checkbox checkbox-xs checkbox-warning"
        />
        <span className="pr-2">شهر من در گزینه ها موجود نیست</span>
      </label>
    </div>
  );
}
