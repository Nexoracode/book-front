import { FormProvider, useForm } from "react-hook-form";
import TextField from "../../Form/TextField";
import SelectField from "../../Form/Select/SelectField";
import PriceField from "../../Form/PriceField";
import Button from "../../Assets/Button";
import DateField from "../../Form/DateField";
import { Discount } from "../../../types";

type Props = {
  handleSubmit: (values: any) => void;
  isPending: boolean;
  values?: Discount;
  mode: "add" | "edit";
};

export default function DiscountForm({
  handleSubmit,
  isPending,
  values,
  mode,
}: Props) {
  const form = useForm({
    values: {
      ...values,
      value_percentage: Number(values?.value).toFixed(),
      value_fixed: Number(values?.value).toFixed(),
    },
  });
  const type = form.watch("type");

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex gap-4 flex-wrap">
            <div className="w-full lg:w-[calc(50%-8px)]">
              <TextField row={false} name="code" required label="کد تخفیف" />
            </div>
            <div className="w-full lg:w-[calc(50%-8px)]">
              <SelectField
                items={[
                  { label: "مبلغ ثابت", value: "fixed" },
                  { label: "درصدی", value: "percentage" },
                ]}
                name="type"
                initOption={false}
                required
                label="نوع تخفیف"
                defaultValue={"percentage"}
              />
            </div>
            <div className="w-full lg:w-[calc(33%-8px)]">
              {type === "percentage" ? (
                <TextField
                  type="number"
                  row={false}
                  rules={{
                    max: {
                      value: 100,
                      message: "درصد کد تخفیف از 100 نمیتواند بیشتر باشد",
                    },
                  }}
                  name="value_percentage"
                  required
                  label="درصد تخفیف"
                />
              ) : (
                <PriceField required name="value_fixed" label="مبلغ تخفیف" />
              )}
            </div>

            <div className="w-full lg:w-[calc(33%-8px)]">
              <TextField
                row={false}
                name="maxUses"
                type="number"
                label="محدودیت تعداد استفاده"
              />
            </div>
            <div className="w-full lg:w-[calc(33%-8px)]">
              <DateField name="expiresAt" label="زمان انقضا" />
            </div>

            <div className="w-full lg:w-[calc(50%-8px)]">
              <Button type="submit">
                {mode === "add" ? "ایجاد کد تخفیف" : "ویرایش کد تخفیف"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

      {isPending ? (
        <div className="fixed w-screen h-screen bg-black/30 top-0 right-0 flex items-center justify-center">
          <div className="bg-white text-center p-3 rounded-xl">
            <img
              className="mx-auto"
              width={40}
              height={40}
              src="/form-loading.svg"
            />
            <p className="mt-4">در حال ذخیره سازی اطلاعات</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
