import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { Order } from "../types";

type PaymentVerifyResponse = {
  message: string;
  statusCode: number;
  data: {
    date: string;
    order: Order;
    payment?: { cardPan: string; transactionId: number; paymentMethod: string };
  };
};
export default function usePaymentVerify({
  Authority,
  orderId,
}: {
  Authority: string | null;
  orderId: string | null;
}) {
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: [],
    queryFn: async (): Promise<PaymentVerifyResponse> => {
      const response = await axiosInstance.post(
        "/payment/verify",
        {},
        { params: { Authority, orderId } }
      );

      return response.data;
    },

    refetchOnWindowFocus: false,

    enabled: !!Authority && !!orderId,
  });
  return {
    data,
    isPending,
    isSuccess,
    isError,
  };
}
