import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { Discount } from "../../types";
import { toast } from "react-toastify";
import { queryClient } from "../../utils/query-client";

export type CreateDiscountVariables = {
  code: string;
  type: string;
  value: number;
  maxUses: number;
  expiresAt: string;
};
export default function useCreateDiscount() {
  const { mutateAsync, isSuccess, isPending, data } = useMutation({
    mutationFn: (values: CreateDiscountVariables): Promise<Discount> => {
      return axiosInstance.post("/discount", { ...values });
    },

    onSuccess: () => {
      toast.success("ایجاد کد تخفیف با موفقیت انجام شد.");
      queryClient.invalidateQueries({ queryKey: ["discount-list"] });
    },
  });

  return {
    isSuccess,
    isPending,
    mutateAsync,
    data,
  };
}
