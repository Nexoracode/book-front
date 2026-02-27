import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

type AddInvoiceVariables = {
  orderId: number;
};
export default function useInvice() {
  const {
    mutate: addInvoice,
    isSuccess: invoiceSuccess,
    isPending: invoicePending,
    data: invoiceData,
  } = useMutation({
    mutationFn: ({ orderId }: AddInvoiceVariables) => {
      const callbackUrl = `${window.location.protocol}//${window.location.host}/verify?orderId=${orderId}`;
      console.log({ callbackUrl });
      return axiosInstance
        .post("/payment/pay", {
          orderId,
          callbackUrl,
        })
        .then((data) => data.data);
    },
  });

  return {
    addInvoice,
    invoiceSuccess,
    invoicePending,
    invoiceData,
  };
}
