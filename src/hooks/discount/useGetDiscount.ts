import { axiosInstance } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Discount } from "../../types";

export default function useGetDiscount({ discountId }: { discountId: number }) {
  const { data: discount, isPending } = useQuery<Discount>({
    queryKey: ["discount-item", discountId],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/discount/${discountId}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!discountId,
  });

  return {
    isPending,
    discount,
  };
}
