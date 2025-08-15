import Paper from "../Assets/Paper";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import TextField from "../Form/TextField";
import MobileField from "../Form/MobileField";
import SelectCity from "../../pages/Checkout/SelectCity";
import SelectField from "../Form/Select/SelectField";
import { provinces } from "../../data/region";
import QuantityInput from "../Form/QuantityInputProps";
import Button from "../Assets/Button";
import useGetProducts from "../../hooks/useGetProducts";
import useAddOrder from "../../hooks/useAddOrder";
import usePaymentWithout from "../../hooks/usePaymentWithout";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {};

export default function AdminAddOrder({}: Props) {
  const { products } = useGetProducts();
  const { mutate: addOrder, isSuccess, isPending, data } = useAddOrder();
  const {
    mutate: paymentWithout,
    isPending: paymentPending,
    isSuccess: paymentSuccess,
  } = usePaymentWithout();
  const form = useForm();
  const province = form.watch("province");

  const handleSubmit = async (values: FieldValues) => {
    try {
      const {
        city,
        firstName,
        lastName,
        phone,
        plaque,
        postalCode,
        productId,
        province,
        quantity,
        street,
      } = values;
      addOrder({
        city,
        firstName,
        lastName,
        phone: phone.replaceAll(" ", ""),
        plaque,
        postalCode,
        productId,
        province : provinces.find(i=>i.id === province)?.name ?? '',
        quantity,
        street,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      paymentWithout({ orderId: data?.data.id });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success("سفارش با موفقیت افزوده شد.");
    }
  }, [paymentSuccess]);
  return (
    <Paper className="max-w-6xl mx-auto">
      <h2 className="text-center font-semibold text-xl pt-3 pb-8">
        ثبت دستی سفارش
      </h2>

      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-4 flex-wrap">
              <div className="w-full lg:w-[calc(50%-8px)]">
                <SelectField
                  items={
                    products?.data.map((i) => ({
                      label: `${i.name}`,
                      value: i.id,
                    })) ?? []
                  }
                  initOption={true}
                  name="productId"
                  required
                  label="انتخاب محصول"
                  defaultValue={"null"}
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <QuantityInput name="quantity" register={form.register} />
              </div>

              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="firstName" required label="نام" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField name="lastName" required label="نام خانوادگی" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <MobileField
                  className="w-full"
                  name="phone"
                  required
                  label="تلفن همراه"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <SelectField
                  items={provinces.map((i) => ({
                    label: i.name,
                    value: i.id,
                  }))}
                  initOption={!province?.id}
                  name="province"
                  required
                  label="استان محل سکونت"
                  defaultValue={"null"}
                />
              </div>

              <SelectCity />
              <div className="w-[100%]">
                <TextField
                  row
                  rows={5}
                  multiple
                  name="street"
                  required
                  label="آدرس"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row rows={5} name="plaque" required label="پلاک" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row
                  rows={5}
                  name="postalCode"
                  label="کد پستی(اختیاری)"
                  rules={{
                    minLength: {
                      value: 10,
                      message: "کد پستی باید دقیقا 10 کاراکتر باشد.",
                    },
                    maxLength: {
                      value: 10,
                      message: "کد پستی باید دقیقا 10 کاراکتر باشد.",
                    },
                  }}
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <Button type="submit">ثبت سفارش</Button>
              </div>
            </div>
          </form>
        </FormProvider>

        {isPending || paymentPending ? (
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
    </Paper>
  );
}
