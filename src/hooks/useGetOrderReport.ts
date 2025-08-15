import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axios";
import { cleanObject } from "../utils/utiles";
import { useReport } from "../pages/AdminDashboard/ReportProvider";

type OrderReport = {
  totalCompletedOrders: number;
  totalOrdersToday: number;
  totalAmount: number;
  totalAmountToday: number;
  totalQuantityToday: number;
  totalBooksSold: number;
};
export default function useGetOrderReport() {
  const { filters } = useReport();
  const { data, isFetching } = useQuery({
    queryKey: ["order-report", filters["filter.product_id"]],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<OrderReport>(`/order/report`, {
          withCredentials: true,
          params: cleanObject({
            productId: filters["filter.product_id"],
          }),
        });

        return response.data;
      } catch (error) {
        console.log({ error });
        toast.error("خطا در ارتباط با سرور");
      }
    },
  });
  return { data, isFetching };
}
