import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axios";
import { Order, Paginate } from "../types";
import { useState } from "react";
import { cleanObject } from "../utils/utiles";
import { useReport } from "../pages/AdminDashboard/ReportProvider";

export type Meta = {
  page: number;
  limit: number;
};
export default function useGetOrders() {
  const [meta, setMeta] = useState<Meta>({ page: 1, limit: 10 });
  const { filters } = useReport();

  const { data, isPending } = useQuery({
    queryKey: [meta, filters],
    queryFn: async () => {
      try {
        const responst = await axiosInstance.get<Paginate<Order>>(
          `/order?${
            filters["filter.createdAt[0]"]
              ? `filter.createdAt=${filters["filter.createdAt[0]"]}`
              : ""
          }`,
          {
            params: cleanObject({
              "filter.status": filters["filter.status"],
              "filter.product_id": filters["filter.product_id"],
              "filter.createdAt": filters["filter.createdAt[1]"],
              search: filters.search,
              limit: meta.limit,
              page: meta.page,
            }),
            withCredentials: true,
          }
        );

        return responst.data;
      } catch (error) {
        console.log({ error });
        toast.error("خطا در برقراری ارتباط با سرور");
      }
    },
  });

  return {
    data,
    isPending,
    meta,
    setMeta,
  };
}
