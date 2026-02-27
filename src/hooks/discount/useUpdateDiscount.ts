import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-toastify";
import { queryClient } from "../../utils/query-client";
import { Discount } from "../../types";

export type UpdateDiscountVariables = {
  code: string;
  type: string;
  value: number;
  maxUses: number;
  expiresAt: string;
  id: number;
};
export default function useUpdateDiscount() {
  const { mutateAsync, isSuccess, isPending, data } = useMutation({
    mutationFn: async ({
      id,
      ...values
    }: UpdateDiscountVariables): Promise<Discount> => {
      return await axiosInstance.patch(`/discount/${id}`, { ...values });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["discount-list"] });
      queryClient.invalidateQueries({ queryKey: ["discount-item", data.id] });
      toast.success("ویرایش کد تخفیف با موفقیت انجام شد.");
    },
  });

  return {
    isSuccess,
    isPending,
    mutateAsync,
    data,
  };
}
