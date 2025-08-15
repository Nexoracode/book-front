import React from "react";
import ContainerLayout from "../../components/Assets/ContainerLayout";
import Paper from "../../components/Assets/Paper";
import useGetOrder from "../../hooks/useGetOrder";
import { useNavigate, useParams } from "react-router-dom";
import IconLoading from "../../components/Icons/IconLoading";
import { twMerge } from "tailwind-merge";
import { orderStatus } from "../../utils/translate";
import { toLocalString } from "../../utils/numbers";
import { SharpArrowBackIcon } from "../../components/Icons/SharpArrowBackIcon";

const orderStatusColors = {
  Pending: "bg-orange-200/30",
  Processing: "bg-green-200/30",
  Completed: "bg-green-400/30",
  FailPayment: "bg-rose-200/30",
  FailVerify: "bg-green-300/30",
  Canceled: "bg-green-100",
};

const formatter = new Intl.DateTimeFormat("fa-IR", {
  day: "numeric", // نمایش عدد روز
  month: "long", // نمایش نام ماه (مثل اسفند)
  year: "numeric", // نمایش سال
  //weekday: "long", // نمایش نام روز هفته (مثل پنجشنبه)
  hour: "2-digit", // نمایش ساعت
  minute: "2-digit", // نمایش دقیقه
  hour12: false, // فرمت 24 ساعته
});
type Props = {};

export default function OrderDetail({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) return <>404</>;
  const { data, isFetching } = useGetOrder({ id: +id });

  return (
    <ContainerLayout className="my-7">
      {isFetching ? (
        <Paper className="flex items-center justify-center">
          <IconLoading width={32} height={32} />{" "}
        </Paper>
      ) : data ? (
        <React.Fragment>
          <Paper className="flex items-center justify-between">
            <p className="font-semibold">{`سفارش #${data?.id}`}</p>

            <button
              className="btn  btn-ghost"
              color="gray"
              onClick={() => navigate(-1)}
            >
              بازگشت
              <SharpArrowBackIcon width={22} height={22} />
            </button>
          </Paper>
          <div className="flex gap-5 my-7">
            <Paper className="flex-[30%]">
              <p className="font-semibold">{`مشخصات سفارش #${data?.id}`}</p>
              <p>
                وضعیت:{" "}
                <span
                  className={`px-2  text-xs rounded-lg ${
                    orderStatusColors[data?.status]
                  }`}
                >
                  {orderStatus[data.status]}
                </span>
              </p>

              <InvoiceRow
                className=""
                label="تاریخ سفارش"
                value={formatter.format(Date.parse(data.createdAt))}
              />
              <InvoiceRow
                className=""
                label="تعداد سفارش"
                value={data.quantity}
              />
            </Paper>
            <Paper className="flex-[30%]">
              <div className="flex items-center">
                <span className="text-white w-14 h-14 rounded-full bg-green-400 flex justify-center items-center">
                  {data.user.lastName.charAt(0)}
                </span>
                <span className="pr-3">
                  {data.user.firstName} {data.user.lastName} <br />
                  <span className="inline-block text-hgray-500 px-1 rounded-full text-xs bg-amber-500/40">
                    مشتری
                  </span>
                </span>
              </div>

              <InvoiceRow
                className=""
                label=""
                value={`${data.address.province} ${data.address.city} ${data.address.street} ${data.address.plaque}`}
              />
              <InvoiceRow
                label="پلاک"
                className=""
                value={`${data.address.plaque}`}
              />
              <InvoiceRow
                label="کد پستی"
                className=""
                value={`${data.address.postalCode}`}
              />
              <InvoiceRow
                label="شهر"
                className=""
                value={`${data.address.province} | ${data.address.city}`}
              />
              <InvoiceRow
                label="تلفن هماهنگی"
                className=""
                value={`${data.user.phone}`}
              />
            </Paper>
            <Paper className="flex-[40%]">
              <p className="font-semibold">مشخصات پرداخت</p>
              <InvoiceRow
                label="کد رهگیری"
                className=""
                value={`${data.invoice?.transactionId}`}
              />
              <InvoiceRow
                label="مبلغ پرداختی"
                className=""
                value={`${toLocalString(+data.invoice?.amount)} تومان`}
              />
              <InvoiceRow
                label="تاریخ پرداخت"
                className=""
                value={new Date(
                  Date.parse(data.invoice?.createdAt)
                ).toLocaleString("fa-IR")}
              />
              <InvoiceRow
                label="شماره کارت"
                className=""
                value={`${data.invoice?.cardPan}`}
              />
              <InvoiceRow
                className=""
                label="وضعیت پرداخت"
                value={
                  <span
                    className={`px-2 text-hgray-500 font-light text-xs rounded-lg ${
                      orderStatusColors[data?.status]
                    }`}
                  >
                    {orderStatus[data.status]}
                  </span>
                }
              />
            </Paper>
          </div>

          <Paper></Paper>
        </React.Fragment>
      ) : (
        <p>سفارش یافت نشد.</p>
      )}
    </ContainerLayout>
  );
}

function Label({ label }: { label: string }) {
  return <p className="text-hgray-500 font-semibold text-sm">{label}</p>;
}

function InvoiceRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | React.ReactNode;
  className: string;
}) {
  return (
    <div className="flex border-b border-hgray-300 last:border-0 items-center justify-between py-2">
      <Label label={label} />
      <p className={twMerge(`text-sm font-bold text-neutral-900`, className)}>
        {value}
      </p>
    </div>
  );
}
