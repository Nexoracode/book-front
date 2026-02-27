import { FormProvider, useForm } from "react-hook-form";
import Paper from "../../components/Assets/Paper";
import TextField from "../../components/Form/TextField";
import MobileField from "../../components/Form/MobileField";
import ContainerLayout from "../../components/Assets/ContainerLayout";
import SelectField from "../../components/Form/Select/SelectField";
import { provinces } from "../../data/region";
import Button from "../../components/Assets/Button";
import { useCart } from "../../store/CartProvider";
import useAddOrder, { AddOrderVariables } from "../../hooks/useAddOrder";
import LoadingButton from "../../components/Assets/LoadingButton";
import { useEffect, useState } from "react";
import useInvice from "../../hooks/useInvice";
import { useNavigate } from "react-router-dom";
import SelectCity from "./SelectCity";
import DiscountSection from "./DiscountSection";
import OrderSummerySection from "./OrderSummerySection";
import FinalPriceSection from "./FinalPriceSection";

export default function Checkout() {
  const form = useForm({});
  const { cart } = useCart();
  const { mutate, isPending, isSuccess, data } = useAddOrder();
  const [submitData, setSubmitData] = useState<AddOrderVariables | null>(null);
  const { addInvoice, invoicePending, invoiceSuccess, invoiceData } =
    useInvice();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    const { province, phone, city, city_name, postalCode } = values;
    setSubmitData({
      ...values,
      productId: cart[0].product.id,
      quantity: cart[0].quantity,
      phone: phone.replaceAll(" ", "".length),
      province: provinces.find((i) => i.id === province)?.name,
      city: city ?? city_name,
      postalCode:
        typeof postalCode === "string" && postalCode.length === 0
          ? null
          : postalCode,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setSubmitData(null);
      addInvoice({ orderId: data?.data.id });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (cart.length === 0) navigate("/");
  }, [cart]);

  useEffect(() => {
    if (invoiceSuccess) {
      window.location.href = invoiceData?.data.url;
    }
  }, [invoiceSuccess]);

  const province = form.watch("province");

  return (
    <ContainerLayout className="!max-w-[760px] p-4 w-full my-11">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, () =>
            window.scrollTo({ top: 0, behavior: "smooth" }),
          )}
        >
          <div className="flex-col">
            <Paper className="p-4 mt-7">
              <h3 className="mb-4 text-hgray-400 font-semibold">
                اطلاعات خریدار
              </h3>

              <div className="flex gap-4 flex-wrap">
                <div className="w-full lg:w-[calc(50%-8px)]">
                  <TextField
                    row={false}
                    name="firstName"
                    required
                    label="نام"
                  />
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
              </div>
            </Paper>
            <Paper className="p-4 mt-7">
              <h3 className="mb-4 text-hgray-400 font-semibold">
                شیوه دریافت کتاب
              </h3>

              <div className="flex gap-4 flex-wrap">
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
                  <TextField row rows={5} name="street" required label="آدرس" />
                </div>
                <div className="w-full lg:w-[calc(50%-8px)]">
                  <TextField
                    row
                    type="number"
                    rows={5}
                    name="plaque"
                    required
                    label="پلاک"
                  />
                </div>
                <div className="w-full lg:w-[calc(50%-8px)]">
                  <TextField
                    row
                    rows={5}
                    name="postalCode"
                    label="کد پستی(اختیاری)"
                    maxLength={10}
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
              </div>
            </Paper>

            <DiscountSection />

            <OrderSummerySection />

            <FinalPriceSection />

            <div className="flex justify-between mt-7">
              <Button color="gray" href="/">
                بازگشت
              </Button>
              <Button type="submit">ثبت سفارش</Button>
            </div>
          </div>
        </form>
      </FormProvider>

      {submitData ? (
        <div className="fixed w-screen h-screen bg-black/30 top-0 right-0 flex items-center justify-center">
          <div className="bg-white w-full mx-4 max-w-sm p-3 lg:p-6 rounded-xl">
            <p className="text-center font-semibold text-hgray-500 !mb-5">
              اطلاعات ثبت شده شما به شرح زیر می باشد
            </p>
            <SubmitDataItem
              label="نام و نام خانوادگی"
              value={`${submitData?.firstName} ${submitData?.lastName}`}
            />
            <SubmitDataItem label="شماره موبایل" value={submitData?.phone} />
            <SubmitDataItem label="استان" value={submitData?.province} />
            <SubmitDataItem label="شهر" value={submitData?.city} />
            <SubmitDataItem label="خیابان" value={submitData?.street} />
            <SubmitDataItem label="پلاک" value={`${submitData?.plaque}`} />
            <SubmitDataItem label="کد پستی" value={submitData?.postalCode} />
            <div className="flex mt-5 justify-end gap-2">
              <LoadingButton
                disabled={isPending}
                fullWidth
                loading={isPending}
                onClick={() => mutate(submitData)}
                size="small"
                className="px-3  py-2 font-medium"
              >
                تایید و پرداخت
              </LoadingButton>
              <Button
                onClick={() => setSubmitData(null)}
                color="gray"
                outlined
                fullWidth
                className="px-3 py-2 font-medium"
                size="small"
              >
                ویرایش
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {invoicePending ? (
        <div className="fixed w-screen h-screen bg-black/30 top-0 right-0 flex items-center justify-center">
          <div className="bg-white text-center p-3 rounded-xl">
            <img
              className="mx-auto"
              width={40}
              height={40}
              src="/form-loading.svg"
            />
            <p className="mt-4">در حال انتقال به درگاه پرداخت</p>
          </div>
        </div>
      ) : null}
    </ContainerLayout>
  );
}

function SubmitDataItem({ label, value }: { label: string; value: string }) {
  return (
    <p className="justify-between text-hgray-400 text-sm  flex border-b border-solid border-hgray-400/30 !py-1.5">
      {label}: <span className="text-hgray-600 font-semibold">{value}</span>
    </p>
  );
}
