import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-toastify";
import { queryClient } from "../../utils/query-client";

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
    mutationFn: ({ id, ...values }: UpdateDiscountVariables) => {
      return axiosInstance.patch(`/discount/${id}`, { ...values });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discount-list"] });
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
