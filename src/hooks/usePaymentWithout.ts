import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export default function usePaymentWithout() {
  const { mutate, isSuccess, isPending, data } = useMutation({
    mutationFn: ({ orderId }: { orderId: number }) => {
      return axiosInstance.post(
        "/payment/without",
        {},
        { params: { orderId } }
      );
    },
  });

  return {
    isSuccess,
    isPending,
    mutate,
    data,
  };
}
