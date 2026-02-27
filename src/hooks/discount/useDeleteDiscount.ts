import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-toastify";
import { queryClient } from "../../utils/query-client";

export default function useDeleteDiscount() {
  const {
    mutateAsync: deleteDiscount,
    isSuccess,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return axiosInstance.delete(`/discount/${id}`);
    },
    onSuccess() {
      toast.success("حذف کد تخفیف با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["discount-list"] });
    },
  });

  return {
    isSuccess,
    isPending,
    deleteDiscount,
    data,
  };
}
