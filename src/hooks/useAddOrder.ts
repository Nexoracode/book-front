import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export type AddOrderVariables = {
  productId: 1;
  quantity: number;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  city: string;
  street: string;
  plaque: string;
  postalCode: string;
};
export default function useAddOrder() {
  const { mutate, isSuccess, isPending, data } = useMutation({
    mutationFn: (values: AddOrderVariables) => {
      return axiosInstance.post("/order/add", { ...values });
    },
  });

  return {
    isSuccess,
    isPending,
    mutate,
    data,
  };
}
