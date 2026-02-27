import { useQuery } from "@tanstack/react-query";
import { Discount } from "../../types";
import { axiosInstance } from "../../utils/axios";

export default function useDiscountList() {
  const { data: discounts, isPending } = useQuery<Array<Discount>>({
    queryKey: ["discount-list"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/discount");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return {
    isPending,
    discounts,
  };
}
