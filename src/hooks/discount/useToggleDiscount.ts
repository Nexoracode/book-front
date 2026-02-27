import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios";
import { queryClient } from "../../utils/query-client";

export default function useToggleDiscount() {
  const {
    mutate: toggleDiscount,
    isPending,
    isSuccess,
    data,
    error,
    reset,
    variables,
  } = useMutation({
    mutationFn: async ({
      discountId,
      newActiveStatus,
    }: {
      discountId: number;
      newActiveStatus: boolean;
    }): Promise<boolean> => {
      await axiosInstance.patch(`/discount/${discountId}/toggle`);
      return newActiveStatus;
    },
    onSuccess: (data) => {
      toast.success(data ? "کد تخفیف فعال شد" : "کد تخفیف غیر فعال شد");

      queryClient.invalidateQueries({ queryKey: ["discount-list"] });
    },
    onError: () => {
      toast.error("خطا در تغییر وضعیت کد تخفیف");
    },
  });

  return {
    toggleDiscount,
    variables,
    isPending,
    isSuccess,
    data,
    error,
    reset,
  };
}
