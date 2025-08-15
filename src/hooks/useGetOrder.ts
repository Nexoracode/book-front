import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axios";
import { Order } from "../types";

export default function useGetOrder({ id }: { id: number }) {
  const { data, isFetching } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<{ data: Order }>(
          `/order/${id}`
        );

        return response.data;
      } catch (error) {
        console.log({ error });
        toast.error("خطا در ارتباط با سرور");
      }
    },

    select: (data) => data?.data,

    enabled: !!id,
  });
  return { data, isFetching };
}
