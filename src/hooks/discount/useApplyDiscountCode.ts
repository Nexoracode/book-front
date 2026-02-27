import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { DiscountType } from "../../types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function useApplyDiscountCode() {
  const { mutateAsync, isSuccess, isPending, data } = useMutation({
    mutationFn: async (values: {
      code: string;
      phone: string;
    }): Promise<{ type: DiscountType; value: number }> => {
      const res = await axiosInstance.post("/discount/apply", { ...values });

      return res.data.data;
    },

    onSuccess: () => {
      toast.success("کد تخفیف با موفقیت برای شما اعمال شد.");
    },

    onError(error) {
      const axiosError = error as AxiosError;
      toast.error(
        (axiosError.response?.data as any).message || "خطا در اعمال کد تخفیف",
      );
    },
  });

  return {
    isSuccess,
    isPending,
    mutateAsync,
    data,
  };
}
