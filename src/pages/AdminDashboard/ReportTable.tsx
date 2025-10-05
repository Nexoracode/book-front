import { Link } from "react-router-dom";
import Paper from "../../components/Assets/Paper";
import Table from "../../components/Assets/Table";
import useGetOrders from "../../hooks/useGetOrders";
import { toLocalString } from "../../utils/numbers";
import { orderStatus } from "../../utils/translate";
import Select from "../../components/Form/Select";
import { FormProvider, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TextInput from "../../components/Form/TextField/TextInput";
import { SearchIcon } from "../../components/Icons/SearchIcon";
import { useEffect, useState } from "react";
import Pagination from "../../components/Assets/Pagination";
import useGetProducts from "../../hooks/useGetProducts";
import { useReport } from "./ReportProvider";
const allOrderStatus = [
  { label: "همه", value: "null" },
  { label: "ثبت اولیه", value: "Pending" },
  { label: "در انتظار پرداخت", value: "Processing" },
  { label: "پرداخت شده", value: "Completed" },
  { label: "خطا در پرداخت", value: "FailPayment" },
  { label: "پرداخت نا موفق", value: "FailVerify" },
  { label: "لغو شده", value: "Canceled" },
  { label: "مدیریت", value: "adminPayment" },
];
const orderStatusColors = {
  Pending: "bg-orange-200/30",
  Processing: "bg-green-200/30",
  Completed: "bg-green-400/30",
  FailPayment: "bg-rose-200",
  FailVerify: "bg-rose-300",
  Canceled: "bg-rose-100",
  adminPayment: "bg-amber-400",
};
const headers = [
  {
    label: "ردیف",
    key: "inx",
  },
  {
    label: "شماره سفارش",
    key: "orderId",
  },
  {
    label: "تاریخ سفارش",
    key: "date",
  },
  {
    label: "سفارش دهنده",
    key: "user",
  },
  {
    label: "نام محصول",
    key: "product",
  },
  {
    label: "تعداد",
    key: "count",
  },
  {
    label: "شهر",
    key: "region",
  },
  {
    label: "وضعیت",
    key: "status",
  },
  {
    label: "حمل",
    key: "haml",
  },
  {
    label: "پرداخت شده",
    key: "price",
  },
];
export default function ReportTable() {
  const { data, meta, setMeta } = useGetOrders();
  const { filters, setFilters } = useReport();
  const { products } = useGetProducts();
  const [search, setSearch] = useState("");

  const form = useForm();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search || search) {
        setMeta({ ...meta, page: 1 });
        setFilters({ ...filters, search });
      }
    });

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setMeta({ ...meta, page: 1 });
  }, [filters]);

  return (
    <div>
      <Paper className="my-5">
        <FormProvider {...form}>
          <div className="flex items-center flex-wrap">
            <div className="w-full  md:w-[30%] p-4">
              <TextInput
                Icon={SearchIcon}
                placeholder="جستجو بر اساس کاربر..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[20%]  p-4">
              <Select
                defaultValue={filters["filter.status"]}
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    "filter.status": value === "null" ? undefined : value,
                  })
                }
                items={allOrderStatus}
                initOption={false}
                name=""
                label="وضعیت سفارش"
              />
            </div>
            <div className="w-full md:w-[20%]  p-4">
              <Select
                defaultValue={filters["filter.product_id"]}
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    "filter.product_id": value === "null" ? undefined : value,
                  })
                }
                items={
                  products?.data
                    ? [
                        { label: "همه", value: null },
                        ...products?.data.map((i) => ({
                          label: `${i.name}`,
                          value: i.id,
                        })),
                      ]
                    : []
                }
                initOption={false}
                name=""
                label="بر اساس محصول"
              />
            </div>
            <div className="w-full md:w-[20%] p-4">
              <DatePicker
                className="w-full"
                inputClass="bg-hgray-200 w-full p-1.5 px-2 rounded-lg outline outline-2 outline-hgray-300  focus:outline-primary-50"
                locale={persian_fa}
                calendar={persian}
                onChange={(date) => {
                  date[0] &&
                    date[1] &&
                    setFilters({
                      ...filters,
                      "filter.createdAt[0]": `$gte:${date[0]
                        .toDate()
                        .toISOString()}`,
                      "filter.createdAt[1]": `$lte:${date[1]
                        ?.toDate()
                        .toISOString()}`,
                    });
                }}
                range
                placeholder="جستجو بر اساس تاریخ"
              />
            </div>

            <div className="w-full md:w-[20%]">
              <Select
                name=""
                label="نمایش در صفحه"
                value={meta.limit}
                items={[10, 20, 50, 100].map((i) => ({
                  label: String(i),
                  value: i,
                }))}
                defaultValue={meta.limit}
                initOption={false}
                className=""
                onChange={(value) =>
                  value && setMeta({ ...meta, limit: value, page: 1 })
                }
              />
            </div>
          </div>
        </FormProvider>
      </Paper>
      <Paper>
        <Table
          headers={headers}
          data={
            data?.data.map((item, index) => ({
              inx:
                (data.meta.currentPage - 1) * data.meta.itemsPerPage +
                index +
                1,
              id: item.id,
              orderId: (
                <Link
                  className="text-blue-600"
                  to={`/admin-dashboard/order/${item.id}`}
                >
                  {item.id}
                </Link>
              ),
              date: new Date(Date.parse(item.updatedAt)).toLocaleString(
                "fa-IR",
                {
                  timeZone: "UTC",
                }
              ),
              user: `${item.user.firstName} ${item.user.lastName}`,
              product: `${item.product.name}`,
              count: item.quantity,
              region: item.address.city,
              status: (
                <span
                  className={`px-2 text-xs rounded-lg ${
                    orderStatusColors[item.status]
                  }`}
                >
                  {orderStatus[item.status]}
                </span>
              ),
              haml: toLocalString(item.product.postage) + " تومان",
              price: toLocalString(Number(item.totalAmount) ?? 0) + " تومان",
            })) ?? []
          }
        />

        {data ? (
          <Pagination
            {...data?.meta}
            onPageChange={(page) => setMeta({ ...meta, page })}
          />
        ) : null}
      </Paper>
    </div>
  );
}
