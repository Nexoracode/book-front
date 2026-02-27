import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import ContainerLayout from "../../components/Assets/ContainerLayout";
import usePaymentVerify from "../../hooks/usePaymentVerify";
import LayoutLoading from "../../components/Assets/LayoutLoading";
import Paper from "../../components/Assets/Paper";
import { toLocalString } from "../../utils/numbers";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Assets/Button";
import { useEffect } from "react";
import useInvice from "../../hooks/useInvice";
import { toast } from "react-toastify";
import { useCart } from "../../store/CartProvider";

const formatter = new Intl.DateTimeFormat("fa-IR", {
  day: "numeric", // نمایش عدد روز
  month: "long", // نمایش نام ماه (مثل اسفند)
  year: "numeric", // نمایش سال
  //weekday: "long", // نمایش نام روز هفته (مثل پنجشنبه)
  hour: "2-digit", // نمایش ساعت
  minute: "2-digit", // نمایش دقیقه
  hour12: false, // فرمت 24 ساعته
  timeZone: "UTC",
});

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const { addInvoice, invoicePending, invoiceSuccess, invoiceData } =
    useInvice();
  const Authority = searchParams.get("Authority");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { data, isPending } = usePaymentVerify({
    Authority,
    orderId,
  });

  const { handleClearCart } = useCart();

  const handlePrint = () => {
    print();
  };

  useEffect(() => {
    if (data?.statusCode !== 200) toast.error(data?.message);

    if (data?.statusCode === 409) navigate("/");

    if (data?.statusCode === 200) {
      handleClearCart();
    }
  }, [data]);
  useEffect(() => {
    if (invoiceSuccess) {
      window.location.href = invoiceData?.data.url;
    }
  }, [invoiceSuccess]);
  return (
    <ContainerLayout className="!max-w-lg mt-12">
      {isPending ? (
        <LayoutLoading />
      ) : data?.data ? (
        <Paper>
          {data.statusCode === 200 ? (
            <>
              <p className="text-green-800 my-5 font-semibold text-center">
                {data.message}
              </p>

              <InvoiceRow
                value={data.data.order.id}
                className=""
                label="شماره سفارش"
              />

              <InvoiceRow
                value={data.data.payment?.transactionId ?? "-"}
                className=""
                label="کد رهگیری"
              />

              <InvoiceRow
                value={
                  toLocalString(
                    +data.data.order.totalAmount +
                      data.data.order.product?.postage,
                  ) + " تومان"
                }
                className=""
                label="مبلغ"
              />

              <InvoiceRow
                value={formatter.format(Date.parse(data.data.date))}
                className=""
                label="تاریخ پرداخت"
              />

              <InvoiceRow
                value={data.data.payment?.cardPan ?? "-"}
                className="ltr"
                label="شماره کارت"
              />

              <InvoiceRow
                value={"پرداخت موفق"}
                className={"text-green-800"}
                label={"وضعیت پرداخت"}
              />

              <InvoiceRow
                value={"پرداخت شده"}
                className=""
                label="وضعیت سفارش"
              />

              <InvoiceRow
                value={data.data.order?.product?.name ?? "-"}
                className=""
                label="نام محصول"
              />
              <InvoiceRow
                value={
                  data.data.order?.user
                    ? `${data.data.order.user.firstName} ${data.data.order.user.lastName}`
                    : "-"
                }
                className=""
                label="نام و نام خانوادگی"
              />
              <Button className="mt-5" fullWidth onClick={() => handlePrint()}>
                چاپ
              </Button>
            </>
          ) : data.statusCode === 409 ? (
            <Navigate to={"/"} />
          ) : (
            <>
              <p className="text-rose-600 my-5 font-semibold text-center">
                {data.message}
              </p>

              <InvoiceRow
                value={"خطا در پرداخت"}
                className={"text-rose-900"}
                label={"وضعیت پرداخت"}
              />

              <InvoiceRow
                value={data.data.order.id}
                className=""
                label="شماره سفارش"
              />
              <InvoiceRow
                value={data.data.order?.product?.name ?? "-"}
                className=""
                label="نام محصول"
              />
              <InvoiceRow
                value={
                  data.data.order?.user
                    ? `${data.data.order.user.firstName} ${data.data.order.user.lastName}`
                    : "-"
                }
                className=""
                label="نام و نام خانوادگی"
              />

              <InvoiceRow
                value={formatter.format(Date.parse(data.data.order.createdAt))}
                className=""
                label="تاریخ"
              />

              <Button
                onClick={() => addInvoice({ orderId: data.data.order.id })}
                fullWidth
                color="error"
              >
                پرداخت مجدد
              </Button>
            </>
          )}
        </Paper>
      ) : (
        <Navigate to={"/"} />
      )}

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

function Label({ label }: { label: string }) {
  return <p className="text-hgray-500 font-semibold text-sm">{label}</p>;
}

function InvoiceRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <Label label={label} />
      <p className={twMerge(`text-sm font-bold text-neutral-900`, className)}>
        {value}
      </p>
    </div>
  );
}
