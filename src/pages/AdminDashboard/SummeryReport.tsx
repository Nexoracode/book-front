import Paper from "../../components/Assets/Paper";
import useGetOrderReport from "../../hooks/useGetOrderReport";
import { toLocalString } from "../../utils/numbers";

export default function SummeryReport() {
  const { data } = useGetOrderReport();
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Paper className="flex-1 h-[100px] flex flex-col justify-between">
        <p className="text-hgray-600 font-black text-lg">تعداد سفارشات امروز</p>

        <div className="flex items-center justify-between">
          <p className="text-2xl text-black font-bold">
            {data?.totalOrdersToday}
          </p>
          <p className="text-hgray-600">سفارش</p>
          <p className="text-2xl text-black font-bold">
            {data?.totalQuantityToday}
          </p>
          <p className="text-hgray-600">جلد</p>
        </div>
      </Paper>
      <Paper className="flex-1 h-[100px] flex flex-col justify-between">
        <p className="text-hgray-600 font-black text-lg">فروش امروز</p>

        <div className="flex items-center justify-between">
          <p className="text-2xl text-black font-bold">
            {toLocalString(data?.totalAmountToday ?? 0)}
          </p>
          <p className="text-hgray-600">تومان</p>
        </div>
      </Paper>
      <Paper className="flex-1 h-[100px] flex flex-col justify-between">
        <p className="text-hgray-600 font-black text-lg">تعداد کل سفارشات</p>

        <div className="flex items-center justify-between">
          <p className="text-2xl text-black font-bold">
            {data?.totalCompletedOrders}
          </p>
          <p className="text-hgray-600">سفارش</p>
          <p className="text-2xl text-black font-bold">
            {data?.totalBooksSold}
          </p>
          <p className="text-hgray-600">جلد</p>
        </div>
      </Paper>
      <Paper className="flex-1 h-[100px] flex flex-col justify-between">
        <p className="text-hgray-600 font-black text-lg">کل فروش</p>

        <div className="flex items-center justify-between">
          <p className="text-2xl text-black font-bold">
            {toLocalString(data?.totalAmount ?? 0)}
          </p>
          <p className="text-hgray-600">تومان</p>
        </div>
      </Paper>
    </div>
  );
}
